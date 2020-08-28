module.exports = {
  pathPrefix: '/gatsby-node',
  siteMetadata: {
    title: 'OpenAPI Example',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-openapi-theme-ui',
      options: {
        specPath: require.resolve('./spec/openapi.yml'),
      },
    },
  ],
};
