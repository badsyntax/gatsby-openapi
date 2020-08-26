import { PageProps } from 'gatsby';
import { GraphQLOpenApiSchema } from 'gatsby-source-openapi/types';
import React from 'react';

export interface ModelDataProps {
  schema: GraphQLOpenApiSchema;
}

export type ModelProps = PageProps<ModelDataProps>;

export const Model: React.FunctionComponent<ModelProps> = () => {
  return <div>model</div>;
};
