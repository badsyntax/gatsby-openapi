import { NodePluginArgs, PluginOptions } from 'gatsby';
import { OpenAPIV3 } from 'openapi-types';
import { OpenApiParser } from './openapi/OpenApiParser';
import { OpenAPITransformer } from './openapi/OpenAPITransformer';

import {
  graphQlTypes,
  API_INFO_TYPE,
  API_SECURITY_TYPE,
  API_SECURITY_SCHEMA_TYPE,
  API_SCHEMA_TYPE,
  API_TAG_TYPE,
  API_OPERATION_TYPE,
  API_REQUEST_BODY_SCHEMA_TYPE,
} from './types';

function sanitizeFieldNames(obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    newObj[key.replace('-', '_')] = obj[key];
    return newObj;
  }, {});
}

export const createSchemaCustomization = ({
  actions,
}: NodePluginArgs): void => {
  const { createTypes } = actions;
  createTypes(graphQlTypes);
};

type CustomPluginOptions = PluginOptions & {
  specPath: string;
};

export const sourceNodes = async (
  { actions, createContentDigest, createNodeId, reporter }: NodePluginArgs,
  pluginOptions: CustomPluginOptions
): Promise<void> => {
  const { createNode } = actions;

  function createInfoNode(transformer: OpenAPITransformer) {
    const info = sanitizeFieldNames(transformer.document.info);
    createNode({
      ...info,
      id: createNodeId(API_INFO_TYPE),
      children: [],
      internal: {
        type: API_INFO_TYPE,
        content: JSON.stringify(info),
        contentDigest: createContentDigest(info),
      },
    });
    reporter.success(`create ${API_INFO_TYPE} node`);
  }

  function createSecurityNodes(transformer: OpenAPITransformer) {
    transformer.getSecurity().forEach((security) => {
      createNode({
        ...security,
        id: createNodeId(`${API_SECURITY_TYPE}-${security.name}`),
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

  function createSecuritySchemaNodes(transformer: OpenAPITransformer) {
    transformer.getSecuritySchemas().forEach((securitySchema) => {
      createNode({
        ...securitySchema,
        id: createNodeId(`${API_SECURITY_SCHEMA_TYPE}-${securitySchema.name}`),
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

  function createSchemaNodes(transformer: OpenAPITransformer) {
    transformer.getSchemas().forEach((schema) => {
      createNode({
        ...schema,
        id: createNodeId(`${API_SCHEMA_TYPE}-${schema.name}`),
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

  function createRequestBodySchemaNodes(transformer: OpenAPITransformer) {
    transformer.getRequestBodySchemas().forEach((schema) => {
      createNode({
        ...schema,
        id: createNodeId(`${API_REQUEST_BODY_SCHEMA_TYPE}-${schema.name}`),
        children: [],
        internal: {
          type: API_REQUEST_BODY_SCHEMA_TYPE,
          content: JSON.stringify(schema),
          contentDigest: createContentDigest(schema),
        },
      });
    });
    reporter.success(`create ${API_REQUEST_BODY_SCHEMA_TYPE} nodes`);
  }

  function createTagNodes(transformer: OpenAPITransformer) {
    (transformer.document?.tags || []).forEach((tag) => {
      createNode({
        ...tag,
        id: createNodeId(`${API_TAG_TYPE}-${tag.name}`),
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

  function createOperationNodes(transformer: OpenAPITransformer) {
    transformer.getOperations().forEach((operation) => {
      createNode({
        ...operation,
        id: createNodeId(
          `${API_OPERATION_TYPE}-${operation.path}-${operation.method}`
        ),
        children: [],
        internal: {
          type: API_OPERATION_TYPE,
          content: JSON.stringify(operation),
          contentDigest: createContentDigest(operation),
        },
      });
    });
    reporter.success(`create ${API_OPERATION_TYPE} nodes`);
  }

  try {
    const document = (await OpenApiParser.parse(
      pluginOptions.specPath
    )) as OpenAPIV3.Document;
    const transformer = new OpenAPITransformer(document);

    createInfoNode(transformer);
    createOperationNodes(transformer);
    createSecurityNodes(transformer);
    createSecuritySchemaNodes(transformer);
    createTagNodes(transformer);
    createSchemaNodes(transformer);
    createRequestBodySchemaNodes(transformer);
  } catch (e) {
    reporter.panicOnBuild(`Error sourcing OpenAPI data: ${e.message}`);
  }
};
