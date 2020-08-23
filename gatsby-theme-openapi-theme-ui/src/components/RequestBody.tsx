/** @jsx jsx */
import React from 'react';
import {
  OpenApiPath,
  OpenApiSchemasByName,
  OpenApiRequestBodiesByName,
} from '../types';
import { jsx } from 'theme-ui';
import { SchemaExplorer } from './SchemaExplorer';
import { getRequestBodyContent } from '../util/getRequestBodyContent';
import { SchemaExamples } from './SchemaExamples';
import { Tabs, TabItem } from './Tabs';

interface RequestBodyProps {
  path: OpenApiPath;
  allSchemasByName: OpenApiSchemasByName;
  allRequestBodiesByName: OpenApiRequestBodiesByName;
}

export const RequestBody: React.FunctionComponent<RequestBodyProps> = ({
  path,
  allSchemasByName,
  allRequestBodiesByName,
}) => {
  const content = getRequestBodyContent(
    path.requestBody,
    allRequestBodiesByName
  );
  return (
    <React.Fragment>
      {path.requestBody &&
        content.map((content) => {
          return (
            <Tabs>
              <TabItem label="Model" key="tabs-model">
                <SchemaExplorer
                  schema={JSON.parse(content.schema)}
                  allSchemasByName={allSchemasByName}
                />
              </TabItem>
              <TabItem label="Example" key="tabs-example">
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
