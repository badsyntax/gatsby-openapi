import { graphql } from 'gatsby';
import { Operation } from '../components/pages/Operation';

export default Operation;

export const query = graphql`
  query($slug: String!) {
    operation: openApiOperation(fields: { slug: { eq: $slug } }) {
      path
      method
      operation
      fields {
        slug
      }
    }
  }
`;
