import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Heading, Text } from 'theme-ui';
import { Layout } from '../Layout';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { OpenApiPath } from '../../types';
import { useMarkdownReact } from '../../hooks/useMarkdownReact';
import { Link } from '../Link';
import { SchemaExplorer } from '../SchemaExplorer';
import { useOpenApiSchemasByName } from '../../hooks/useOpenapiSchemasByName';
import { ResponseExamples } from '../ResponseExamples';
import { Responses } from '../Responses';

interface OperationProps {
  data: {
    path: OpenApiPath;
  };
}

const Operation: React.FunctionComponent<OperationProps> = ({ data }) => {
  const { title } = useOpenApiInfo();
  const { path } = data;
  const markdownReact = useMarkdownReact(path.description);
  const allSchemasByName = useOpenApiSchemasByName();
  return (
    <Layout>
      <Helmet>
        <title>
          {title} - {path.summary}
        </title>
      </Helmet>
      <Heading as="h2">{path.summary}</Heading>
      {markdownReact}
      <Heading as="h2" mt={4} mb={3}>
        Authorizations
      </Heading>
      {Boolean(path.security.length) && (
        <ul>
          {path.security.map((security) => {
            return (
              <li key={`authorization-${security.name}`}>
                <Link to={`/authentication#${security.name}`}>
                  {security.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {!Boolean(path.security.length) && (
        <div>(No authorizations for this operation.)</div>
      )}
      <Heading as="h2" mt={4} mb={3}>
        Responses
      </Heading>
      <Responses
        responses={path.responses}
        allSchemasByName={allSchemasByName}
      />
    </Layout>
  );
};

export default Operation;

export const query = graphql`
  query($slug: String!) {
    path: openApiPath(fields: { slug: { eq: $slug } }) {
      method
      summary
      description
      operationId
      tags
      security {
        name
        opts
      }
      x_codeSamples {
        lang
        source
      }
      responses {
        code
        description
        content {
          contentType
          examples {
            name
            example
          }
          schema
        }
      }
    }
  }
`;
