const { OpenApiParser } = require('./openapi/OpenApiParser');
const { OpenApiTransformer } = require('./openapi/OpenApiTransformer');

const {
  types,
  API_INFO_TYPE,
  API_SECURITY_TYPE,
  API_SECURITY_SCHEMA_TYPE,
  API_TAG_TYPE,
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
    api.getSecurity().forEach((security) => {
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
  }

  // function entityToFieldsArray(object) {
  //   if (Array.isArray(object)) {
  //     return object.map(entityToFieldsArray);
  //   }
  //   if (object.constructor === Object) {
  //     return Object.keys(object).map((key) => {
  //       return { key, value: entityToFieldsArray(object[key]) };
  //     });
  //   }
  //   return object;
  // }

  function createSecuritySchemaNodes(api) {
    const { securitySchemes } = api.document.components;
    Object.keys(securitySchemes).forEach((name) => {
      const extra = { ...securitySchemes[name] };
      delete extra.description;
      delete extra.type;
      const securitySchemaObj = {
        name,
        type: securitySchemes[name].type,
        description: securitySchemes[name].description,
        extra: JSON.stringify(extra),
      };
      createNode({
        ...securitySchemaObj,
        id: createNodeId(`${API_SECURITY_SCHEMA_TYPE}-${name}`),
        parent: null,
        children: [],
        internal: {
          type: API_SECURITY_SCHEMA_TYPE,
          content: JSON.stringify(securitySchemaObj),
          contentDigest: createContentDigest(securitySchemaObj),
        },
      });
    });
  }

  function createTagNodes(api) {
    api.document.tags.forEach((tag) => {
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
  }

  function createPathNodes(api) {
    api.getPathsAsArray().forEach((path) => {
      console.log('oath', JSON.stringify(path, null, 2));
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
    const document = await OpenApiParser.parse(pluginOptions.specPath);
    const transformer = new OpenApiTransformer(document);

    // console.log(JSON.stringify(document, null, 2));

    createInfoNode(transformer);
    createPathNodes(transformer);
    createSecurityNodes(transformer);
    createSecuritySchemaNodes(transformer);
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
  // if (node.internal.type === API_SECURITY_SCHEMA_TYPE) {
  //   const slug = node.operationId;
  //   createNodeField({
  //     node,
  //     name: 'slug',
  //     value: slug,
  //   });
  // }
};
