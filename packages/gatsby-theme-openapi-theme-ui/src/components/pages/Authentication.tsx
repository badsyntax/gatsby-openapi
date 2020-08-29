import { AuthenticationProps } from 'gatsby-theme-openapi-core/src/components/pages/Authentication';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { AuthenticationBody } from '../AuthenticationBody';
import { Layout } from '../Layout';

export const Authentication: React.FunctionComponent<AuthenticationProps> = (
  props
) => {
  const { title } = useOpenApiInfo();
  return (
    <Layout>
      <Helmet>
        <title>{title} - Authentication</title>
      </Helmet>
      <AuthenticationBody {...props} />
    </Layout>
  );
};
