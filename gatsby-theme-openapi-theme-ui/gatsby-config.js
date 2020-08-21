module.exports = (themeOptions) => {
  return {
    plugins: [
      {
        resolve: require.resolve('../gatsby-theme-openapi-core'),
        options: {
          specPath: themeOptions.specPath,
        },
      },
      'gatsby-plugin-theme-ui',
      'gatsby-plugin-react-helmet',
    ],
  };
};
