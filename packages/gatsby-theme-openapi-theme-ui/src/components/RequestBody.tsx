/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { Box, jsx, Select } from 'theme-ui';
import { useDeferenceOpenApiSchema } from '../hooks/useDeferenceOpenApiSchema';
import { SchemaExplorer } from './SchemaExplorer/SchemaExplorer';
import { SchemaMediaExamples } from './SchemaMediaExamples';
import { TabItem, Tabs } from './Tabs';

interface RequestBodyProps {
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject;
}

export const RequestBody: React.FunctionComponent<RequestBodyProps> = ({
  requestBody,
}) => {
  const dereference = useDeferenceOpenApiSchema<OpenAPIV3.RequestBodyObject>();
  const dereferencedRequestBody = dereference(requestBody);
  const requestBodyTypes = Object.keys(dereferencedRequestBody.content);
  return (
    <React.Fragment>
      <Box mb={3}>
        <Select variant="select.small" defaultValue={requestBodyTypes[0]}>
          {requestBodyTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </Select>
      </Box>
      {requestBodyTypes.map((contentType) => {
        const media: OpenAPIV3.MediaTypeObject =
          dereferencedRequestBody.content[contentType];
        return (
          <Tabs key={contentType}>
            {media.schema && (
              <TabItem label="Schema" itemKey="tabs-schema">
                <SchemaExplorer schema={media.schema} expandEnum={false} />
              </TabItem>
            )}
            <TabItem label="Example" itemKey="tabs-example">
              <SchemaMediaExamples media={media} type={contentType} />
            </TabItem>
          </Tabs>
        );
      })}
    </React.Fragment>
  );
};
