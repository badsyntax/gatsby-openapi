/** @jsx jsx */
import React from 'react';
import { Box, Flex, Heading, jsx } from 'theme-ui';
import { useOpenApiInfo } from '../hooks/useOpenapiInfo';
import { Sidebar } from './Sidebar';

export const Layout: React.FunctionComponent = ({ children }) => {
  const { title, version, contact, license } = useOpenApiInfo();
  return (
    <Flex
      sx={{
        position: 'relative',
      }}
    >
      <Sidebar />
      <Box
        as="main"
        p={4}
        sx={{
          minHeight: '100vh',
          backgroundColor: `backgroundContent`,
          flexGrow: 99999,
          flexBasis: 0,
        }}
      >
        <Heading as="h1" mb={4}>
          {title} ({version})
        </Heading>

        {children}
      </Box>
    </Flex>
  );
};
