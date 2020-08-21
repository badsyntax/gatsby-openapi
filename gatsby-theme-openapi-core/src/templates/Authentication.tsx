import { graphql } from 'gatsby';

import { Authentication } from '../components/pages/Authentication';

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
