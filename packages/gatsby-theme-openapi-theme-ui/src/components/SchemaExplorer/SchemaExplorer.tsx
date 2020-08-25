/** @jsx jsx */
import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { jsx } from 'theme-ui';
import { useDeferenceOpenApiSchema } from '../../hooks/useDeferenceOpenApiSchema';
import { SchemaTree } from './SchemaTree';

interface SchemaExplorerProps {
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
}

export const SchemaExplorer: React.FunctionComponent<SchemaExplorerProps> = ({
  schema,
}) => {
  const dereference = useDeferenceOpenApiSchema<OpenAPIV3.SchemaObject>();
  return <SchemaTree schema={schema} dereference={dereference} />;
};
