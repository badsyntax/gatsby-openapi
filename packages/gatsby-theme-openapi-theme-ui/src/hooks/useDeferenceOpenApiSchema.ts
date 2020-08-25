import { OpenAPIV3 } from 'openapi-types';
import { graphql, useStaticQuery } from 'gatsby';
import { useMemo } from 'react';
import {
  isReferenceObject,
  DereferenceObject,
  Dereference,
  SchemaMap,
} from '../types';

function getSchemaReference<T>(
  obj: OpenAPIV3.ReferenceObject,
  schemaMap: SchemaMap
): T {
  const refPath = obj['$ref'].split('/');
  const schemaName = refPath.pop();
  const schemaType = refPath.pop();
  if (!schemaMap[schemaType]) {
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
