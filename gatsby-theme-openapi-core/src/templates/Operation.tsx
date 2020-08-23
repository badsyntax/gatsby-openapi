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
      path
      security {
        name
        opts
      }
      requestBody {
        ref
        content {
          schema
          type
        }
      }
      x_codeSamples {
        lang
        source
      }
      responses {
        code
        description
        content {
          type
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
