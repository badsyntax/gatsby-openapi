import { OpenAPIV3 } from 'openapi-types';
import { graphql, useStaticQuery } from 'gatsby';
import { OperationWithFields, Edges } from '../types';

export interface OpenApiOperationsByTag {
  [key: string]: OpenApiOperationByTag[];
}

export interface OpenApiOperationByTag
  extends Omit<OperationWithFields, 'operation'> {
  operation: OpenAPIV3.OperationObject;
}

export function useOpenApiOperationsByTag(): OpenApiOperationsByTag {
  const data: {
    allOpenApiOperation: Edges<OperationWithFields>;
  } = useStaticQuery(graphql`
    query {
      allOpenApiOperation {
        edges {
          node {
            path
            method
            operation
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  return data.allOpenApiOperation.edges.reduce((previousValue, { node }) => {
    const operation: OpenAPIV3.OperationObject = JSON.parse(node.operation);
    operation.tags.forEach((tag) => {
      if (!previousValue[tag]) {
        previousValue[tag] = [];
      }
      previousValue[tag].push({
        ...node,
        operation,
      });
    });
    return previousValue;
  }, {});
}
