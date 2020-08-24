import { graphql } from 'gatsby';

import { Model } from '../components/pages/Model';

export default Model;

// export const query = graphql`
//   query($slug: String!) {
//     schema: openApiSchema(fields: { slug: { eq: $slug } }) {
//       name
//       schema
//     }
//   }
// `;
