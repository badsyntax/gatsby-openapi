/** @jsx jsx */
import React from 'react';
import {
  OpenApiSchemasByName,
  OpenApiRequestBodiesByName,
  OpenApiRequestBody,
} from '../types';
import { jsx } from 'theme-ui';
import { SchemaExplorer } from './SchemaExplorer';
import { getRequestBodyContent } from '../util/getRequestBodyContent';
import { SchemaExamples } from './SchemaExamples';
import { Tabs, TabItem } from './Tabs';

interface RequestBodyProps {
  requestBody: OpenApiRequestBody;
  allSchemasByName: OpenApiSchemasByName;
  allRequestBodiesByName: OpenApiRequestBodiesByName;
}

export const RequestBody: React.FunctionComponent<RequestBodyProps> = ({
  requestBody,
  allSchemasByName,
  allRequestBodiesByName,
}) => {
  const content = getRequestBodyContent(requestBody, allRequestBodiesByName);
  return (
    <React.Fragment>
      {content.map((content) => {
        return (
          <Tabs>
            <TabItem label="Schema" itemKey="tabs-schema">
              <SchemaExplorer
                schema={JSON.parse(content.schema)}
                allSchemasByName={allSchemasByName}
              />
            </TabItem>
            <TabItem label="Example" itemKey="tabs-example">
              <SchemaExamples
                content={content}
                allSchemasByName={allSchemasByName}
              />
            </TabItem>
          </Tabs>
        );
      })}
    </React.Fragment>
  );
};
