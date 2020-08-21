import React from 'react';
import { OpenApiSchema } from '../../types';
import { PageProps } from 'gatsby';

export interface ModelDataProps {
  schema: OpenApiSchema;
}

export const Model: React.FunctionComponent<PageProps<ModelDataProps>> = () => {
  return <div>model</div>;
};
