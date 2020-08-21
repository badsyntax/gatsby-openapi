import React from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../components/Layout';
import { Heading } from 'theme-ui';
import { useOpenApiInfo } from '../hooks/useOpenapiInfo';
import { useMarkdownReact } from '../hooks/useMarkdownReact';

const Home: React.FunctionComponent = () => {
  const { contact, license, title, description } = useOpenApiInfo();
  const markdownReact = useMarkdownReact(description);
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Heading as="h1" mb={2}>
        Overview
      </Heading>
      <div>
        URL: {contact.url} | License: {license.name}
      </div>
      {markdownReact}
    </Layout>
  );
};

export default Home;
