import React from 'react';
import { Flex, Box, Heading } from 'theme-ui';
import { Sidebar } from './Sidebar';
import { useOpenApiInfo } from '../hooks/use-openapi-info';

export const Layout: React.FunctionComponent = ({ children }) => {
  const { title, version, contact, license } = useOpenApiInfo();
  return (
    <>
      <Flex>
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
    </>
  );
};
