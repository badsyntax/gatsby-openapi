import { CreateNodeArgs, NodePluginArgs } from 'gatsby';
import { OpenAPIV3 } from 'openapi-types';
import { OpenApiParser } from './openapi/OpenApiParser';
import { OpenAPITransformer } from './openapi/OpenAPITransformer';
import {
  CustomPluginOptions,
  graphQlTypes,
  GRAPHQL_NODE_OPENAPI_COMPONENT,
  GRAPHQL_NODE_OPENAPI_EXTERNAL_DOCS,
  GRAPHQL_NODE_OPENAPI_INFO,
  GRAPHQL_NODE_OPENAPI_OPERATION,
  GRAPHQL_NODE_OPENAPI_PATH,
  GRAPHQL_NODE_OPENAPI_SCHEMA,
  GRAPHQL_NODE_OPENAPI_SECURITY,
  GRAPHQL_NODE_OPENAPI_SERVER,
  GRAPHQL_NODE_OPENAPI_TAG,
} from './types';
import { defaultPluginOptions } from './util/defaultPluginOptions';

export const onCreateNode = ({ node, actions }: CreateNodeArgs): void => {
  const { createNodeField } = actions;
  if (
    node.internal.type === 'SitePlugin' &&
    node.name === 'gatsby-source-openapi'
  ) {
    const pluginOptions = defaultPluginOptions(
      node.pluginOptions as CustomPluginOptions
    );
    createNodeField({
      node,
      name: 'pluginOptionsWithDefaults',
      value: pluginOptions,
    });
  }
};

export const createSchemaCustomization = ({
  actions,
}: NodePluginArgs): void => {
  const { createTypes } = actions;
  createTypes(graphQlTypes);
};

export const sourceNodes = async (
  { actions, createContentDigest, createNodeId, reporter }: NodePluginArgs,
  pluginOptions: CustomPluginOptions
): Promise<void> => {
  const { createNode } = actions;
  const pluginOptionsWithDefaults = defaultPluginOptions(pluginOptions);

  function createInfoNode(transformer: OpenAPITransformer) {
    const info = transformer.getInfo();
    createNode({
      ...info,
      id: createNodeId(GRAPHQL_NODE_OPENAPI_INFO),
      children: [],
      internal: {
        type: GRAPHQL_NODE_OPENAPI_INFO,
        content: JSON.stringify(info),
        contentDigest: createContentDigest(info),
      },
    });
    reporter.success(`create ${GRAPHQL_NODE_OPENAPI_INFO} node`);
  }

  function createExternalDocsNode(transformer: OpenAPITransformer) {
    const externalDocs = transformer.document.externalDocs;
    if (externalDocs) {
      createNode({
        ...externalDocs,
        id: createNodeId(GRAPHQL_NODE_OPENAPI_EXTERNAL_DOCS),
        children: [],
        internal: {
          type: GRAPHQL_NODE_OPENAPI_EXTERNAL_DOCS,
          content: JSON.stringify(externalDocs),
          contentDigest: createContentDigest(externalDocs),
        },
      });
      reporter.success(`create ${GRAPHQL_NODE_OPENAPI_EXTERNAL_DOCS} node`);
    } else {
      reporter.warn(
        `skipped ${GRAPHQL_NODE_OPENAPI_EXTERNAL_DOCS} node, no externalDocs found in schema`
      );
    }
  }

  function createSecurityNodes(transformer: OpenAPITransformer) {
    transformer.getSecurity().forEach((security) => {
      createNode({
        ...security,
        id: createNodeId(`${GRAPHQL_NODE_OPENAPI_SECURITY}-${security.name}`),
        children: [],
        internal: {
          type: GRAPHQL_NODE_OPENAPI_SECURITY,
          content: JSON.stringify(security),
          contentDigest: createContentDigest(security),
        },
      });
    });
    reporter.success(`create ${GRAPHQL_NODE_OPENAPI_SECURITY} nodes`);
  }

  function createTagNodes(transformer: OpenAPITransformer) {
    (transformer.document?.tags || []).forEach((tag) => {
      createNode({
        ...tag,
        id: createNodeId(`${GRAPHQL_NODE_OPENAPI_TAG}-${tag.name}`),
        children: [],
        internal: {
          type: GRAPHQL_NODE_OPENAPI_TAG,
          content: JSON.stringify(tag),
          contentDigest: createContentDigest(tag),
        },
      });
    });
    reporter.success(`create ${GRAPHQL_NODE_OPENAPI_TAG} nodes`);
  }

  function createServerNodes(transformer: OpenAPITransformer) {
    transformer.getServers().forEach((server) => {
      createNode({
        ...server,
        id: createNodeId(`${GRAPHQL_NODE_OPENAPI_SERVER}-${server.url}`),
        children: [],
        internal: {
          type: GRAPHQL_NODE_OPENAPI_SERVER,
          content: JSON.stringify(server),
          contentDigest: createContentDigest(server),
        },
      });
    });
    reporter.success(`create ${GRAPHQL_NODE_OPENAPI_SERVER} nodes`);
  }

  function createPathNodes(transformer: OpenAPITransformer) {
    transformer.getPaths().forEach((path) => {
      createNode({
        ...path,
        id: createNodeId(`${GRAPHQL_NODE_OPENAPI_PATH}-${path.name}`),
        children: [],
        internal: {
          type: GRAPHQL_NODE_OPENAPI_PATH,
          content: JSON.stringify(path),
          contentDigest: createContentDigest(path),
        },
      });
    });
    reporter.success(`create ${GRAPHQL_NODE_OPENAPI_PATH} nodes`);
  }

  function createOperationNodes(transformer: OpenAPITransformer) {
    transformer.getOperations().forEach((operation) => {
      createNode({
        ...operation,
        id: createNodeId(
          `${GRAPHQL_NODE_OPENAPI_OPERATION}-${operation.path}-${operation.method}`
        ),
        children: [],
        internal: {
          type: GRAPHQL_NODE_OPENAPI_OPERATION,
          content: JSON.stringify(operation),
          contentDigest: createContentDigest(operation),
        },
      });
    });
    reporter.success(`create ${GRAPHQL_NODE_OPENAPI_OPERATION} nodes`);
  }

  function createComponentNodes(transformer: OpenAPITransformer) {
    transformer.getComponents().forEach((component) => {
      createNode({
        ...component,
        id: createNodeId(`${GRAPHQL_NODE_OPENAPI_COMPONENT}-${component.name}`),
        children: [],
        internal: {
          type: GRAPHQL_NODE_OPENAPI_COMPONENT,
          content: JSON.stringify(component),
          contentDigest: createContentDigest(component),
        },
      });
    });
    reporter.success(`create ${GRAPHQL_NODE_OPENAPI_COMPONENT} nodes`);
  }

  function createSchemaNodes(transformer: OpenAPITransformer) {
    transformer.getSchemas().forEach((schema) => {
      createNode({
        ...schema,
        id: createNodeId(`${GRAPHQL_NODE_OPENAPI_SCHEMA}-${schema.name}`),
        children: [],
        internal: {
          type: GRAPHQL_NODE_OPENAPI_SCHEMA,
          content: JSON.stringify(schema),
          contentDigest: createContentDigest(schema),
        },
      });
    });
    reporter.success(`create ${GRAPHQL_NODE_OPENAPI_SCHEMA} nodes`);
  }

  try {
    const document = (await OpenApiParser.parse(
      pluginOptionsWithDefaults.specPath
    )) as OpenAPIV3.Document;

    const transformer = new OpenAPITransformer(
      document,
      pluginOptionsWithDefaults
    );

    createInfoNode(transformer);
    createPathNodes(transformer);
    createSecurityNodes(transformer);
    createExternalDocsNode(transformer);
    createComponentNodes(transformer);
    createTagNodes(transformer);
    createServerNodes(transformer);
    createOperationNodes(transformer);
    createSchemaNodes(transformer);
  } catch (e) {
    reporter.panicOnBuild(`Error sourcing OpenAPI data: ${e.message}`);
  }
};
