import { PageProps } from 'gatsby';
import React from 'react';

export interface SinglePageDataProps {
  securitySchemes: {
    value: string;
    name: string;
  };
  allOpenApiSchema: {
    edges: Array<{
      node: {
        name: string;
        schema: string;
        fields: {
          slug: string;
        };
      };
    }>;
  };
  allOpenApiOperation: {
    edges: Array<{
      node: {
        fields: {
          slug: string;
        };
        method: string;
        operation: string;
        path: string;
      };
    }>;
  };
}

export type SinglePageProps = PageProps<SinglePageDataProps>;

export const SinglePage: React.FunctionComponent<SinglePageProps> = () => {
  return <div>single page</div>;
};
