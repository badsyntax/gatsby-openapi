/** @jsx jsx */

import React from 'react';
import { Heading, jsx } from 'theme-ui';
import { useOpenApiInfo } from '../hooks/useOpenapiInfo';
import { Markdown } from './Markdown';
import { Panel } from './Panel';

export const HomePageBody: React.FunctionComponent = () => {
  const { contact, license, description } = useOpenApiInfo();
  return (
    <React.Fragment>
      <Heading as="h1" mb={4} id="/">
        Overview
      </Heading>
      <Panel>
        {contact && <React.Fragment>URL: {contact.url}</React.Fragment>} |{' '}
        {license && <React.Fragment>License: {license.name}</React.Fragment>}
        <Markdown text={description || ''} />
      </Panel>
      {/* {pluginOptions.singlePage && <SinglePage />} */}
    </React.Fragment>
  );
};
