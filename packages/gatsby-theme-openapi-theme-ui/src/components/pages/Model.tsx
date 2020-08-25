import React from 'react';
import { PageProps } from 'gatsby';
import { Heading } from 'theme-ui';
import { Layout } from '../../components/Layout';
import { Helmet } from 'react-helmet';
import { useOpenApiSchemasByName } from '../../hooks/useOpenapiSchemasByName';
import { renderMarkdown } from '../../util/renderMarkdown';
import { SchemaExplorer } from '../SchemaExplorer/SchemaExplorer';

export interface ModelDataProps {
  schema: OpenApiSchema;
}

export const Model: React.FunctionComponent<PageProps<ModelDataProps>> = ({
  data,
}) => {
  const { schema } = data;
  const schemasByName = useOpenApiSchemasByName();
  const schemaObj = JSON.parse(schema.schema);
  const description = renderMarkdown(schemaObj.description);
  return (
    <Layout>
      <Helmet>
        <title>{/* {title} - {path.summary} */}</title>
      </Helmet>
      <Heading as="h2" mb={3}>
        {schema.name}
      </Heading>
      {description}
      <div>Type: {schemaObj.type}</div>
      <div>Schema: </div>
      <SchemaExplorer schema={schemaObj} />
    </Layout>
  );
};
