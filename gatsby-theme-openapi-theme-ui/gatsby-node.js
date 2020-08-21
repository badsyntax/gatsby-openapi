// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions;

//   async function createPathPages() {
//     const result = await graphql(`
//       query {
//         paths: allOpenApiPath {
//           edges {
//             node {
//               fields {
//                 slug
//               }
//             }
//           }
//         }
//       }
//     `);

//     if (result.errors) {
//       reporter.panicOnBuild('Error while querying paths.');
//       return;
//     }

//     const component = require.resolve('./src/components/pages/Operation.tsx');

//     result.data.paths.edges.forEach(({ node }) => {
//       if (!node.fields.slug) {
//         reporter.warn(`Node has a null slug field!: ${JSON.stringify(node)}`);
//         return;
//       }
//       createPage({
//         path: `operation/${node.fields.slug}`,
//         component,
//         context: {
//           slug: node.fields.slug,
//         },
//       });
//     });
//   }

//   function createAuthenticationPage() {
//     const component = require.resolve(
//       './src/components/pages/Authentication.tsx'
//     );
//     createPage({
//       path: 'authentication',
//       component,
//       context: {
//         slug: 'authentication',
//       },
//     });
//   }

//   async function createSchemaModelPages() {
//     const result = await graphql(`
//       query {
//         schemas: allOpenApiSchema {
//           edges {
//             node {
//               name
//               schema
//               fields {
//                 slug
//               }
//             }
//           }
//         }
//       }
//     `);

//     if (result.errors) {
//       reporter.panicOnBuild('Error while querying schemas.');
//       return;
//     }

//     const component = require.resolve('./src/components/pages/Model.tsx');

//     result.data.schemas.edges.forEach(({ node }) => {
//       if (!node.fields.slug) {
//         reporter.warn(`Node has a null slug field!: ${JSON.stringify(node)}`);
//         return;
//       }
//       createPage({
//         path: `model/${node.fields.slug}`,
//         component,
//         context: {
//           slug: node.fields.slug,
//         },
//       });
//     });
//   }

//   await createPathPages();
//   await createSchemaModelPages();
//   createAuthenticationPage();
// };
