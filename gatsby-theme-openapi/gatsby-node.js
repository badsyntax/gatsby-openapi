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

    const component = require.resolve('./src/components/pages/Path.tsx');

    result.data[`paths`].edges.forEach(({ node }) => {
      if (!node.fields.slug) {
        reporter.warn('Node has a null slug field!');
        return;
      }
      createPage({
        path: node.fields.slug,
        component,
        context: {
          slug: node.fields.slug,
        },
      });
    });
  }

  async function createAuthenticationPage() {
    const component = require.resolve(
      './src/components/pages/Authentication.tsx'
    );
    createPage({
      path: 'authentication',
      component,
      context: {
        slug: 'authentication',
      },
    });
  }

  await createPathPages();
  await createAuthenticationPage();
};
