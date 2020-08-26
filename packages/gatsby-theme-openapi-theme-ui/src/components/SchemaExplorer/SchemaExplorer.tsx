/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { Box, jsx } from 'theme-ui';
import { useDeferenceOpenApiSchema } from '../../hooks/useDeferenceOpenApiSchema';
import { SchemaTree } from './SchemaTree';

interface SchemaExplorerProps {
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
  expandEnum?: boolean;
}

export const SchemaExplorer: React.FunctionComponent<SchemaExplorerProps> = ({
  schema,
  expandEnum = true,
}) => {
  const dereference = useDeferenceOpenApiSchema<OpenAPIV3.SchemaObject>();
  return (
    <Box
      sx={{
        backgroundColor: 'codeBlockBG',
        p: 2,
      }}
    >
      <SchemaTree
        schema={schema}
        dereference={dereference}
        expandEnum={expandEnum}
      />
    </Box>
  );
};
