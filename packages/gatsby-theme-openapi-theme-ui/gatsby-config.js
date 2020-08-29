module.exports = (themeOptions) => {
  return {
    plugins: [
      {
        resolve: 'gatsby-theme-openapi-core',
        options: {
          specPath: themeOptions.specPath,
          generateCodeSamples: themeOptions.generateCodeSamples,
          codeSampleTargets: themeOptions.codeSampleTargets,
          singlePage: themeOptions.singlePage,
        },
      },
      'gatsby-plugin-theme-ui',
      'gatsby-plugin-react-helmet',
    ],
  };
};
