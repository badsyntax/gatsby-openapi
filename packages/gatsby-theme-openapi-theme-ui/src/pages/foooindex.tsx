import React from 'react';
import { Helmet } from 'react-helmet';
import { HomePageBody } from '../components/HomePageBody';
import { Layout } from '../components/Layout';
import { useOpenApiInfo } from '../hooks/useOpenapiInfo';

const Home: React.FunctionComponent = (props) => {
  const { title } = useOpenApiInfo();
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <HomePageBody />
    </Layout>
  );
};

export default Home;
