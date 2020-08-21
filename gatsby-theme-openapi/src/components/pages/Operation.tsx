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

interface OperationProps {
  data: {
    path: OpenApiPath;
  };
}

const Operation: React.FunctionComponent<OperationProps> = ({ data }) => {
  const { title } = useOpenApiInfo();
  const { path } = data;
  const markdownReact = useMarkdownReact(path.description);
  const schemasByName = useOpenApiSchemasByName();
  return (
    <Layout>
      <Helmet>
        <title>
          {title} - {path.summary}
        </title>
      </Helmet>
      <Heading as="h2">{path.summary}</Heading>
      {markdownReact}
      <Text mb={4}>
        AUTHORIZATIONS:{' '}
        {path.security.map((security, i) => {
          return (
            <>
              <Link to={`/authentication#${security.name}`}>
                {security.name}
              </Link>
              {i !== path.security.length - 1 ? <span>, </span> : null}
            </>
          );
        })}
      </Text>
      <Heading as="h2" mt={4} mb={4}>
        Responses
      </Heading>
      {path.responses.map((response) => {
        return (
          <>
            <Heading as="h3" mt={4} mb={2}>
              {response.code} {response.description}
            </Heading>
            {response.content.map((content) => {
              console.log('content', content);
              return (
                <>
                  <div>Content Type: {content.contentType}</div>
                  <div>Response Schema:</div>
                  <SchemaExplorer
                    schema={JSON.parse(content.schema)}
                    allSchemasByName={schemasByName}
                  />
                  <div>Examples:</div>
                  <ResponseExamples
                    content={content}
                    allSchemasByName={schemasByName}
                  />
                </>
              );
            })}
          </>
        );
      })}
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
