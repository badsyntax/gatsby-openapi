const { getResponseContentExamples } = require('./schemaExamples');

function getRequestBodyContentAsArray(requestBodyContent) {
  return Object.keys(requestBodyContent).map((contentType) => ({
    type: contentType,
    schema: JSON.stringify(requestBodyContent[contentType].schema),
  }));
}

function getRequestBodyAsArray(requestBody) {
  return requestBody && requestBody.content
    ? {
        ...requestBody,
        content: getRequestBodyContentAsArray(requestBody.content),
      }
    : requestBody;
}

function getResponsesAsArray(responses) {
  return responses
    ? Object.keys(responses).map((responseCode) => {
        const response = responses[responseCode];
        const content = Object.keys(response.content || {}).map(
          (contentType) => {
            const contentByResponseType = (response.content || {})[contentType];
            const examples = getResponseContentExamples(contentByResponseType);
            const schemaWithNormalisedExample = {
              ...contentByResponseType.schema,
            };
            const responseContent = {
              schema: JSON.stringify(schemaWithNormalisedExample),
              contentType,
              examples,
            };
            return responseContent;
          }
        );
        return {
          ...responses[responseCode],
          code: responseCode,
          content,
        };
      })
    : [];
}

exports.OpenApiTransformer = class OpenApiTransformer {
  constructor(document) {
    this.document = document;
  }

  getPathsAsArray() {
    const paths = [];
    Object.keys(this.document.paths).forEach((path) => {
      const pathMethods = this.document.paths[path];
      Object.keys(pathMethods).forEach((method) => {
        const pathData = pathMethods[method];
        const responses = getResponsesAsArray(pathData.responses);
        const requestBody = getRequestBodyAsArray(pathData.requestBody);
        paths.push({
          ...pathData,
          responses,
          method,
          path,
          requestBody,
          security: this.getSecurityAsArray(pathData.security),
        });
      });
    });
    return paths;
  }

  getSecurityAsArray(security = this.document.security) {
    return security
      .map((securityItem) => {
        return Object.keys(securityItem).map((name) => ({
          name: name,
          opts: securityItem[name],
        }));
      })
      .flat();
  }

  getSecuritySchemasAsArray() {
    const { securitySchemes } = this.document.components;
    return Object.keys(securitySchemes).map((name) => {
      const extra = { ...securitySchemes[name] };
      delete extra.description;
      delete extra.type;
      return {
        name,
        type: securitySchemes[name].type,
        description: securitySchemes[name].description,
        extra: JSON.stringify(extra),
      };
    });
  }

  getSchemasAsArray() {
    const { schemas } = this.document.components;
    return Object.keys(schemas).map((name) => ({
      name,
      schema: JSON.stringify(schemas[name]),
    }));
  }
};
