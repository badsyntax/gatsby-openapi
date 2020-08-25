import { OpenAPIV3 } from 'openapi-types';
import {
  OpenAPIV3ObjectConvertToArray,
  OpenAPIV3GraphQLObjectAsArray,
  OpenAPIV3GraphQLOperation,
  OpenAPIV3GraphQLSchema,
  OpenAPIV3GraphQLPath,
  OpenAPIV3GraphQLSecurity,
  OpenAPIV3GraphQLComponent,
  OpenAPIV3GraphQLServer,
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
    | string
    | OpenAPIV3.ServerObject[]
    | Array<OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject>
): obj is OpenAPIV3.OperationObject {
  if (typeof obj === 'string') {
    return false;
  }
  if (Array.isArray(obj)) {
    return false;
  }
  return true;
}

export class OpenAPITransformer {
  constructor(public readonly document: OpenAPIV3.Document) {}

  getObjectAsArray(
    openApiObject: OpenAPIV3ObjectConvertToArray | undefined
  ): OpenAPIV3GraphQLObjectAsArray[] {
    return openApiObject
      ? Object.keys(openApiObject).map(
          (name): OpenAPIV3GraphQLObjectAsArray => {
            return {
              name,
              value: JSON.stringify(openApiObject[name]),
            };
          }
        )
      : [];
  }

  getInfo(): OpenAPIV3.InfoObject {
    return sanitizeFieldNames<OpenAPIV3.InfoObject>(this.document.info);
  }

  getPaths(): OpenAPIV3GraphQLPath[] {
    return this.getObjectAsArray(this.document.paths);
  }

  getSchemas(): OpenAPIV3GraphQLSchema[] {
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

  getOperations(): OpenAPIV3GraphQLOperation[] {
    const operations: OpenAPIV3GraphQLOperation[] = [];
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

  getSecurity(security = this.document.security): OpenAPIV3GraphQLSecurity[] {
    return security
      ? security
          .map((securityItem): OpenAPIV3GraphQLObjectAsArray[] => {
            return this.getObjectAsArray(securityItem);
          })
          .flat()
      : [];
  }

  getComponents(): OpenAPIV3GraphQLComponent[] {
    return this.getObjectAsArray(this.document.components);
  }

  getServers(): OpenAPIV3GraphQLServer[] {
    return (this.document.servers || []).map(
      ({ url, description, variables }): OpenAPIV3GraphQLServer => {
        return {
          url,
          description,
          variables: JSON.stringify(variables),
        };
      }
    );
  }
}
