const { getResponseContentExamples } = require('./schemaExamples');

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
        const responses = this.getResponsesAsArray(pathData.responses);
        paths.push({
          ...pathData,
          responses,
          method,
          path,
          security: this.getSecurity(
            pathData.security || this.document.security
          ),
        });
      });
    });
    return paths;
  }

  getSecurity(security = this.document.security) {
    return (security || [])
      .map((security) => {
        return Object.keys(security).map((name) => {
          const securityObj = {
            name: name,
            opts: security[name],
          };
          return securityObj;
        });
      })
      .flat();
  }

  getResponsesAsArray(responses) {
    return responses
      ? Object.keys(responses).map((responseCode) => {
          const response = responses[responseCode];
          const content = Object.keys(response.content || {}).map(
            (contentType) => {
              const contentByResponseType = (response.content || {})[
                contentType
              ];
              const examples = getResponseContentExamples(
                contentByResponseType
              );
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
};
