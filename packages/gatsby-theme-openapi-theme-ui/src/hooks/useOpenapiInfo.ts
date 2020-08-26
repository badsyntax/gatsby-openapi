import { graphql, useStaticQuery } from 'gatsby';
import { GraphQLOpenApiInfo } from 'gatsby-source-openapi/types';

export function useOpenApiInfo(): GraphQLOpenApiInfo {
  const data = useStaticQuery(graphql`
    query {
      openApiInfo {
        title
        contact {
          name
          url
          email
        }
        description
        license {
          name
          url
        }
        version
        x_logo {
          altText
          url
        }
      }
    }
  `);
  return data.openApiInfo;
}
