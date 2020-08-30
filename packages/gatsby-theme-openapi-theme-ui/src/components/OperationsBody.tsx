/** @jsx jsx */

import { GraphQLOpenApiOperationWithFields } from 'gatsby-source-openapi/types';
import { SinglePageDataProps } from 'gatsby-theme-openapi-core/src/components/pages/SinglePage';
import React from 'react';
import { Box, Heading, jsx } from 'theme-ui';
import { useOpenApiSecurity } from '../hooks/useOpenApiSecurity';
import { OperationBody } from './OperationBody';

export const OperationsBody: React.FunctionComponent<{
  data: SinglePageDataProps;
}> = ({ data }) => {
  const operations = data.allOpenApiOperation.edges.map(
    ({ node }): GraphQLOpenApiOperationWithFields =>
      node as GraphQLOpenApiOperationWithFields
  );
  const defaultSecurity = useOpenApiSecurity();
  return (
    <React.Fragment>
      <Heading as="h1" mb={4} id="/">
        Operations
      </Heading>
      {operations.map((operation) => {
        const operationObject = JSON.parse(operation.operation);
        const security = operationObject.security || defaultSecurity;
        return (
          <Box mb={5}>
            <OperationBody
              operation={operation}
              operationObject={operationObject}
              security={security}
            />
          </Box>
        );
      })}
    </React.Fragment>
  );
};
