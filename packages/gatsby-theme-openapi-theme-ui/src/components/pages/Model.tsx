import { ModelProps } from 'gatsby-theme-openapi-core/src/components/pages/Model';
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from 'theme-ui';
import { Layout } from '../../components/Layout';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { renderMarkdown } from '../../util/renderMarkdown';
import { SchemaExampleFromSchema } from '../SchemaExampleFromSchema';
import { SchemaExplorer } from '../SchemaExplorer/SchemaExplorer';
import { TabItem, Tabs } from '../Tabs';

export const Model: React.FunctionComponent<ModelProps> = ({ data }) => {
  const { schema } = data;
  const schemaObj: OpenAPIV3.SchemaObject = JSON.parse(schema.schema);
  const description =
    schemaObj.description && renderMarkdown(schemaObj.description);
  const { title } = useOpenApiInfo();
  return (
    <Layout>
      <Helmet>
        <title>
          {title} - {schema.name}
        </title>
      </Helmet>
      <Heading as="h2" mb={3}>
        {schema.name}
      </Heading>
      {description}
      <Tabs>
        <TabItem label="Schema" itemKey="tabs-schema">
          <SchemaExplorer schema={schemaObj} />
        </TabItem>
        <TabItem label="Example" itemKey="tabs-example">
          <SchemaExampleFromSchema schema={schemaObj} />
        </TabItem>
      </Tabs>
    </Layout>
  );
};
