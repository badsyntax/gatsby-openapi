/** @jsx jsx */
import React from 'react';
import { OpenApiPath } from '../types';
import { Box, Badge, Heading, jsx } from 'theme-ui';

interface RequestInfoProps {
  path: OpenApiPath;
}

export const RequestInfo: React.FunctionComponent<RequestInfoProps> = ({
  path,
}) => {
  return (
    <div>
      {/* <Box mb={3}>Content Type: {path}</Box> */}
      <Heading as="h3">Schema</Heading>
      <Heading as="h3">Samples</Heading>
    </div>
  );
};
