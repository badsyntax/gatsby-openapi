import { AuthenticationDataProps } from 'gatsby-theme-openapi-core/src/components/pages/Authentication';
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { Heading } from 'theme-ui';
import { useDeferenceOpenApiSchema } from '../hooks/useDeferenceOpenApiSchema';
import { isOAuth2SecurityScheme } from '../types';
import { Markdown } from './Markdown';
import { Panel } from './Panel';
import { SecuritySchemaTable } from './SecuritySchemaTable';

interface SecuritySchemes {
  [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SecuritySchemeObject;
}

interface AuthenticationBodyProps {
  data: AuthenticationDataProps;
}

export const AuthenticationBody: React.FunctionComponent<AuthenticationBodyProps> = ({
  data,
}) => {
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
    <React.Fragment>
      <Heading as="h1" mb={4} id="/authentication">
        Authentication
      </Heading>
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
    </React.Fragment>
  );
};
