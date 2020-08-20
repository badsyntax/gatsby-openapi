import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Heading, Text } from 'theme-ui';
import { Layout } from '../Layout';
import { useOpenApiInfo } from '../../hooks/use-openapi-info';
import { OpenApiPath } from '../../types';
import { useMarkdownReact } from '../../hooks/use-markdown-react';
import { Link } from '../Link';

interface Props {
  data: {
    path: OpenApiPath;
  };
}

const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

function renderSchemaTree(schema) {
  try {
    switch (schema.type) {
      case SCHEMA_TYPE_OBJECT:
        return <ul>{renderSchemaObject(schema)}</ul>;
      case SCHEMA_TYPE_ARRAY:
        return <span>Array: {renderSchemaArray(schema)}</span>;
      default:
        return (
          <span>
            {schema.type}{' '}
            {schema.description ? `(${schema.description})` : null}
          </span>
        );
    }
  } catch (e) {
    return null;
  }
}

function renderSchemaArray(schema) {
  if (schema.items.oneOf) {
    return schema.items.oneOf.map(renderSchemaTree);
  }
  return [renderSchemaTree(schema.items)];
}

function renderSchemaObject(schema) {
  return Object.keys(schema.properties).map((key) => {
    return (
      <li>
        {key}: {renderSchemaTree(schema.properties[key])}
      </li>
    );
  });
}

const Page: React.FunctionComponent<Props> = ({ data }) => {
  const { title } = useOpenApiInfo();
  const { path } = data;
  const markdownReact = useMarkdownReact(path.description);

  // console.log('path', path);
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
              return (
                <>
                  <div>Content type: {content.contentType}</div>
                  <div>Schema:</div>
                  {renderSchemaTree(JSON.parse(content.schema))}
                  <pre>{JSON.stringify(content.schema, null, 2)}</pre>
                </>
              );
            })}
          </>
        );
      })}
    </Layout>
  );
};

export default Page;

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
