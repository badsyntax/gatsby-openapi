import React from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../components/Layout';
import { useOpenApiInfo } from '../hooks/use-openapi-info';
import { useMarkdownReact } from '../hooks/use-markdown-react';
import { Heading } from 'theme-ui';

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
