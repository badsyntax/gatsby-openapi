import { graphql } from 'gatsby';
import { SinglePage } from '../components/pages/SinglePage';

export default SinglePage;

export const query = graphql`
  {
    securitySchemes: openApiComponent(name: { eq: "securitySchemes" }) {
      name
      value
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
          fields {
            slug
          }
          method
          operation
          path
        }
      }
    }
  }
`;
