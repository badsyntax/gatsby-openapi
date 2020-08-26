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
}

export const SchemaTree: React.FunctionComponent<SchemaTreeProps> = ({
  schema,
  dereference,
}) => {
  if (isReferenceObject(schema)) {
    return <SchemaRef schema={schema} dereference={dereference} />;
  }
  switch (schema.type) {
    case SCHEMA_TYPE_OBJECT:
      return <SchemaObject schema={schema} dereference={dereference} />;
    case SCHEMA_TYPE_ARRAY:
      return <SchemaArray schema={schema} dereference={dereference} />;
    default:
      return <SchemaValue schema={schema} />;
  }
};
