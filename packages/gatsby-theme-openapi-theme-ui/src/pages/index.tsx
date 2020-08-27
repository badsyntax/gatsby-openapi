import React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from 'theme-ui';
import { Layout } from '../components/Layout';
import { Panel } from '../components/Panel';
import { useOpenApiInfo } from '../hooks/useOpenapiInfo';
import { renderMarkdown } from '../util/renderMarkdown';

const Home: React.FunctionComponent = () => {
  const { contact, license, title, description } = useOpenApiInfo();
  const markdownReact = description && renderMarkdown(description);
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Panel>
        <Heading as="h1" mb={2}>
          Overview
        </Heading>
        {contact && <>URL: {contact.url}</>} |{' '}
        {license && <>License: {license.name}</>}
        {markdownReact}
      </Panel>
    </Layout>
  );
};

export default Home;
