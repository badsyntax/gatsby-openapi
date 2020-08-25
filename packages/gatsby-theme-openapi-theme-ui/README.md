# gatsby-theme-openapi-theme-ui

A gatsby theme plugin that renders the OpenAPI docs using `theme-ui`.

## Usage

First, install the plugin:

```
npm i gatsby-theme-openapi-theme-ui
```

Then enable the plugin in your `gatsby-config.js`, specifying the path to your OpenAPI spec.

```js
module.exports = {
  siteMetadata: {
    title: 'OpenAPI docs',
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
```

## License

MIT License

Copyright (c) 2020 Richard Willis