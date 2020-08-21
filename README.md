# gatsby-openapi

A mono-repo with a set a gatsby plugins that can be used to build API docs from an OpenAPI specification.

__NOTE:__ This repo is in the very early stages of development.

## Plugins

- [gatsby-source-openapi](./gatsby-source-openapi): Parse an OpenAPI 3 specification and create the gatsby graphql nodes.
- [gatsby-theme-openapi-core](./gatsby-theme-openapi-core): Creates the theme pages.
- [gatsby-theme-openapi-theme-ui](./gatsby-theme-openapi-theme-ui): Renders the OpenAPI docs using `theme-ui`.

## Examples

- [example-theme-ui](./example-theme-ui): An example site using the [gatsby-theme-openapi-theme-ui]('./gatsby-theme-openapi-theme-ui) theme

## Goals

- Provide a framework for building API docs with full customisation capabilities (not just tweaking theme variables)
- Provide some good default themes
- Provide features to render in a single page, or multiple pages
- Provide a CLI utility to easily bootstrap/scaffold

## License

MIT License

Copyright (c) 2020 Richard Willis