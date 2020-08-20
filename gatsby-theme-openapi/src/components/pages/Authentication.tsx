import React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from 'theme-ui';
import { graphql } from 'gatsby';
import { Layout } from '../Layout';
import { SecuritySchemaTable } from '../SecuritySchemaTable';
import { useOpenApiInfo } from '../../hooks/use-openapi-info';
import { OpenApiSecuritySchema } from '../../types';
import { renderMarkdown } from '../../hooks/use-markdown-react';

interface SecuritySchema {
  node: OpenApiSecuritySchema;
}

interface AuthenticationProps {
  data: {
    securitySchemas: {
      schemas: SecuritySchema[];
    };
  };
}

const Authentication: React.FunctionComponent<AuthenticationProps> = ({
  data,
}) => {
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

export default Authentication;

export const query = graphql`
  query {
    securitySchemas: allOpenApiSecuritySchema {
      schemas: edges {
        node {
          type
          description
          name
          extra
        }
      }
    }
  }
`;
