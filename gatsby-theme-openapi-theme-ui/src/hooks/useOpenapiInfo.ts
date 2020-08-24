import { graphql, useStaticQuery } from 'gatsby';
import { OpenApiInfo } from '../types';

export function useOpenApiInfo(): OpenApiInfo {
  return;
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
