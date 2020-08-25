import { graphql } from 'gatsby';

import { Authentication } from '../components/pages/Authentication';

export default Authentication;

export const query = graphql`
  {
    securitySchemes: openApiComponent(name: { eq: "securitySchemes" }) {
      name
      value
    }
  }
`;
