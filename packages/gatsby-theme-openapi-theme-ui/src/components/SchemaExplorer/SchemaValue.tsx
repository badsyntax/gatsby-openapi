/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';

interface SchemaValue {
  schema: OpenAPIV3.SchemaObject;
  expandEnum: boolean;
}

export const SchemaValue: React.FunctionComponent<SchemaValue> = ({
  schema,
  expandEnum,
}) => {
  return (
    <code sx={{
      color: 'primary'
    }}>
      {(!schema.enum || !expandEnum) && (
        <React.Fragment>
          {schema.type}
          {schema.format && (
            <React.Fragment>&lt;{schema.format}&gt;</React.Fragment>
          )}
        </React.Fragment>
      )}
      {expandEnum && schema.enum && (
        <React.Fragment>
          Enum{schema.type ? ` (${schema.type}): ` : ':'}
          <ul>
            {schema.enum.map((enumValue) => (
              <li key={enumValue}>{enumValue}</li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </code>
  );
};
