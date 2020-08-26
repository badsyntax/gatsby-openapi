/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';
import { Dereference } from '../../types';
import { OneOfType } from './SchemaOneOf';
import { SchemaTree } from './SchemaTree';

interface SchemaArray {
  schema: OpenAPIV3.ArraySchemaObject;
  dereference: Dereference<OpenAPIV3.SchemaObject>;
  expandEnum: boolean;
}

export const SchemaArray: React.FunctionComponent<SchemaArray> = ({
  schema,
  dereference,
  expandEnum,
}) => {
  const items: OpenAPIV3.SchemaObject = dereference(schema.items);
  return (
    <React.Fragment>
      <code>[</code>
      {items.oneOf ? (
        <OneOfType oneOf={items.oneOf} dereference={dereference} />
      ) : (
        <SchemaTree
          schema={items}
          dereference={dereference}
          expandEnum={expandEnum}
        />
      )}
      <code>]</code>
    </React.Fragment>
  );
};
