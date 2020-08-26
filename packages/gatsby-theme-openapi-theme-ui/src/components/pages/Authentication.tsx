import { AuthenticationProps } from 'gatsby-theme-openapi-core/src/components/pages/Authentication';
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from 'theme-ui';
import { useDeferenceOpenApiSchema } from '../../hooks/useDeferenceOpenApiSchema';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { isOAuth2SecurityScheme } from '../../types';
import { renderMarkdown } from '../../util/renderMarkdown';
import { Layout } from '../Layout';
import { SecuritySchemaTable } from '../SecuritySchemaTable';

interface SecuritySchemes {
  [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SecuritySchemeObject;
}

export const Authentication: React.FunctionComponent<AuthenticationProps> = ({
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
        <title>{title} - Authentication</title>
      </Helmet>
      <Heading as="h1" mb={4}>
        Authentication
      </Heading>
      {dereferencedSecuritySchemes.map((securityScheme) => {
        return (
          <React.Fragment key={securityScheme.name}>
            <Heading as="h2" mb={3} mt={4} id={securityScheme.name}>
              {securityScheme.name}
            </Heading>
            <SecuritySchemaTable scheme={securityScheme.scheme} />
            {!isOAuth2SecurityScheme(securityScheme.scheme) &&
              securityScheme.scheme.description &&
              renderMarkdown(securityScheme.scheme.description)}
          </React.Fragment>
        );
      })}
    </Layout>
  );
};
