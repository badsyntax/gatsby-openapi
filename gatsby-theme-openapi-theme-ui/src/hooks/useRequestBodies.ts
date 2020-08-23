import { graphql, useStaticQuery } from 'gatsby';
import { OpenApiRequestBodiesByName } from '../types';

export function useRequestBodiesByName(): OpenApiRequestBodiesByName {
  const data = useStaticQuery(graphql`
    query {
      requestBodies: allOpenApiRequestBody {
        edges {
          node {
            description
            name
            required
            content {
              type
              description
              schema
              examples {
                example
                name
              }
            }
          }
        }
      }
    }
  `);
  return data.requestBodies.edges.reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue.node.name]: currentValue.node,
    };
  }, {});
}
