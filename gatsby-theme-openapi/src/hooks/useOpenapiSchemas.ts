import { graphql, useStaticQuery } from 'gatsby';
import { OpenApiSchema } from '../types';

export function useOpenApiSchemas(): OpenApiSchema[] {
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
