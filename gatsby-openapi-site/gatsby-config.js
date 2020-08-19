module.exports = {
  siteMetadata: {
    title: 'OpenAPI Example',
  },
  plugins: [
    {
      resolve: require.resolve('../gatsby-openapi-source-plugin'),
      options: {
        specPath: require.resolve('./spec/openapi.yml'),
      },
    },
    {
      resolve: require.resolve('../gatsby-openapi-theme'),
    },
  ],
};
