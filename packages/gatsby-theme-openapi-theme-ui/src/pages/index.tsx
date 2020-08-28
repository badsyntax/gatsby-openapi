import React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from 'theme-ui';
import { Layout } from '../components/Layout';
import { Markdown } from '../components/Markdown';
import { Panel } from '../components/Panel';
import { useOpenApiInfo } from '../hooks/useOpenapiInfo';

const Home: React.FunctionComponent = () => {
  const { contact, license, title, description } = useOpenApiInfo();
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Heading as="h1" mb={4}>
        Overview
      </Heading>
      <Panel>
        {contact && <>URL: {contact.url}</>} |{' '}
        {license && <>License: {license.name}</>}
        <Markdown text={description || ''} />
      </Panel>
    </Layout>
  );
};

export default Home;
