## Example Queries

Get all endpoints and field data:

```graphql
query {
  data: allOpenApiPaths {
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
            schema {
              type
              description
              required
              example
              items {
                type
                description
                format
                example
              }
            }
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
  data: allOpenApiPaths {
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
              schema {
                type
                description
                required
                example
                items {
                  type
                  description
                  format
                  example
                }
              }
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

Get a single endpoint by slug:

```graphql
{
  openApiPaths(fields: {slug: {eq: "getMe"}}) {
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
        schema {
          type
          description
          required
          example
          items {
            type
            description
            format
            example
          }
        }
      }
    }
  }
}
```
