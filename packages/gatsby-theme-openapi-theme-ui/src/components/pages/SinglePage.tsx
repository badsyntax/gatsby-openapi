/** @jsx jsx */

import { SinglePageProps } from 'gatsby-theme-openapi-core/src/components/pages/SinglePage';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, jsx } from 'theme-ui';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { AuthenticationBody } from '../AuthenticationBody';
import { HomePageBody } from '../HomePageBody';
import { Layout } from '../Layout';
import { OperationsBody } from '../OperationsBody';
// import { OperationsBody } from '../OperationsBody';

export const SinglePage: React.FunctionComponent<SinglePageProps> = ({
  data,
}) => {
  const { title } = useOpenApiInfo();
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box mb={4}>
        <HomePageBody />
      </Box>
      <Box mb={4}>
        <AuthenticationBody data={data} />
      </Box>
      <Box mb={4}>
        <OperationsBody data={data} />
      </Box>
    </Layout>
  );
};
