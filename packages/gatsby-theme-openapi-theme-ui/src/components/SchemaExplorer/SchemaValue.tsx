/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';

interface SchemaValue {
  schema: OpenAPIV3.SchemaObject;
}

export const SchemaValue: React.FunctionComponent<SchemaValue> = ({
  schema,
}) => {
  return (
    <code>
      {schema.type}
      {schema.format && (
        <React.Fragment>&lt;{schema.format}&gt;</React.Fragment>
      )}
    </code>
  );
};
