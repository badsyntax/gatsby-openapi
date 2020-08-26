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
  expandEnum: boolean;
}

export const SchemaObject: React.FunctionComponent<SchemaObject> = ({
  schema,
  dereference,
  expandEnum,
}) => {
  return (
    <React.Fragment>
      {schema.properties && (
        <Table
          variant="borderLess"
          sx={
            {
              // ml: 1,
            }
          }
        >
          <tbody>
            {Object.keys(schema.properties).map((key) => {
              return (
                <tr key={key}>
                  <th>
                    <code>{key}</code><code>:</code>
                  </th>
                  <td>
                    <SchemaTree
                      schema={schema.properties![key]}
                      dereference={dereference}
                      expandEnum={expandEnum}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};
