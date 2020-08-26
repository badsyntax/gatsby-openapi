import { OpenAPIV3 } from 'openapi-types';
import {
  GraphQLOpenApiComponent,
  GraphQLOpenApiObjectAsArray,
  GraphQLOpenApiOperation,
  GraphQLOpenApiPath,
  GraphQLOpenApiSchema,
  GraphQLOpenApiSecurity,
  GraphQLOpenApiServer,
  OpenAPIV3ObjectConvertToArray,
} from '../types';

function sanitizeFieldNames<T>(obj): T {
  return Object.keys(obj).reduce(
    (newObj, key) => ({
      ...newObj,
      [key.replace('-', '_')]: obj[key],
    }),
    {}
  ) as T;
}

function isOperationObject(
  obj:
    | OpenAPIV3.OperationObject
    | OpenAPIV3.ServerObject[]
    | Array<OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject>
    | string
): obj is OpenAPIV3.OperationObject {
  if (typeof obj === 'string') {
    return false;
  }
  if (Array.isArray(obj)) {
    return false;
  }
  return true;
}

function getObjectAsArray(
  openApiObject: OpenAPIV3ObjectConvertToArray | undefined
): GraphQLOpenApiObjectAsArray[] {
  return openApiObject
    ? Object.keys(openApiObject).map(
        (name): GraphQLOpenApiObjectAsArray => {
          return {
            name,
            value: JSON.stringify(openApiObject[name]),
          };
        }
      )
    : [];
}

export class OpenAPITransformer {
  constructor(public readonly document: OpenAPIV3.Document) {}

  getInfo(): OpenAPIV3.InfoObject {
    return sanitizeFieldNames<OpenAPIV3.InfoObject>(this.document.info);
  }

  getPaths(): GraphQLOpenApiPath[] {
    return getObjectAsArray(this.document.paths);
  }

  getSchemas(): GraphQLOpenApiSchema[] {
    const schemas = this.document.components?.schemas;
    return schemas
      ? Object.keys(schemas).map((name) => {
          return {
            name: name,
            schema: JSON.stringify(schemas[name]),
          };
        })
      : [];
  }

  getOperations(): GraphQLOpenApiOperation[] {
    const operations: GraphQLOpenApiOperation[] = [];
    Object.keys(this.document.paths).forEach((path) => {
      const pathItemObject: OpenAPIV3.PathItemObject = this.document.paths[
        path
      ];
      Object.keys(pathItemObject).forEach((method) => {
        if (isOperationObject(pathItemObject[method])) {
          const pathItem: OpenAPIV3.OperationObject = pathItemObject[method];
          operations.push({
            path,
            method,
            operation: JSON.stringify(pathItem),
          });
        }
      });
    });
    return operations;
  }

  getSecurity(security = this.document.security): GraphQLOpenApiSecurity[] {
    return security
      ? security
          .map((securityItem): GraphQLOpenApiObjectAsArray[] => {
            return getObjectAsArray(securityItem);
          })
          .flat()
      : [];
  }

  getComponents(): GraphQLOpenApiComponent[] {
    return getObjectAsArray(this.document.components);
  }

  getServers(): GraphQLOpenApiServer[] {
    return (this.document.servers || []).map(
      ({ url, description, variables }): GraphQLOpenApiServer => {
        return {
          url,
          description,
          variables: JSON.stringify(variables),
        };
      }
    );
  }
}
