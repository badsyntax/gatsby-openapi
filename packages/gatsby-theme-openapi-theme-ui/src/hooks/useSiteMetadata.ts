import { graphql, useStaticQuery } from 'gatsby';
import { GraphQLSiteMetadata } from 'gatsby-source-openapi/types';

export function useSiteMetadata(): GraphQLSiteMetadata {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return data.site.siteMetadata;
}
