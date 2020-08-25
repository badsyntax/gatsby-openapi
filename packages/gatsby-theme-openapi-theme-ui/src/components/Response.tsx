import React, { useState } from 'react';
import { OpenAPIV3 } from 'openapi-types';

import { Box, Heading, Text } from 'theme-ui';
// import { OpenApiResponse, OpenApiSchemasByName } from '../types';
import { SchemaExamples } from './SchemaExamples';
import { SchemaExplorer } from './SchemaExplorer/SchemaExplorer';

interface ResponseProps {
  response: OpenAPIV3.ResponseObject;
  // allSchemasByName: OpenApiSchemasByName;
  code: string;
}

export const Response: React.FunctionComponent<ResponseProps> = ({
  response,
  // allSchemasByName,
  code,
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const onButtonClick = () => {
    setIsHidden(!isHidden);
  };
  const responseCode = parseInt(code, 10);
  const isSuccessResponse = responseCode >= 200 && responseCode < 300;
  return (
    <React.Fragment>
      <Box
        p={2}
        mb={2}
        onClick={onButtonClick}
        sx={{
          border: (theme) => `1px solid ${theme.colors.muted}`,
          borderRadius: 2,
          cursor: 'pointer',
          backgroundColor: isSuccessResponse
            ? 'responseOkBG'
            : 'responseErrorBG',
          color: isSuccessResponse ? 'responseOkText' : 'responseErrorText',
        }}
      >
        <Heading
          sx={{
            fontSize: 1,
            fontWeight: 'normal',
          }}
          as="h3"
        >
          <Text variant="text.bold" as="span">
            {code}
          </Text>{' '}
          {response.description}
        </Heading>
      </Box>
      {!isHidden &&
        Object.keys(response.content).map((media) => {
          return (
            <React.Fragment key={media}>
              <Box mb={3}>Content Type: {media}</Box>
              <Heading as="h4">Schema:</Heading>
              <Box mb={3}>
                <SchemaExplorer
                  schema={response.content[media].schema}
                  // allSchemasByName={allSchemasByName}
                />
              </Box>
              <Heading as="h4">Examples:</Heading>
              <SchemaExamples media={response.content[media]} />
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};
