/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';
import { Dereference, isReferenceObject } from '../../types';
import { SchemaArray } from './SchemaArray';
import { SchemaObject } from './SchemaObject';
import { SchemaRef } from './SchemaRef';
import { SchemaValue } from './SchemaValue';

const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

interface SchemaTreeProps {
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
  dereference: Dereference<OpenAPIV3.SchemaObject>;
  expandEnum?: boolean;
}

export const SchemaTree: React.FunctionComponent<SchemaTreeProps> = ({
  schema,
  dereference,
  expandEnum = false,
}) => {
  if (isReferenceObject(schema)) {
    return (
      <SchemaRef
        schema={schema}
        dereference={dereference}
        expandEnum={expandEnum}
      />
    );
  }
  switch (schema.type) {
    case SCHEMA_TYPE_OBJECT:
      return (
        <SchemaObject
          schema={schema}
          dereference={dereference}
          expandEnum={expandEnum}
        />
      );
    case SCHEMA_TYPE_ARRAY:
      return (
        <SchemaArray
          schema={schema}
          dereference={dereference}
          expandEnum={expandEnum}
        />
      );
    default:
      return <SchemaValue schema={schema} expandEnum={expandEnum} />;
  }
};
