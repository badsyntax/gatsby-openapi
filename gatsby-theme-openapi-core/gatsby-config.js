module.exports = (themeOptions) => {
  return {
    plugins: [
      {
        resolve: require.resolve('../gatsby-source-openapi'),
        options: {
          specPath: themeOptions.specPath,
        },
      },
    ],
  };
};
