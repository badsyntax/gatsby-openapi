import React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from 'theme-ui';
import { Layout } from '../components/Layout';
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
      <Heading as="h1" mb={2}>
        Overview
      </Heading>
      <div>
        {contact && <>URL: {contact.url}</>} |{' '}
        {license && <>License: {license.name}</>}
      </div>
      {markdownReact}
    </Layout>
  );
};

export default Home;
