/** @jsx jsx */

import { OpenAPIV3 } from 'openapi-types';
import React, { useState } from 'react';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';
import { Box, Heading, jsx, Select, Text } from 'theme-ui';
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
      <Heading
        onClick={onButtonClick}
        sx={{
          variant: 'response.heading',
        }}
        className={[
          isSuccessResponse ? 'ok' : 'error',
          !isHidden ? 'active' : '',
        ].join(' ')}
        as="h3"
      >
        {isHidden ? (
          <VscChevronRight
            sx={{
              strokeWidth: 1,
              mr: 1,
            }}
          />
        ) : (
          <VscChevronDown
            sx={{
              strokeWidth: 1,
              mr: 1,
            }}
          />
        )}
        <Text
          variant="text.bold"
          as="span"
          sx={{
            mr: 1,
          }}
        >
          {code}
        </Text>
        {response.description}
      </Heading>
      {!isHidden && (
        <Box pb={3} pt={2}>
          <Box mb={3}>
            <Select variant="select.small" sx={{}} onChange={onMediaTypeChange}>
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
                  <Box>
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
        </Box>
      )}
    </React.Fragment>
  );
};
