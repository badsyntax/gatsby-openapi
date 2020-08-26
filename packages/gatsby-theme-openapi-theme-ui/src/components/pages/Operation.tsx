import { OperationProps } from 'gatsby-theme-openapi-core/src/components/pages/Operation';
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Heading } from 'theme-ui';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { renderMarkdown } from '../../util/renderMarkdown';
import { Layout } from '../Layout';
import { OperationSecurityList } from '../OperationSecurityList';
import { RequestMethodBadge } from '../RequestMethodBadge';
import { Responses } from '../Responses';

export const Operation: React.FunctionComponent<OperationProps> = ({
  data,
}) => {
  const { title } = useOpenApiInfo();
  const operationObject: OpenAPIV3.OperationObject = JSON.parse(
    data.operation.operation
  );
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
      <Box bg={'codeBlockBG'} p={2} mb={3}>
        <RequestMethodBadge
          method={data.operation.method}
          sx={{
            mr: 2,
          }}
          shortLabel={false}
        />
        {data.operation.path}
      </Box>
      {description}
      <Heading as="h3" mt={4} mb={3}>
        Authorizations
      </Heading>
      <OperationSecurityList operation={operationObject} />
      {operationObject.requestBody && (
        <React.Fragment>
          <Heading as="h3" mt={4} mb={3}>
            Request Body
          </Heading>
          {/* <RequestBody
            requestBody={path.requestBody}
            allRequestBodiesByName={allRequestBodiesByName}
            allSchemasByName={allSchemasByName}
          /> */}
        </React.Fragment>
      )}
      <Heading as="h3" mt={4} mb={3}>
        Responses
      </Heading>
      {operationObject.responses && (
        <Responses responses={operationObject.responses} />
      )}
    </Layout>
  );
};
