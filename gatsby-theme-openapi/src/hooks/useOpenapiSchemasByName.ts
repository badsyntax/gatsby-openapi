import { OpenApiSchemasByName } from '../types';
import { useOpenApiSchemas } from './useOpenapiSchemas';

export function useOpenApiSchemasByName(): OpenApiSchemasByName {
  const schemas = useOpenApiSchemas();
  return schemas.reduce((obj, { name, schema }) => {
    return {
      ...obj,
      [name]: schema,
    };
  }, {});
}
