/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';
import { Dereference } from '../../types';
import { Link } from '../Link';
import { SchemaTree } from './SchemaTree';

interface SchemaRefProps {
  schema: OpenAPIV3.ReferenceObject;
  dereference: Dereference<OpenAPIV3.SchemaObject>;
  expandEnum: boolean;
}

export const SchemaRef: React.FunctionComponent<SchemaRefProps> = ({
  schema,
  dereference,
  expandEnum,
}) => {
  const refSchemaName = schema['$ref'].split('/').pop();
  const refSchema = dereference(schema);
  const isComplexSchema =
    refSchema.type === 'object' || refSchema.type === 'array';
  return (
    <React.Fragment>
      {!isComplexSchema && (
        <Link to={`/model/${refSchemaName}`}>
          <SchemaTree
            schema={refSchema}
            dereference={dereference}
            expandEnum={expandEnum}
          />
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
        <SchemaTree
          schema={refSchema}
          dereference={dereference}
          expandEnum={expandEnum}
        />
      )}
    </React.Fragment>
  );
};
