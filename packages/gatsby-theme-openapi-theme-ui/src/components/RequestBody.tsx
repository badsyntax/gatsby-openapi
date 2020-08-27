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
      <Box
        mb={2}
        sx={{
          maxWidth: 400,
        }}
      >
        <Select defaultValue="application/x-www-form-urlencoded">
          {requestBodyTypes.map((type) => {
            return <option key={type}>{type}</option>;
          })}
        </Select>
      </Box>
      {requestBodyTypes.map((contentType) => {
        const media: OpenAPIV3.MediaTypeObject =
          dereferencedRequestBody.content[contentType];
        return (
          <React.Fragment key={contentType}>
            <Tabs>
              {media.schema && (
                <TabItem label="Schema" itemKey="tabs-schema" variant="pill">
                  <SchemaExplorer schema={media.schema} expandEnum={false} />
                </TabItem>
              )}
              <TabItem label="Example" itemKey="tabs-example" variant="pill">
                <SchemaMediaExamples media={media} type={contentType} />
              </TabItem>
            </Tabs>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
