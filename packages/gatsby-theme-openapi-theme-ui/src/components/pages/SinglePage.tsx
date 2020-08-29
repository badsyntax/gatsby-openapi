/** @jsx jsx */

import { SinglePageProps } from 'gatsby-theme-openapi-core/src/components/pages/SinglePage';
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, jsx } from 'theme-ui';
import { useDeferenceOpenApiSchema } from '../../hooks/useDeferenceOpenApiSchema';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { AuthenticationBody } from '../AuthenticationBody';
import { HomePageBody } from '../HomePageBody';
import { Layout } from '../Layout';

interface SecuritySchemes {
  [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SecuritySchemeObject;
}

export const SinglePage: React.FunctionComponent<SinglePageProps> = ({
  data,
}) => {
  const { title } = useOpenApiInfo();
  const deference = useDeferenceOpenApiSchema<OpenAPIV3.SecuritySchemeObject>();
  const securitySchemes: SecuritySchemes = JSON.parse(
    data.securitySchemes.value
  );
  const dereferencedSecuritySchemes = Object.keys(securitySchemes).map(
    (name) => {
      return {
        name,
        scheme: deference(securitySchemes[name]),
      };
    }
  );
  return (
    <Layout>
      <Helmet>
        <title>{title} - SinglePage</title>
      </Helmet>
      <Box mb={4}>
        <HomePageBody />
      </Box>
      <Box mb={4}>
        <AuthenticationBody data={{ securitySchemes: data.securitySchemes }} />
      </Box>
    </Layout>
  );
};
