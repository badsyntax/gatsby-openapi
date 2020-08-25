/** @jsx jsx */
import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { jsx } from 'theme-ui';
import { Dereference } from '../../types';
import { SchemaTree } from './SchemaTree';
import { Link } from '../Link';

interface SchemaRefProps {
  schema: OpenAPIV3.ReferenceObject;
  dereference: Dereference<OpenAPIV3.SchemaObject>;
}

export const SchemaRef: React.FunctionComponent<SchemaRefProps> = ({
  schema,
  dereference,
}) => {
  const refSchemaName = schema['$ref'].split('/').pop();
  const refSchema = dereference(schema);
  const isComplexSchema =
    refSchema.type === 'object' || refSchema.type === 'array';
  return (
    <React.Fragment>
      {!isComplexSchema && (
        <Link to={`/model/${refSchemaName}`}>
          <SchemaTree schema={refSchema} dereference={dereference} />
          <code
            sx={{
              ml: 1,
            }}
          >
            ({refSchemaName})
          </code>
        </Link>
      )}
      {isComplexSchema && (
        <SchemaTree schema={refSchema} dereference={dereference} />
      )}
    </React.Fragment>
  );
};
