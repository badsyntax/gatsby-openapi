import { OpenAPIV3 } from 'openapi-types';
import { Dereference } from '../types';

const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

type ExampleTypes = ExampleObject | ExampleValue | ExampleArray;
type ExampleValue = string;
type ExampleArray = Array<ExampleTypes>;

interface ExampleObject {
  [key: string]: ExampleTypes;
}

function getExampleObject(
  schema: OpenAPIV3.NonArraySchemaObject,
  dereference: Dereference<OpenAPIV3.SchemaObject>
): ExampleObject {
  return Object.keys(schema.properties || {}).reduce((obj, propertyName) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const subSchema = dereference(schema.properties![propertyName]);
    return {
      ...obj,
      [propertyName]: getExampleFromSchema(subSchema, dereference),
    };
  }, {});
}

function getExampleArray(
  schema: OpenAPIV3.ArraySchemaObject,
  dereference: Dereference<OpenAPIV3.SchemaObject>
): ExampleArray {
  const itemsSchema = dereference(schema.items);
  if (itemsSchema.oneOf) {
    return itemsSchema.oneOf.map((item) => {
      const itemSchema = dereference(item);
      return getExampleFromSchema(itemSchema, dereference);
    });
  }
  return [getExampleFromSchema(itemsSchema, dereference)];
}

function getExampleValue(schema: OpenAPIV3.SchemaObject): ExampleValue {
  return schema.example !== undefined
    ? schema.example
    : schema.format || schema.type;
}

export function getExampleFromSchema(
  schema: OpenAPIV3.SchemaObject,
  dereference: Dereference<OpenAPIV3.SchemaObject>
): ExampleTypes {
  switch (schema.type) {
    case SCHEMA_TYPE_OBJECT:
      return getExampleObject(schema, dereference);
    case SCHEMA_TYPE_ARRAY:
      return getExampleArray(schema, dereference);
    default:
      return getExampleValue(schema);
  }
}
