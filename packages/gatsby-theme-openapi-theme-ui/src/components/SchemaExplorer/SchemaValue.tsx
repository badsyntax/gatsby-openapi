/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { OpenAPIV3 } from 'openapi-types';

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
