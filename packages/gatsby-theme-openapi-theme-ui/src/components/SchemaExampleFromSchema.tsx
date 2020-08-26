/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';
import { useDeferenceOpenApiSchema } from '../hooks/useDeferenceOpenApiSchema';
import { getExampleFromSchema } from '../util/examples';
import { SchemaExample } from './SchemaExample';

interface SchemaExampleFromSchemaProps {
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
}

export const SchemaExampleFromSchema: React.FunctionComponent<SchemaExampleFromSchemaProps> = ({
  schema,
}) => {
  const dereferenceSchema = useDeferenceOpenApiSchema<OpenAPIV3.SchemaObject>();
  const dereferencedSchema = dereferenceSchema(schema);
  const example = getExampleFromSchema(dereferencedSchema, dereferenceSchema);
  return <SchemaExample example={example} />;
};
