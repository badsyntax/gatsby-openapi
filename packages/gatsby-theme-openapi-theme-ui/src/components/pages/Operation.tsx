/** @jsx jsx */
import { OpenApiOperationObjectWithExtensions } from 'gatsby-source-openapi/types';
import { OperationProps } from 'gatsby-theme-openapi-core/src/components/pages/Operation';
import React from 'react';
import { Helmet } from 'react-helmet';
import { jsx } from 'theme-ui';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { useOpenApiOperationSecurity } from '../../hooks/useOpenApiOperationSecurity';
import { Layout } from '../Layout';
import { OperationBody } from '../OperationBody';

export const Operation: React.FunctionComponent<OperationProps> = ({
  data,
}) => {
  const { title } = useOpenApiInfo();
  const operation = data.operation;
  const operationObject: OpenApiOperationObjectWithExtensions = JSON.parse(
    operation.operation
  );
  const security = useOpenApiOperationSecurity(operationObject);
  return (
    <Layout>
      <Helmet>
        <title>
          {title} - {operationObject.summary}
        </title>
      </Helmet>
      <OperationBody
        operation={operation}
        operationObject={operationObject}
        security={security}
      />
    </Layout>
  );
};
