import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { Link } from './Link';
import { useOpenApiSecurity } from '../hooks/useOpenApiSecurity';

interface OperationSecurityListProps {
  operation: OpenAPIV3.OperationObject;
}

export const OperationSecurityList: React.FunctionComponent<OperationSecurityListProps> = ({
  operation,
}) => {
  const defaultSecurity = useOpenApiSecurity();
  const security = operation.security || defaultSecurity;
  const hasSecurity = Boolean(security && security.length);
  const items = [];
  security.map((security) => {
    Object.keys(security).forEach((name) => {
      items.push(
        <li key={`authorization-${name}`}>
          <Link to={`/authentication#${name}`}>{name}</Link>
        </li>
      );
    });
  });
  return hasSecurity ? (
    <ul>{items}</ul>
  ) : (
    <div>(No authorizations for this operation.)</div>
  );
};
