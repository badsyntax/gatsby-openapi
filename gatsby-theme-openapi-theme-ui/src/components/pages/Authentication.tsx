import React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from 'theme-ui';
import { Layout } from '../Layout';
import { SecuritySchemaTable } from '../SecuritySchemaTable';
import { OpenApiSecuritySchema } from '../../types';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { renderMarkdown } from '../../hooks/useMarkdownReact';
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
>> = ({ data }) => {
  const { title } = useOpenApiInfo();
  return (
    <Layout>
      <Helmet>
        <title>{title} - Authentication</title>
      </Helmet>
      <Heading as="h1" mb={4}>
        Authentication
      </Heading>
      {data.securitySchemas.schemas.map(({ node: schema }) => {
        return (
          <>
            <Heading as="h2" mb={3} mt={4} id={schema.name}>
              {schema.name}
            </Heading>
            <SecuritySchemaTable schema={schema} />
            {renderMarkdown(schema.description)}
          </>
        );
      })}
    </Layout>
  );
};
