import { NodePluginArgs, PluginOptions } from 'gatsby';
import { OpenAPIV3 } from 'openapi-types';
import { OpenApiParser } from './openapi/OpenApiParser';
import { OpenAPITransformer } from './openapi/OpenAPITransformer';

import {
  graphQlTypes,
  API_INFO_TYPE,
  API_PATH_TYPE,
  API_SECURITY_TYPE,
  API_COMPONENT_TYPE,
  API_TAG_TYPE,
  API_SERVER_TYPE,
  API_EXTERNAL_DOCS_TYPE,
  API_OPERATION_TYPE,
  API_SCHEMA_TYPE,
} from './types';

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
    const info = transformer.getInfo();
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

  function createExternalDocsNode(transformer: OpenAPITransformer) {
    const externalDocs = transformer.document.externalDocs;
    if (externalDocs) {
      createNode({
        ...externalDocs,
        id: createNodeId(API_EXTERNAL_DOCS_TYPE),
        children: [],
        internal: {
          type: API_EXTERNAL_DOCS_TYPE,
          content: JSON.stringify(externalDocs),
          contentDigest: createContentDigest(externalDocs),
        },
      });
      reporter.success(`create ${API_EXTERNAL_DOCS_TYPE} node`);
    } else {
      reporter.warn(
        `skipped ${API_EXTERNAL_DOCS_TYPE} node, no externalDocs found in schema`
      );
    }
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

  function createServerNodes(transformer: OpenAPITransformer) {
    transformer.getServers().forEach((server) => {
      createNode({
        ...server,
        id: createNodeId(`${API_SERVER_TYPE}-${server.url}`),
        children: [],
        internal: {
          type: API_SERVER_TYPE,
          content: JSON.stringify(server),
          contentDigest: createContentDigest(server),
        },
      });
    });
    reporter.success(`create ${API_SERVER_TYPE} nodes`);
  }

  function createPathNodes(transformer: OpenAPITransformer) {
    transformer.getPaths().forEach((path) => {
      createNode({
        ...path,
        id: createNodeId(`${API_PATH_TYPE}-${path.name}`),
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

  function createComponentNodes(transformer: OpenAPITransformer) {
    transformer.getComponents().forEach((component) => {
      createNode({
        ...component,
        id: createNodeId(`${API_COMPONENT_TYPE}-${component.name}`),
        children: [],
        internal: {
          type: API_COMPONENT_TYPE,
          content: JSON.stringify(component),
          contentDigest: createContentDigest(component),
        },
      });
    });
    reporter.success(`create ${API_COMPONENT_TYPE} nodes`);
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

  try {
    const document = (await OpenApiParser.parse(
      pluginOptions.specPath
    )) as OpenAPIV3.Document;
    const transformer = new OpenAPITransformer(document);

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
