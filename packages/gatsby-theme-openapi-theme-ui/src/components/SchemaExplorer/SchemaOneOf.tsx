/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';
import { Dereference } from '../../types';
import { SchemaTree } from './SchemaTree';

interface OneOfType {
  oneOf: Array<OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject>;
  dereference: Dereference<OpenAPIV3.SchemaObject>;
}

export const OneOfType: React.FunctionComponent<OneOfType> = ({
  oneOf,
  dereference,
}) => {
  return (
    <React.Fragment>
      One of:
      {oneOf.map((schema, i) => {
        return (
          <div>
            <SchemaTree schema={schema} dereference={dereference} />
            {i !== oneOf.length - 1 ? <span>, </span> : null}
          </div>
        );
      })}
    </React.Fragment>
  );
};
