// Transforms an OpenAPIV3 document into data structures
// that can be used in GraphQL.

import { OpenAPIV3 } from 'openapi-types';
import {
  OpenApiGraphQLRequestBodyContent,
  OpenApiGraphQLReferenceObject,
  OpenApiGraphQLRequestBodyObject,
  OpenApiGraphQLResponseObject,
  OpenApiGraphQLOperation,
  OpenApiGraphQLSecurityRequirement,
  OpenApiGraphQLSecuritySchema,
  OpenApiGraphQLRequestBody,
  OpenApiGraphQLSchema,
  OpenApiGraphQLSchemaExample,
} from '../types';

function isReferenceObject(
  openApiObject:
    | OpenAPIV3.ReferenceObject
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ResponseObject
    | OpenAPIV3.SecuritySchemeObject
    | OpenAPIV3.ExampleObject
): openApiObject is OpenAPIV3.ReferenceObject {
  return !!openApiObject['$ref'];
}

function getContentExamples({
  examples,
  example,
}: OpenAPIV3.MediaTypeObject): OpenApiGraphQLSchemaExample[] {
  if (examples) {
    return Object.keys(examples).map(
      (name): OpenApiGraphQLSchemaExample => {
        const example: OpenAPIV3.ReferenceObject | OpenAPIV3.ExampleObject =
          examples[name];
        if (isReferenceObject(example)) {
          return {
            ref: example['$ref'],
          };
        }
        return {
          name,
          example: JSON.stringify(example.value),
        };
      }
    );
  }
  if (example) {
    return [
      {
        name: null,
        example: JSON.stringify(example),
      },
    ];
  }
  return [];
}

function getRequestBodyContent(requestBodyContent: {
  [media: string]: OpenAPIV3.MediaTypeObject;
}) {
  return Object.keys(requestBodyContent).map(
    (contentType): OpenApiGraphQLRequestBodyContent => {
      const openApiContent: OpenAPIV3.MediaTypeObject =
        requestBodyContent[contentType];
      const content: OpenApiGraphQLRequestBodyContent = {
        ...openApiContent,
        type: contentType,
        examples: getContentExamples(openApiContent),
        schema: JSON.stringify(openApiContent.schema),
      };
      return content;
    }
  );
}

function getGraphQLRequestBody(
  requestBody?: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject
): OpenApiGraphQLReferenceObject | OpenApiGraphQLRequestBodyObject | undefined {
  if (!requestBody) {
    return requestBody;
  }
  if (isReferenceObject(requestBody)) {
    return {
      ref: requestBody['$ref'],
    };
  }
  return {
    ...requestBody,
    content: getRequestBodyContent(requestBody.content),
  };
}

function getContent(
  content:
    | {
        [media: string]: OpenAPIV3.MediaTypeObject;
      }
    | undefined
): OpenApiGraphQLRequestBodyContent[] {
  return Object.keys(content || {}).map(
    (type): OpenApiGraphQLRequestBodyContent => {
      const contentByResponseType = (content || {})[type];
      const examples = getContentExamples(contentByResponseType);
      const schemaWithNormalisedExample = {
        ...contentByResponseType.schema,
      };
      const responseContent: OpenApiGraphQLRequestBodyContent = {
        schema: JSON.stringify(schemaWithNormalisedExample),
        type,
        examples,
      };
      return responseContent;
    }
  );
}

function getResponses(responses: OpenAPIV3.ResponsesObject | undefined) {
  return responses
    ? Object.keys(responses).map(
        (responseCode): OpenApiGraphQLResponseObject => {
          const response: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject =
            responses[responseCode];
          if (isReferenceObject(response)) {
            return {
              ref: response['$ref'],
            };
          }
          const content = getContent(response.content);
          return {
            ...response,
            code: responseCode,
            content,
          };
        }
      )
    : [];
}

export class OpenAPITransformer {
  constructor(public readonly document: OpenAPIV3.Document) {}

  getOperations(): OpenApiGraphQLOperation[] {
    const operations: OpenApiGraphQLOperation[] = [];
    Object.keys(this.document.paths).forEach((path) => {
      const pathMethods = this.document.paths[path];
      Object.keys(pathMethods).forEach((method) => {
        const openapiOperation: OpenAPIV3.OperationObject = pathMethods[method];
        const responses = getResponses(openapiOperation.responses);
        const requestBody = getGraphQLRequestBody(openapiOperation.requestBody);
        const operation: OpenApiGraphQLOperation = {
          ...openapiOperation,
          responses,
          method,
          path,
          requestBody,
          security: this.getSecurity(openapiOperation.security),
        };
        operations.push(operation);
      });
    });
    return operations;
  }

  getSecurity(
    security = this.document.security
  ): OpenApiGraphQLSecurityRequirement[] {
    return security
      ? security
          .map((securityItem) => {
            return Object.keys(securityItem).map(
              (name): OpenApiGraphQLSecurityRequirement => ({
                name: name,
                opts: securityItem[name],
              })
            );
          })
          .flat()
      : [];
  }

  getSecuritySchemas(): OpenApiGraphQLSecuritySchema[] {
    if (!this.document.components?.securitySchemes) {
      return [];
    }
    const { securitySchemes } = this.document.components;
    return Object.keys(securitySchemes).map((name) => {
      const securitySchema:
        | OpenAPIV3.ReferenceObject
        | OpenAPIV3.SecuritySchemeObject = securitySchemes[name];
      return {
        name,
        schema: JSON.stringify(securitySchema),
      };
    });
  }

  getRequestBodySchemas(): OpenApiGraphQLRequestBody[] {
    if (!this.document.components?.requestBodies) {
      return [];
    }
    const { requestBodies } = this.document.components;
    return Object.keys(requestBodies).map(
      (name): OpenApiGraphQLRequestBody => ({
        name,
        requestBody: getGraphQLRequestBody(requestBodies[name]),
      })
    );
  }

  getSchemas(): OpenApiGraphQLSchema[] {
    if (!this.document.components?.schemas) {
      return [];
    }
    const { schemas } = this.document.components;
    return Object.keys(schemas).map(
      (name): OpenApiGraphQLSchema => {
        const openApiSchema:
          | OpenAPIV3.ReferenceObject
          | OpenAPIV3.SchemaObject = schemas[name];
        return {
          name,
          schema: JSON.stringify(openApiSchema),
        };
      }
    );
  }
}
