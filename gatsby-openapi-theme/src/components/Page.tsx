import React from 'react';
import { Layout } from '../components/Layout';
import { graphql } from 'gatsby';

interface Props {
  data: {
    [key: string]: unknown;
  };
}

const Page: React.FunctionComponent<Props> = ({ data }) => {
  const endpoint = data.openApiPaths;
  return (
    <Layout>
      <p>Hello world page!</p>
      <pre>{JSON.stringify(endpoint, null, 2)}</pre>
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query($slug: String!) {
    openApiPaths(fields: { slug: { eq: $slug } }) {
      method
      summary
      description
      operationId
      tags
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
          schema {
            type
            description
            required
            example
            items {
              type
              description
              format
              example
            }
          }
        }
      }
    }
  }
`;
