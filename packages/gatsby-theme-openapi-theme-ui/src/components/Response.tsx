import { OpenAPIV3 } from 'openapi-types';
import React, { useState } from 'react';
import { Box, Heading, Select, Text } from 'theme-ui';
import { SchemaExplorer } from './SchemaExplorer/SchemaExplorer';
import { SchemaMediaExamples } from './SchemaMediaExamples';
import { TabItem, Tabs } from './Tabs';

interface ResponseProps {
  response: OpenAPIV3.ResponseObject;
  code: string;
}

export const Response: React.FunctionComponent<ResponseProps> = ({
  response,
  code,
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const onButtonClick = () => {
    setIsHidden(!isHidden);
  };
  const onMediaTypeChange = (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    setSelectedMediaType(event.currentTarget.value);
  };
  const responseCode = parseInt(code, 10);
  const isSuccessResponse = responseCode >= 200 && responseCode < 300;
  const mediaTypes = Object.keys(response.content || {});

  const [selectedMediaType, setSelectedMediaType] = useState(mediaTypes[0]);
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
      {!isHidden && (
        <React.Fragment>
          <Box
            mb={2}
            sx={{
              maxWidth: 400,
            }}
          >
            <Select onChange={onMediaTypeChange}>
              {mediaTypes.map((type) => {
                return <option key={type}>{type}</option>;
              })}
            </Select>
          </Box>
          {mediaTypes
            .filter((mediaType) => mediaType === selectedMediaType)
            .map((mediaType) => {
              const media = response.content![mediaType];
              return (
                <React.Fragment key={mediaType}>
                  <Box mb={3}>
                    <Tabs>
                      {media.schema && (
                        <TabItem label="Schema" itemKey="tabs-schema">
                          <SchemaExplorer
                            schema={media.schema}
                            expandEnum={false}
                          />
                        </TabItem>
                      )}
                      <TabItem label="Example" itemKey="tabs-example">
                        <SchemaMediaExamples media={media} type={mediaType} />
                      </TabItem>
                    </Tabs>
                  </Box>
                </React.Fragment>
              );
            })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
