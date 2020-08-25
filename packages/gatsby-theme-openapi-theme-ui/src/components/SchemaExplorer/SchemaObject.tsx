/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { OpenAPIV3 } from 'openapi-types';
import { Dereference } from '../../types';
import { SchemaTree } from './SchemaTree';
import { Table } from '../Table';

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
                    schema={schema.properties[key]}
                    dereference={dereference}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <code>{'}'}</code>
    </React.Fragment>
  );
};
