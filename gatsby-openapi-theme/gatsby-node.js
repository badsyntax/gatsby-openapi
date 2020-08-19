/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const API_PATH_TYPE = `OpenApiPaths`;

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      all${API_PATH_TYPE} {
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
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const component = path.resolve(__dirname, './src/components/Page.tsx');

  result.data[`all${API_PATH_TYPE}`].edges.forEach(({ node }) => {
    if (!node.fields.slug) {
      reporter.warn('Node has a null slug field!');
      return;
    }
    createPage({
      path: node.fields.slug,
      component,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};
