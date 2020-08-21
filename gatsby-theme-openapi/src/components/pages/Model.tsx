import React from 'react';
import { graphql } from 'gatsby';
import { OpenApiSchema } from '../../types';
import { Layout } from '../Layout';
import { Helmet } from 'react-helmet';
import { Heading } from 'theme-ui';
import { SchemaExplorer } from '../SchemaExplorer';
import { useOpenApiSchemasByName } from '../../hooks/useOpenapiSchemasByName';

interface Props {
  data: {
    schema: OpenApiSchema;
  };
}

const Model: React.FunctionComponent<Props> = ({ data }) => {
  const { schema } = data;
  const schemasByName = useOpenApiSchemasByName();
  const schemaObj = JSON.parse(schema.schema);

  console.log('schema', schemaObj);

  return (
    <Layout>
      <Helmet>
        <title>{/* {title} - {path.summary} */}</title>
      </Helmet>
      <Heading as="h2" mb={3}>
        {schema.name}
      </Heading>
      <div>Description: {schemaObj.description}</div>
      <div>Type: {schemaObj.type}</div>
      <div>Schema: </div>
      <SchemaExplorer schema={schemaObj} allSchemasByName={schemasByName} />
    </Layout>
  );
};

export default Model;

export const query = graphql`
  query($slug: String!) {
    schema: openApiSchema(fields: { slug: { eq: $slug } }) {
      name
      schema
    }
  }
`;
