function getContentExamples(content) {
  if (content.examples) {
    return Object.keys(content.examples).map((name) => ({
      name,
      example: JSON.stringify(content.examples[name].value),
    }));
  }
  if (content.example) {
    return [
      {
        name: null,
        example: JSON.stringify(content.example),
      },
    ];
  }
  return [];
}

function getRequestBodyContentAsArray(requestBodyContent) {
  return Object.keys(requestBodyContent).map((contentType) => {
    const content = {
      ...requestBodyContent[contentType],
      type: contentType,
      examples: getContentExamples(requestBodyContent[contentType]),
      schema: JSON.stringify(requestBodyContent[contentType].schema),
    };
    delete content.example;
    return content;
  });
}

function getRequestBodyAsArray(requestBody) {
  if (!requestBody) {
    return requestBody;
  }
  if (requestBody['$ref']) {
    const newRequestBody = { ...requestBody };
    const ref = requestBody['$ref'];
    delete newRequestBody['$ref'];
    return {
      ...newRequestBody,
      ref: JSON.stringify({
        $ref: ref,
      }),
    };
  }
  if (!requestBody.content) {
    return requestBody;
  }
  return {
    ...requestBody,
    content: getRequestBodyContentAsArray(requestBody.content),
  };
}

function getContent(content) {
  return Object.keys(content || {}).map((type) => {
    const contentByResponseType = (content || {})[type];
    const examples = getContentExamples(contentByResponseType);
    const schemaWithNormalisedExample = {
      ...contentByResponseType.schema,
    };
    const responseContent = {
      schema: JSON.stringify(schemaWithNormalisedExample),
      type,
      examples,
    };
    return responseContent;
  });
}

function getResponsesAsArray(responses) {
  return responses
    ? Object.keys(responses).map((responseCode) => {
        const response = responses[responseCode];
        const content = getContent(response.content);
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

  getRequestBodiesAsArray() {
    const { requestBodies } = this.document.components;
    return Object.keys(requestBodies).map((name) => {
      return {
        ...getRequestBodyAsArray(requestBodies[name]),
        name,
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
