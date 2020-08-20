/** @jsx jsx */
import React from 'react';
import { Container, Image, jsx, Heading } from 'theme-ui';
import { OpenApiInfo_XLogo, OpenApiSecuritySchema } from '../types';

interface SecuritySchemaProps {
  schema: OpenApiSecuritySchema;
}

export const SecuritySchemaTable: React.FunctionComponent<SecuritySchemaProps> = ({
  schema,
}) => {
  const extra = JSON.parse(schema.extra);
  return (
    <table
      sx={{
        borderCollapse: 'collapse',
        'td, th': {
          border: (theme) => `1px solid ${theme.colors.muted}`,
          textAlign: 'left',
          padding: 1,
        },
      }}
    >
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
    </table>
  );
};
