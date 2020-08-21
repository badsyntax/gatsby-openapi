import React from 'react';
import { OpenApiSecuritySchema } from '../../types';
import { PageProps } from 'gatsby';

export interface SecuritySchema {
  node: OpenApiSecuritySchema;
}

export interface AuthenticationDataProps {
  securitySchemas: {
    schemas: SecuritySchema[];
  };
}

export const Authentication: React.FunctionComponent<PageProps<
  AuthenticationDataProps
>> = () => {
  return <div>auth</div>;
};
