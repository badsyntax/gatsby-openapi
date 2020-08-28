import { graphql, useStaticQuery } from 'gatsby';
import { GraphQLOpenApiSchema } from 'gatsby-source-openapi/types';

export function useOpenApiSchemas(): GraphQLOpenApiSchema[] {
  const data = useStaticQuery(graphql`
    query {
      schemas: allOpenApiSchema {
        edges {
          node {
            name
            schema
          }
        }
      }
    }
  `);
  return data.schemas.edges.map(({ node }) => node);
}
