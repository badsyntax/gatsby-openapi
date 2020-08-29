/* eslint jsx-a11y/anchor-has-content: 0 */
/** @jsx jsx */
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';
import React, { useContext } from 'react';
import { jsx } from 'theme-ui';
import { PluginOptionsContext } from '../context/PluginOptionsContext';
// import { Router, Link } from "@reach/router"

const styles = {
  color: 'primary',
  textDecoration: 'underline',
  fontWeight: 'normal',
  textDecorationColor: (theme) => theme.colors.primary,
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
  const pluginOptions = useContext(PluginOptionsContext);

  if (href) {
    return <a {...props} href={href} sx={styles} />;
  }
  if (!!pluginOptions?.singlePage) {
    return <a {...props} href={`#${to}`} sx={styles} />;
  }
  return <GatsbyLink {...props} to={to} sx={styles} activeClassName="active" />;
};
