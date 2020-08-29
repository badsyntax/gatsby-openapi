/** @jsx jsx */

import { SinglePageProps } from 'gatsby-theme-openapi-core/src/components/pages/SinglePage';
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Heading, jsx } from 'theme-ui';
import { useDeferenceOpenApiSchema } from '../../hooks/useDeferenceOpenApiSchema';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { isOAuth2SecurityScheme } from '../../types';
import { AuthenticationBody } from '../AuthenticationBody';
import { HomePageBody } from '../HomePageBody';
import { Layout } from '../Layout';
import { Markdown } from '../Markdown';
import { Panel } from '../Panel';
import { SecuritySchemaTable } from '../SecuritySchemaTable';

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
      {dereferencedSecuritySchemes.map((securityScheme) => {
        return (
          <Panel key={securityScheme.name}>
            <Heading as="h2" mb={3} id={securityScheme.name}>
              {securityScheme.name}
            </Heading>
            <SecuritySchemaTable scheme={securityScheme.scheme} />
            {!isOAuth2SecurityScheme(securityScheme.scheme) &&
              securityScheme.scheme.description && (
                <Markdown text={securityScheme.scheme.description || ''} />
              )}
          </Panel>
        );
      })}
    </Layout>
  );
};
