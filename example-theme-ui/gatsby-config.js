module.exports = {
  siteMetadata: {
    title: 'OpenAPI Example',
  },
  plugins: [
    {
      resolve: require.resolve('../gatsby-theme-openapi-theme-ui'),
      options: {
        specPath: require.resolve('./spec/openapi.yml'),
      },
    },
  ],
};
