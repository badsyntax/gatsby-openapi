const { OpenApiParser } = require('./openapi/OpenApiParser');
const { OpenApiTransformer } = require('./openapi/OpenApiTransformer');

const {
  types,
  API_INFO_TYPE,
  API_SECURITY_TYPE,
  API_TAGS_TYPE,
  API_PATH_TYPE,
} = require('./types');

// Convert vendor extensions from `x-` to `x_`
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
  { actions, createContentDigest, createNodeId },
  pluginOptions
) => {
  const { createNode } = actions;

  function createInfoNode(api) {
    const info = sanitizeFieldNames(api.document.info);
    const infoNode = {
      ...info,
      id: createNodeId(API_INFO_TYPE),
      parent: null,
      children: [],
      internal: {
        type: API_INFO_TYPE,
        content: JSON.stringify(info),
        contentDigest: createContentDigest(info),
      },
    };
    createNode(infoNode);
  }

  function createSecurityNodes(api) {
    const security = api.document.security;
    Object.keys(api.document.security).forEach((securityType) => {
      const securityObj = {
        type: securityType,
        opts: security[securityType],
      };
      createNode({
        ...securityObj,
        id: createNodeId(`${API_SECURITY_TYPE}-${securityType}`),
        parent: null,
        children: [],
        internal: {
          type: API_SECURITY_TYPE,
          content: JSON.stringify(securityObj),
          contentDigest: createContentDigest(securityObj),
        },
      });
    });
  }

  function createTagNodes(api) {
    api.document.tags.forEach((tag) => {
      createNode({
        ...tag,
        id: createNodeId(`${API_TAGS_TYPE}-${tag.name}`),
        parent: null,
        children: [],
        internal: {
          type: API_TAGS_TYPE,
          content: JSON.stringify(tag),
          contentDigest: createContentDigest(tag),
        },
      });
    });
  }

  function createPathNodes(api) {
    api.getPathsAsArray().forEach((path) => {
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
  }

  try {
    const api = new OpenApiParser(pluginOptions.specPath);
    await api.parse();

    const transformer = new OpenApiTransformer(api.document);

    createInfoNode(transformer);
    createPathNodes(transformer);
    createSecurityNodes(transformer);
    createTagNodes(transformer);
  } catch (e) {
    console.error(`Error sourcing OpenAPI data: ${e.message}`);
  }
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === API_PATH_TYPE) {
    const slug = node.operationId;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};
