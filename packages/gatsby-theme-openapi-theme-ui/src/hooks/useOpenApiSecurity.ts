import { OpenAPIV3 } from 'openapi-types';
import { graphql, useStaticQuery } from 'gatsby';
import { Edges } from '../types';
import { OpenAPIV3GraphQLObjectAsArray } from 'gatsby-source-openapi/types';

export function useOpenApiSecurity(): OpenAPIV3.SecurityRequirementObject[] {
  const data: {
    allOpenApiSecurity: Edges<OpenAPIV3GraphQLObjectAsArray>;
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
