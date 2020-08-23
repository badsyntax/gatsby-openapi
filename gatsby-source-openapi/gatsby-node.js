const { OpenApiParser } = require('./openapi/OpenApiParser');
const { OpenApiTransformer } = require('./openapi/OpenApiTransformer');

const {
  types,
  API_INFO_TYPE,
  API_SECURITY_TYPE,
  API_SECURITY_SCHEMA_TYPE,
  API_SCHEMA_TYPE,
  API_TAG_TYPE,
  API_PATH_TYPE,
  API_REQUEST_BODY_TYPE,
} = require('./types');

function sanitizeFieldNames(obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    newObj[key.replace('-', '_')] = obj[key];
    return newObj;
  }, {});
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(types);
};

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId, reporter },
  pluginOptions
) => {
  const { createNode } = actions;

  function createInfoNode(transformer) {
    const info = sanitizeFieldNames(transformer.document.info);
    createNode({
      ...info,
      id: createNodeId(API_INFO_TYPE),
      parent: null,
      children: [],
      internal: {
        type: API_INFO_TYPE,
        content: JSON.stringify(info),
        contentDigest: createContentDigest(info),
      },
    });
    reporter.success(`create ${API_INFO_TYPE} node`);
  }

  function createSecurityNodes(transformer) {
    transformer.getSecurityAsArray().forEach((security) => {
      createNode({
        ...security,
        id: createNodeId(`${API_SECURITY_TYPE}-${security.name}`),
        parent: null,
        children: [],
        internal: {
          type: API_SECURITY_TYPE,
          content: JSON.stringify(security),
          contentDigest: createContentDigest(security),
        },
      });
    });
    reporter.success(`create ${API_SECURITY_TYPE} nodes`);
  }

  function createSecuritySchemaNodes(transformer) {
    transformer.getSecuritySchemasAsArray().forEach((securitySchema) => {
      createNode({
        ...securitySchema,
        id: createNodeId(`${API_SECURITY_SCHEMA_TYPE}-${securitySchema.name}`),
        parent: null,
        children: [],
        internal: {
          type: API_SECURITY_SCHEMA_TYPE,
          content: JSON.stringify(securitySchema),
          contentDigest: createContentDigest(securitySchema),
        },
      });
    });
    reporter.success(`create ${API_SECURITY_SCHEMA_TYPE} nodes`);
  }

  function createSchemaNodes(transformer) {
    transformer.getSchemasAsArray().forEach((schema) => {
      createNode({
        ...schema,
        id: createNodeId(`${API_SCHEMA_TYPE}-${schema.name}`),
        parent: null,
        children: [],
        internal: {
          type: API_SCHEMA_TYPE,
          content: JSON.stringify(schema),
          contentDigest: createContentDigest(schema),
        },
      });
    });
    reporter.success(`create ${API_SCHEMA_TYPE} nodes`);
  }

  function createRequestBodyNodes(transformer) {
    transformer.getRequestBodiesAsArray().forEach((schema) => {
      createNode({
        ...schema,
        id: createNodeId(`${API_REQUEST_BODY_TYPE}-${schema.name}`),
        parent: null,
        children: [],
        internal: {
          type: API_REQUEST_BODY_TYPE,
          content: JSON.stringify(schema),
          contentDigest: createContentDigest(schema),
        },
      });
    });
    reporter.success(`create ${API_REQUEST_BODY_TYPE} nodes`);
  }

  function createTagNodes(transformer) {
    transformer.document.tags.forEach((tag) => {
      createNode({
        ...tag,
        id: createNodeId(`${API_TAG_TYPE}-${tag.name}`),
        parent: null,
        children: [],
        internal: {
          type: API_TAG_TYPE,
          content: JSON.stringify(tag),
          contentDigest: createContentDigest(tag),
        },
      });
    });
    reporter.success(`create ${API_TAG_TYPE} nodes`);
  }

  function createPathNodes(transformer) {
    transformer.getPathsAsArray().forEach((path) => {
      createNode({
        ...path,
        id: createNodeId(`${API_PATH_TYPE}-${path.path}-${path.method}`),
        parent: null,
        children: [],
        internal: {
          type: API_PATH_TYPE,
          content: JSON.stringify(path),
          contentDigest: createContentDigest(path),
        },
      });
    });
    reporter.success(`create ${API_PATH_TYPE} nodes`);
  }

  try {
    const document = await OpenApiParser.parse(pluginOptions.specPath);
    const transformer = new OpenApiTransformer(document);

    createInfoNode(transformer);
    createPathNodes(transformer);
    createSecurityNodes(transformer);
    createSecuritySchemaNodes(transformer);
    createTagNodes(transformer);
    createSchemaNodes(transformer);
    createRequestBodyNodes(transformer);

    reporter.info('successfully created all OpenAPI nodes');
  } catch (e) {
    reporter.panicOnBuild(`Error sourcing OpenAPI data: ${e.message}`);
  }
};
