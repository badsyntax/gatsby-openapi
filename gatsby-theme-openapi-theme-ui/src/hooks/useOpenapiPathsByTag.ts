import { graphql, useStaticQuery } from 'gatsby';
import { OpenApiPath } from '../types';

interface Endpoint {
  endpoint: OpenApiPath;
}

interface OpenApiPathsByTag {
  tag: string;
  totalCount: number;
  endpoints: Endpoint[];
}

export function useOpenapiPathsByTag(): OpenApiPathsByTag[] {
  const data = useStaticQuery(graphql`
    query {
      paths: allOpenApiPath {
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
              fields {
                slug
              }
              x_codeSamples {
                lang
                source
              }
              responses {
                code
                description
                content {
                  type
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
  `);
  return data.paths.tags;
}
