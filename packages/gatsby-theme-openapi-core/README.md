# gatsby-theme-openapi-core

A gatsby theme plugin that creates the theme pages.

## Usage


```js
module.exports = {
  siteMetadata: {
    title: 'OpenAPI docs',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-openapi-core',
      options: {
        specPath: require.resolve('./spec/openapi.yml'),
      },
    },
  ],
};
```

## License

MIT License

Copyright (c) 2020 Richard Willis
