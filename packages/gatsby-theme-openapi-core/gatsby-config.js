module.exports = (themeOptions) => {
  return {
    plugins: [
      {
        resolve: 'gatsby-source-openapi',
        options: {
          specPath: themeOptions.specPath,
        },
      },
    ],
  };
};
