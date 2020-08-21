import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Heading } from 'theme-ui';
import { OpenApiSchema } from '../../types';
import { Layout } from '../../components/Layout';
import { Helmet } from 'react-helmet';
import { SchemaExplorer } from '../SchemaExplorer';
import { useOpenApiSchemasByName } from '../../hooks/useOpenapiSchemasByName';
import { useMarkdownReact } from '../../hooks/useMarkdownReact';

export interface ModelDataProps {
  schema: OpenApiSchema;
}

export const Model: React.FunctionComponent<PageProps<ModelDataProps>> = ({
  data,
}) => {
  const { schema } = data;
  const schemasByName = useOpenApiSchemasByName();
  const schemaObj = JSON.parse(schema.schema);
  const description = useMarkdownReact(schemaObj.description);
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
      <SchemaExplorer schema={schemaObj} allSchemasByName={schemasByName} />
    </Layout>
  );
};
