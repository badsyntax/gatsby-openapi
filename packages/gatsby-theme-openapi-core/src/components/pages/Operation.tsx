import { PageProps } from 'gatsby';
import { OperationWithFields } from 'gatsby-source-openapi/types';
import React from 'react';

interface OperationDataProps {
  operation: OperationWithFields;
}

export type OperationProps = PageProps<OperationDataProps>;

export const Operation: React.FunctionComponent<OperationProps> = () => {
  return <div>Operation</div>;
};
