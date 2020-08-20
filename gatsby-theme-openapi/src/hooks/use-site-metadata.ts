import { graphql, useStaticQuery } from 'gatsby';
import { SiteMetadata } from '../types';

export function useSiteMetadata(): SiteMetadata {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return data.site.siteMetadata;
}
