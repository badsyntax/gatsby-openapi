module.exports = (themeOptions) => {
  return {
    plugins: [
      {
        resolve: require.resolve('../gatsby-plugin-openapi-source'),
        options: {
          specPath: themeOptions.specPath,
        },
      },
      'gatsby-plugin-theme-ui',
      'gatsby-plugin-react-helmet',
    ],
  };
};
