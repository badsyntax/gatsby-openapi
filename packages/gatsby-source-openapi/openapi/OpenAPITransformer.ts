import OpenAPISnippet from 'openapi-snippet';
import { OpenAPIV3 } from 'openapi-types';
import {
  CustomPluginOptions,
  GraphQLOpenApiComponent,
  GraphQLOpenApiObjectAsArray,
  GraphQLOpenApiOperation,
  GraphQLOpenApiPath,
  GraphQLOpenApiSchema,
  GraphQLOpenApiSecurity,
  GraphQLOpenApiServer,
  OpenApiOperationObjectWithExtensions,
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
  constructor(
    public readonly document: OpenAPIV3.Document,
    private readonly pluginOptions: Required<CustomPluginOptions>
  ) {}

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

  getOperationWithExtensions(
    path: string,
    method: string,
    operation: OpenApiOperationObjectWithExtensions
  ): OpenApiOperationObjectWithExtensions {
    const newOperation: OpenApiOperationObjectWithExtensions = {
      ...operation,
      x_codeSamples: this.pluginOptions.generateCodeSamples
        ? OpenAPISnippet.getEndpointSnippets(
            this.document,
            path,
            method,
            this.pluginOptions.codeSampleTargets
          ).snippets.map((snippet) => {
            return {
              lang: snippet.id,
              source: snippet.content,
              label: snippet.title,
            };
          })
        : operation.x_codeSamples,
    };
    return newOperation;
  }

  getOperations(): GraphQLOpenApiOperation[] {
    const operations: GraphQLOpenApiOperation[] = [];
    Object.keys(this.document.paths).forEach((path) => {
      const pathItemObject: OpenAPIV3.PathItemObject = this.document.paths[
        path
      ];
      Object.keys(pathItemObject).forEach((method) => {
        if (isOperationObject(pathItemObject[method])) {
          const operationObject = sanitizeFieldNames<
            OpenApiOperationObjectWithExtensions
          >(pathItemObject[method]);
          const operation: OpenApiOperationObjectWithExtensions = this.getOperationWithExtensions(
            path,
            method,
            operationObject
          );
          operations.push({
            path,
            method,
            operation: JSON.stringify(operation),
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
