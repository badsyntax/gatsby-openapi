import React, { useState } from 'react';
import { Box, Heading, Text } from 'theme-ui';
import { OpenApiResponse, OpenApiSchemasByName } from '../types';
import { SchemaExplorer } from './SchemaExplorer';
import { SchemaExamples } from './SchemaExamples';

interface ResponseProps {
  response: OpenApiResponse;
  allSchemasByName: OpenApiSchemasByName;
}

export const Response: React.FunctionComponent<ResponseProps> = ({
  response,
  allSchemasByName,
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const onButtonClick = () => {
    setIsHidden(!isHidden);
  };
  const responseCode = parseInt(response.code, 10);
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
            {response.code}
          </Text>{' '}
          {response.description}
        </Heading>
      </Box>
      {!isHidden &&
        response.content.map((content) => {
          return (
            <>
              <Box mb={3}>Content Type: {content.type}</Box>
              <Heading as="h4">Schema:</Heading>
              <Box mb={3}>
                <SchemaExplorer
                  schema={JSON.parse(content.schema)}
                  allSchemasByName={allSchemasByName}
                />
              </Box>
              <Heading as="h4">Examples:</Heading>
              <SchemaExamples
                content={content}
                allSchemasByName={allSchemasByName}
              />
            </>
          );
        })}
    </React.Fragment>
  );
};
