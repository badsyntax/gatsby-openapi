import { CreateNodeArgs, NodePluginArgs } from 'gatsby';
import {
  GRAPHQL_NODE_OPENAPI_OPERATION,
  GRAPHQL_NODE_OPENAPI_SCHEMA,
} from 'gatsby-source-openapi/types';
import { OpenAPIV3 } from 'openapi-types';
import { CustomPluginOptions } from './src/types';
import { defaultPluginOptions } from './src/util/defaultPluginOptions';

export const onCreateNode = ({ node, actions }: CreateNodeArgs): void => {
  const { createNodeField } = actions;
  if (node.internal.type === GRAPHQL_NODE_OPENAPI_OPERATION) {
    const operation: OpenAPIV3.OperationObject = JSON.parse(
      node.operation as string
    );
    const slug = operation.operationId;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
  if (node.internal.type === GRAPHQL_NODE_OPENAPI_SCHEMA) {
    const slug = node.name;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
  if (
    node.internal.type === 'SitePlugin' &&
    node.name === 'gatsby-theme-openapi-core'
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

export const createPages = async ({
  graphql,
  actions,
  reporter,
}: NodePluginArgs): // options: PluginOptions
Promise<void> => {
  const { createPage } = actions;

  async function createOperationPages() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await graphql(`
      query {
        paths: allOpenApiOperation {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `);

    if (result.errors) {
      reporter.panicOnBuild('Error while querying paths.');
      return;
    }

    const component = require.resolve('./src/templates/Operation.tsx');
    result.data.paths.edges.forEach(({ node }) => {
      if (!node.fields.slug) {
        reporter.warn(`Node has a null slug field!: ${JSON.stringify(node)}`);
        return;
      }
      createPage({
        path: `operation/${node.fields.slug}/`,
        component,
        context: {
          slug: node.fields.slug,
        },
      });
    });

    reporter.success('create operation pages');
  }

  function createAuthenticationPage() {
    const component = require.resolve('./src/templates/Authentication.tsx');
    createPage({
      path: 'authentication',
      component,
      context: {
        slug: 'authentication',
      },
    });
    reporter.success('create authentication page');
  }

  function createHomePage() {
    const component = require.resolve('./src/templates/SinglePage.tsx');
    createPage({
      path: '/',
      component,
      context: {
        slug: 'home',
      },
    });
    reporter.success('create home page');
  }

  async function createSchemaModelPages(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await graphql(`
      query {
        schemas: allOpenApiSchema {
          edges {
            node {
              name
              schema
              fields {
                slug
              }
            }
          }
        }
      }
    `);

    if (result.errors) {
      reporter.panicOnBuild('Error while querying schemas.');
      return;
    }

    const component = require.resolve('./src/templates/Model.tsx');

    result.data.schemas.edges.forEach(({ node }) => {
      if (!node.fields.slug) {
        reporter.warn(`Node has a null slug field!: ${JSON.stringify(node)}`);
        return;
      }
      createPage({
        path: `model/${node.fields.slug}/`,
        component,
        context: {
          slug: node.fields.slug,
        },
      });
    });
    reporter.success('create schema model pages');
  }

  try {
    await createOperationPages();
    await createSchemaModelPages();
    createAuthenticationPage();
    createHomePage();
  } catch (e) {
    reporter.panicOnBuild(`Error creating pages: ${e.message}`);
  }
};
