import { graphql, useStaticQuery } from 'gatsby';
import { GraphQLOpenApiObjectAsArray } from 'gatsby-source-openapi/types';
import { OpenAPIV3 } from 'openapi-types';
import { Edges } from '../types';

export function useOpenApiSecurity(): OpenAPIV3.SecurityRequirementObject[] {
  const data: {
    allOpenApiSecurity: Edges<GraphQLOpenApiObjectAsArray>;
  } = useStaticQuery(graphql`
    query {
      allOpenApiSecurity {
        edges {
          node {
            name
            value
          }
        }
      }
    }
  `);
  return [
    data.allOpenApiSecurity.edges.reduce((previousValue, { node }) => {
      return {
        ...previousValue,
        [node.name]: JSON.parse(node.value),
      };
    }, {}),
  ];
}
