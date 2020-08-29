/** @jsx jsx */
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Box, Flex, Heading, jsx } from 'theme-ui';
import { PluginOptionsContext } from '../context/PluginOptionsContext';
import { useOpenApiInfo } from '../hooks/useOpenapiInfo';
import { CustomPluginOptions } from '../types';
import { defaultPluginOptions } from '../util/defaultPluginOptions';
import { Sidebar } from './Sidebar';

export const Layout: React.FunctionComponent = ({ children }) => {
  const { title, version } = useOpenApiInfo();
  const data = useStaticQuery(graphql`
    {
      sitePlugin(name: { eq: "gatsby-theme-openapi-theme-ui" }) {
        fields {
          pluginOptionsWithDefaults {
            codeSampleTargets
            generateCodeSamples
            singlePage
            specPath
          }
        }
      }
    }
  `);

  console.log('data', data.sitePlugin.fields.pluginOptionsWithDefaults);

  const pluginOptions: Required<CustomPluginOptions> = defaultPluginOptions(
    data.sitePlugin.fields.pluginOptionsWithDefaults
  );
  return (
    <PluginOptionsContext.Provider value={pluginOptions}>
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
    </PluginOptionsContext.Provider>
  );
};
