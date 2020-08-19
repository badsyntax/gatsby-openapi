import React from 'react';
import { Nav } from './Nav';
import { Global, css, ObjectInterpolation } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../theme';
import useSiteMetadata from '../hooks/use-site-metadata';

const styles = {
  display: 'flex',
  flexDirection: 'row',
} as ObjectInterpolation<undefined>;

export const Layout: React.FunctionComponent = ({ children }) => {
  const { title } = useSiteMetadata();
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          body: {
            backgroundColor: '#fff',
          },
        }}
      />
      <div
        css={(theme) => ({
          color: theme.colors.primary,
          ...styles,
        })}
      >
        <Nav />
        <div>
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};
