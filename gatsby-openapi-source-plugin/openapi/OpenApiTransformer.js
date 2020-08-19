const { getExamples, normaliseSchemaExample } = require('./schemaExamples');

class OpenApiTransformer {
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
        });
      });
    });
    return paths;
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
              const examples = getExamples(contentByResponseType);
              const schemaWithNormalisedExample = normaliseSchemaExample(
                contentByResponseType.schema
              );
              const responseContent = {
                schema: schemaWithNormalisedExample,
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
}

module.exports = {
  OpenApiTransformer,
};
