import React from 'react';
import { OpenAPIV3 } from 'openapi-types';

import { Helmet } from 'react-helmet';
import { Heading } from 'theme-ui';
import { Layout } from '../Layout';
import { SecuritySchemaTable } from '../SecuritySchemaTable';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { PageProps } from 'gatsby';
import { renderMarkdown } from '../../util/renderMarkdown';
import { JsonString } from 'gatsby-source-openapi/types';
import { useDeferenceOpenApiSchema } from '../../hooks/useDeferenceOpenApiSchema';
import { isOAuth2SecurityScheme } from '../../types';

export interface AuthenticationDataProps {
  securitySchemes: {
    value: JsonString;
  };
}

interface SecuritySchemes {
  [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SecuritySchemeObject;
}

export const Authentication: React.FunctionComponent<PageProps<
  AuthenticationDataProps
>> = ({ data }) => {
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
              renderMarkdown(securityScheme.scheme.description)}
          </React.Fragment>
        );
      })}
    </Layout>
  );
};
