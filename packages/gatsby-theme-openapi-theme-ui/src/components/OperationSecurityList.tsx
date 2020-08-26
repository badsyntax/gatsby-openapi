import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { useOpenApiOperationSecurity } from '../hooks/useOpenApiOperationSecurity';
import { Link } from './Link';

interface OperationSecurityListProps {
  operation: OpenAPIV3.OperationObject;
}

export const OperationSecurityList: React.FunctionComponent<OperationSecurityListProps> = ({
  operation,
}) => {
  const security = useOpenApiOperationSecurity(operation);
  const hasSecurity = Boolean(security && security.length);
  const items: React.ReactElement[] = [];
  security.forEach((security) => {
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
