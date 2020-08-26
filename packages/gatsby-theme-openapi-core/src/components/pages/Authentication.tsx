import { PageProps } from 'gatsby';
import React from 'react';

export interface AuthenticationDataProps {
  securitySchemes: {
    value: string;
  };
}

export type AuthenticationProps = PageProps<AuthenticationDataProps>;

export const Authentication: React.FunctionComponent<AuthenticationProps> = () => {
  return <div>auth</div>;
};
