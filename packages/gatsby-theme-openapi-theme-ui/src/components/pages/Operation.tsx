import React from 'react';
import { OpenAPIV3 } from 'openapi-types';

import { Helmet } from 'react-helmet';
import { PageProps } from 'gatsby';
import { Heading, Box } from 'theme-ui';
import { Layout } from '../Layout';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { OperationWithFields } from '../../types';
import { Link } from '../Link';
import { useOpenApiSchemasByName } from '../../hooks/useOpenapiSchemasByName';
import { RequestMethodBadge } from '../RequestMethodBadge';
// import { useRequestBodiesByName } from '../../hooks/useRequestBodies';
import { renderMarkdown } from '../../util/renderMarkdown';
import { OperationSecurityList } from '../OperationSecurityList';
import { useOpenApiSecurity } from '../../hooks/useOpenApiSecurity';
import { Responses } from '../Responses';

interface OperationDataProps {
  operation: OperationWithFields;
}

export const Operation: React.FunctionComponent<PageProps<
  OperationDataProps
>> = ({ data }) => {
  const { title } = useOpenApiInfo();
  const operationObject: OpenAPIV3.OperationObject = JSON.parse(
    data.operation.operation
  );
  const description = renderMarkdown(operationObject.description);
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
      <Responses responses={operationObject.responses} />
    </Layout>
  );
};
