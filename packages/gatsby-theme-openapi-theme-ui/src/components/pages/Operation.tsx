/** @jsx jsx */
import { OpenApiOperationObjectWithExtensions } from 'gatsby-source-openapi/types';
import { OperationProps } from 'gatsby-theme-openapi-core/src/components/pages/Operation';
import React from 'react';
import { Helmet } from 'react-helmet';
import { VscLock } from 'react-icons/vsc';
import { Box, Flex, Heading, jsx } from 'theme-ui';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { useOpenApiOperationSecurity } from '../../hooks/useOpenApiOperationSecurity';
import { renderMarkdown } from '../../util/renderMarkdown';
import { Layout } from '../Layout';
import { Link } from '../Link';
import { RequestBody } from '../RequestBody';
import { RequestMethodBadge } from '../RequestMethodBadge';
import { Responses } from '../Responses';
import { Samples } from '../Samples';
import { TabItem, Tabs } from '../Tabs';

export const Operation: React.FunctionComponent<OperationProps> = ({
  data,
}) => {
  const { title } = useOpenApiInfo();
  const operationObject: OpenApiOperationObjectWithExtensions = JSON.parse(
    data.operation.operation
  );
  const security = useOpenApiOperationSecurity(operationObject);

  const securityItems: string[] = [];
  security.forEach((security) => {
    Object.keys(security).forEach((name) => {
      securityItems.push(name);
    });
  });

  const description =
    operationObject.description && renderMarkdown(operationObject.description);
  return (
    <Layout>
      <Helmet>
        <title>
          {title} - {operationObject.summary}
        </title>
      </Helmet>
      <Heading as="h2" mb={3}>
        {operationObject.summary}
      </Heading>
      <Flex
        bg={'codeBlockBG'}
        p={2}
        mb={3}
        sx={{
          alignItems: 'center',
        }}
      >
        <RequestMethodBadge
          method={data.operation.method}
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
          {data.operation.path}
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

      {description}
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
    </Layout>
  );
};
