import { OpenAPIV3 } from 'openapi-types';
import { useOpenApiSecurity } from './useOpenApiSecurity';

export function useOpenApiOperationSecurity(
  operation: OpenAPIV3.OperationObject
): OpenAPIV3.SecurityRequirementObject[] {
  const defaultSecurity = useOpenApiSecurity();
  const security = operation.security || defaultSecurity;
  return security;
}
