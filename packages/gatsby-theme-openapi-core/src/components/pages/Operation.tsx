import { PageProps } from 'gatsby';
import { GraphQLOpenApiOperationWithFields } from 'gatsby-source-openapi/types';
import React from 'react';

interface OperationDataProps {
  operation: GraphQLOpenApiOperationWithFields;
}

export type OperationProps = PageProps<OperationDataProps>;

export const Operation: React.FunctionComponent<OperationProps> = () => {
  return <div>Operation</div>;
};
