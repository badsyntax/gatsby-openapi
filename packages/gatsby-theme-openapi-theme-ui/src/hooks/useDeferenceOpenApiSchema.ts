import { graphql, useStaticQuery } from 'gatsby';
import { OpenAPIV3 } from 'openapi-types';
import { useMemo } from 'react';
import {
  Dereference,
  DereferenceObject,
  isReferenceObject,
  SchemaMap,
} from '../types';

function getSchemaReference<T>(
  obj: OpenAPIV3.ReferenceObject,
  schemaMap: SchemaMap
): T {
  const refPath = obj['$ref'].split('/');
  const schemaName = refPath.pop();
  if (!schemaName) {
    throw new Error(`Invalid schema ref: ${obj['$ref']}`);
  }
  const schemaType = refPath.pop();
  if (!schemaType || !schemaMap[schemaType]) {
    throw new Error(`schema type not found: ${schemaType}`);
  }
  const schema: OpenAPIV3.SchemaObject = JSON.parse(schemaMap[schemaType]);
  if (!schema[schemaName]) {
    throw new Error(`schema not found: ${schemaName}`);
  }
  return getSchema<T>(schema[schemaName], schemaMap);
}

function getSchema<T>(obj: DereferenceObject, schemaMap: SchemaMap): T {
  if (isReferenceObject(obj)) {
    return getSchemaReference<T>(obj, schemaMap);
  } else {
    return (obj as unknown) as T;
  }
}

export function useDeferenceOpenApiSchema<T>(): Dereference<T> {
  const data = useStaticQuery(graphql`
    query {
      allOpenApiComponent {
        edges {
          node {
            name
            value
          }
        }
      }
    }
  `);

  const schemaMap = useMemo(() => {
    return data.allOpenApiComponent.edges.reduce((map, currentValue) => {
      const { name, value } = currentValue.node;
      return {
        ...map,
        [name]: value,
      };
    }, {});
  }, [data]);

  return (obj: DereferenceObject): T => {
    return getSchema<T>(obj, schemaMap);
  };
}
