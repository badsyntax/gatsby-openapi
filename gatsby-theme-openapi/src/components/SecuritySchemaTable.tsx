/** @jsx jsx */
import React from 'react';
import { Container, Image, jsx, Heading } from 'theme-ui';
import { OpenApiInfo_XLogo, OpenApiSecuritySchema } from '../types';
import { Table } from './Table';

interface SecuritySchemaProps {
  schema: OpenApiSecuritySchema;
}

export const SecuritySchemaTable: React.FunctionComponent<SecuritySchemaProps> = ({
  schema,
}) => {
  const extra = JSON.parse(schema.extra);
  return (
    <Table>
      <tbody>
        <tr>
          <th>Type</th>
          <td>{schema.type}</td>
        </tr>
        {Object.keys(extra).map((key) => {
          return (
            <tr>
              <th>{key}</th>
              <td>{typeof extra[key] === 'string' ? extra[key] : null}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
