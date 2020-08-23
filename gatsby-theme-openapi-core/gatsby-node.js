// TODO: import from `gatsby-source-openapi`;
const API_PATH_TYPE = 'OpenApiPath';
const API_SCHEMA_TYPE = 'OpenApiSchema';

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
  if (node.internal.type === API_SCHEMA_TYPE) {
    const slug = node.name;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  async function createPathPages() {
    const result = await graphql(`
      query {
        paths: allOpenApiPath {
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
        path: `operation/${node.fields.slug}`,
        component,
        context: {
          slug: node.fields.slug,
        },
      });
    });

    reporter.success('create path pages');
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

  async function createSchemaModelPages() {
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
        path: `model/${node.fields.slug}`,
        component,
        context: {
          slug: node.fields.slug,
        },
      });
    });
    reporter.success('create schema model pages');
  }

  try {
    await createPathPages();
    await createSchemaModelPages();
    createAuthenticationPage();
    reporter.info('successfully created all pages');
  } catch (e) {
    reporter.panicOnBuild(`Error creating pages: ${e.message}`);
  }
};
