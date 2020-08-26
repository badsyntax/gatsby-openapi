/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';
import { isOAuth2SecurityScheme } from '../types';
import { Table } from './Table';

interface SecuritySchemaProps {
  scheme: OpenAPIV3.SecuritySchemeObject;
}

export const SecuritySchemaTable: React.FunctionComponent<SecuritySchemaProps> = ({
  scheme,
}) => {
  const schemeFields = { ...scheme };
  if (!isOAuth2SecurityScheme(schemeFields)) {
    delete schemeFields.description;
  }
  return (
    <Table>
      <tbody>
        {Object.keys(schemeFields).map((key) => {
          return (
            <tr key={key}>
              <th>{key}</th>
              <td>{typeof scheme[key] === 'string' ? scheme[key] : null}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
