/** @jsx jsx */
import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { jsx } from 'theme-ui';
import { Dereference, isReferenceObject } from '../../types';
import { OneOfType } from './SchemaOneOf';
import { SchemaTree } from './SchemaTree';

interface SchemaArray {
  schema: OpenAPIV3.ArraySchemaObject;
  dereference: Dereference<OpenAPIV3.SchemaObject>;
}

export const SchemaArray: React.FunctionComponent<SchemaArray> = ({
  schema,
  dereference,
}) => {
  const items: OpenAPIV3.SchemaObject = dereference(schema.items);
  return (
    <React.Fragment>
      <code>[</code>
      {items.oneOf ? (
        <OneOfType oneOf={items.oneOf} dereference={dereference} />
      ) : (
        <SchemaTree schema={items} dereference={dereference} />
      )}
      <code>]</code>
    </React.Fragment>
  );
};
