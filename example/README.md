## Example Queries

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
