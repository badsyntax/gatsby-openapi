/* eslint-disable @typescript-eslint/no-non-null-assertion */
/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';
import { Dereference } from '../../types';
import { Table } from '../Table';
import { SchemaTree } from './SchemaTree';

interface SchemaObject {
  schema: OpenAPIV3.SchemaObject;
  dereference: Dereference<OpenAPIV3.SchemaObject>;
}

export const SchemaObject: React.FunctionComponent<SchemaObject> = ({
  schema,
  dereference,
}) => {
  return (
    <React.Fragment>
      <code>{'{'}</code>
      {schema.properties && (
        <Table
          variant="borderLess"
          sx={{
            ml: 3,
          }}
        >
          <tbody>
            {Object.keys(schema.properties).map((key) => {
              return (
                <tr key={key}>
                  <th>
                    <code>{key}:</code>
                  </th>
                  <td>
                    <SchemaTree
                      schema={schema.properties![key]}
                      dereference={dereference}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <code>{'}'}</code>
    </React.Fragment>
  );
};
