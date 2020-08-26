/* eslint jsx-a11y/anchor-has-content: 0 */
/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { Link, LinkProps } from '../Link';

export const NavLink: React.FunctionComponent<LinkProps> = (props) => {
  return (
    <Link
      {...props}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          color: 'primary',
        },
      }}
    />
  );
};
