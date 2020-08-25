import { OpenAPIV3 } from 'openapi-types';
import { NodePluginArgs, CreateNodeArgs } from 'gatsby';

import {
  API_OPERATION_TYPE,
  API_SCHEMA_TYPE,
} from 'gatsby-source-openapi/types';

export const onCreateNode = ({ node, actions }: CreateNodeArgs): void => {
  const { createNodeField } = actions;
  if (node.internal.type === API_OPERATION_TYPE) {
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
  if (node.internal.type === API_SCHEMA_TYPE) {
    const slug = node.name;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

export const createPages = async ({
  graphql,
  actions,
  reporter,
}: NodePluginArgs): Promise<void> => {
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
  } catch (e) {
    reporter.panicOnBuild(`Error creating pages: ${e.message}`);
  }
};
