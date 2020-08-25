# gatsby-source-openapi

A gatsby source plugin that parses an OpenAPI 3 specification into gatsby GraphQL nodes.

## Transformations and deviations from the OpenAPI JSON specification

Find the OpenAPI specification here: http://spec.openapis.org/oas/v3.0.3

### Overview

GraphQL requires data to be stored in a particular structure to allow for querying. This means we have to convert some objects to array of objects. For example, the [Paths Object](http://spec.openapis.org/oas/v3.0.3#paths-object) is transformed to an array of `OpenApiGraphQLPathObject`, with keys that reference the path, method and [Operation Object](http://spec.openapis.org/oas/v3.0.3#operation-object). The Operation Object is transformed to a new type called `OpenApiGraphQLOperationObject` which includes further transformations of Object items to array of objects to allow for querying.

For external definitions, the `$ref` key is transformed to `ref` as `$` is an illegal character in GraphQL.

For example:

```ts
Array<
  {
    "path": string;
    "method": string;
    "operation": OpenApiGraphQLOperationObject;
    "ref": string;
    "summary": string;
    "description": description;
  }
>
```

### Schemas

The OpenAPI [schemas definition](http://spec.openapis.org/oas/v3.0.3#schema-object) can include references to other schemas.

While the OpenAPI parser can resolve all references, dereferencing is not ideal as we want to track the names of the references (eg to show referenced schema names in the UI.)

Also self-referencing schemas are not ideal for GraphQL as it's not convenient to query a deeply nested tree of unknown depth.

For these reasons, schemas are stored as JSON strings and must be dereferenced at runtime.

NOTE: `$ref` is not transformed to `ref` for schema definitions.

### Types

TypeScript type definitions are provided to help the consumer understand the differences between `OpenApiGraphQL*` types and `OpenApiV3*` types.

## Example graphql queries

Get all endpoints and field data:

```graphql
{
  data: allOpenApiPath {
    endpoints: edges {
      endpoint: node {
        method
        summary
        description
        operationId
        tags
        x_codeSamples {
          lang
          source
        }
        responses {
          code
          description
          content {
            contentType
            examples {
              name
              example
            }
            schema
          }
        }
      }
    }
  }
}
```

Get all endpoints grouped by tag:

```graphql
query {
  data: allOpenApiPath {
    tags: group(field: tags) {
      tag: fieldValue
      totalCount
      endpoints: edges {
        endpoint: node {
          method
          summary
          description
          operationId
          tags
          x_codeSamples {
            lang
            source
          }
          responses {
            code
            description
            content {
              contentType
              examples {
                name
                example
              }
              schema
            }
          }
        }
      }
    }
  }
}
```

Get site metadata:

```graphql
query {
  site {
    siteMetadata {
      title
    }
  }
}
```

Get OpenAPI info:

```graphql
query {
  openApiInfo {
    title
    contact {
      name
      url
    }
    description
    license {
      name
      url
    }
    version
    x_logo {
      altText
      url
    }
  }
}
```

Get a single endpoint by slug:

```graphql
{
  openApiPath(fields: {slug: {eq: "getMe"}}) {
    method
    summary
    description
    operationId
    tags
    x_codeSamples {
      lang
      source
    }
    responses {
      code
      description
      content {
        contentType
        examples {
          name
          example
        }
        schema
      }
    }
  }
}
```

Get all security schemas:

```graphql
query {
  allOpenApiSecuritySchema {
    edges {
      node {
        type
        description
        name
        extra
      }
    }
  }
}
```

Get all schemas

```graphql
query {
  allOpenApiSchema {
    edges {
      node {
        name
        schema
      }
    }
  }
}
```

## License

MIT License

Copyright (c) 2020 Richard Willis
