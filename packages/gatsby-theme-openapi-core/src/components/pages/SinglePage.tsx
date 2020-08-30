import { PageProps } from 'gatsby';
import React from 'react';
import { AuthenticationDataProps } from './Authentication';

export interface SinglePageDataProps extends AuthenticationDataProps {
  allOpenApiSecurity: {
    edges: Array<{
      node: {
        name: string;
        value: string;
      };
    }>;
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
