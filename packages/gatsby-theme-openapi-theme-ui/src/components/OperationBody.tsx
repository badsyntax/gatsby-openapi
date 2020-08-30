import { Link } from 'gatsby';
import {
  GraphQLOpenApiOperationWithFields,
  OpenApiOperationObjectWithExtensions,
} from 'gatsby-source-openapi/types';
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { VscLock } from 'react-icons/vsc';
import { Box, Flex, Heading } from 'theme-ui';
import { Markdown } from './Markdown';
import { Panel } from './Panel';
import { RequestBody } from './RequestBody';
import { RequestMethodBadge } from './RequestMethodBadge';
import { Responses } from './Responses';
import { Samples } from './Samples';
import { TabItem, Tabs } from './Tabs';

export interface OperationBodyProps {
  operation: GraphQLOpenApiOperationWithFields;
  operationObject: OpenApiOperationObjectWithExtensions;
  security: OpenAPIV3.SecurityRequirementObject[];
}

export const OperationBody: React.FunctionComponent<OperationBodyProps> = ({
  operation,
  operationObject,
  security,
}) => {
  const securityItems: string[] = [];
  security.forEach((security) => {
    Object.keys(security).forEach((name) => {
      securityItems.push(name);
    });
  });
  return (
    <React.Fragment>
      <Heading as="h2" mb={3}>
        {operationObject.summary}
      </Heading>
      <Panel>
        <Flex
          bg={'codeBlockBG'}
          p={2}
          mb={3}
          sx={{
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.colors.muted}`,
            borderRadius: '4px',
          }}
        >
          <RequestMethodBadge
            method={operation.method}
            sx={{
              mr: 2,
            }}
            shortLabel={false}
          />
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            {operation.path}
          </Box>
          {!!securityItems.length && (
            <Box>
              <VscLock />{' '}
              {securityItems.map((name, i) => {
                return (
                  <React.Fragment key={name}>
                    <Link to={`/authentication#${name}`}>{name}</Link>
                    {i !== securityItems.length - 1 ? ', ' : null}
                  </React.Fragment>
                );
              })}
            </Box>
          )}
        </Flex>
        <Markdown text={operationObject.description || ''} />
      </Panel>
      <Panel>
        <Tabs>
          {operationObject.responses && (
            <TabItem label="Responses" itemKey="responses">
              <Responses responses={operationObject.responses} />
            </TabItem>
          )}
          {operationObject.requestBody && (
            <TabItem label="Body" itemKey="body">
              <RequestBody requestBody={operationObject.requestBody} />
            </TabItem>
          )}
          {operationObject.x_codeSamples && (
            <TabItem label="Samples" itemKey="samples">
              <Samples samples={operationObject.x_codeSamples} />
            </TabItem>
          )}
        </Tabs>
      </Panel>
    </React.Fragment>
  );
};
