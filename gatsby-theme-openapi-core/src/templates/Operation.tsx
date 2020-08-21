import { graphql } from 'gatsby';

import { Operation } from '../components/pages/Operation';

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
