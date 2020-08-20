/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { Sidenav } from '@theme-ui/sidenav';
import { Nav } from './Nav';
import { useOpenApiInfo } from '../hooks/use-openapi-info';
import { Logo } from './Logo';

export const Sidebar: React.FunctionComponent = () => {
  const { x_logo } = useOpenApiInfo();
  return (
    <Sidenav
      sx={{
        p: 3,
        pt: 2,
        overflowY: ['auto', 'auto', 'initial'],
        width: 'initial',
        minHeight: '100vh',
        flexGrow: 1,
        flexBasis: 'sidebar',
      }}
    >
      {x_logo && <Logo logo={x_logo} />}
      <Nav />
    </Sidenav>
  );
};
