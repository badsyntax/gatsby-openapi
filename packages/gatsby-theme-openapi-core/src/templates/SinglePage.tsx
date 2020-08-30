import { graphql } from 'gatsby';
import { SinglePage } from '../components/pages/SinglePage';

export default SinglePage;

export const query = graphql`
  {
    securitySchemes: openApiComponent(name: { eq: "securitySchemes" }) {
      name
      value
    }
    allOpenApiSecurity {
      edges {
        node {
          name
          value
        }
      }
    }
    allOpenApiSchema {
      edges {
        node {
          name
          schema
          fields {
            slug
          }
        }
      }
    }
    allOpenApiOperation {
      edges {
        node {
          path
          method
          operation
          fields {
            slug
          }
        }
      }
    }
  }
`;
