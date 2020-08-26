/* eslint jsx-a11y/anchor-has-content: 0 */
/** @jsx jsx */
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';
import { jsx } from 'theme-ui';

const styles = {
  color: 'inherit',
  textDecoration: 'none',
  fontWeight: 'normal',
  '&.active': {
    color: 'primary',
    backgroundColor: 'backgroundContent',
  },
};

export type LinkProps = {
  href?: string;
} & Omit<GatsbyLinkProps<unknown>, 'ref'>;

export const Link: React.FunctionComponent<LinkProps> = ({
  href,
  to,
  ...props
}) => {
  if (href) {
    return <a {...props} href={href} sx={styles} />;
  }
  return <GatsbyLink {...props} to={to} sx={styles} activeClassName="active" />;
};
