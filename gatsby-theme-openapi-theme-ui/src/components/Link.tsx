/* eslint jsx-a11y/anchor-has-content: 0 */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link as GatsbyLink } from 'gatsby';

const styles = {
  color: 'inherit',
  textDecoration: 'none',
  fontWeight: 'normal',
  '&.active': {
    color: 'primary',
  },
};

interface LinkProps {
  href?: string;
  to?: string;
}

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
