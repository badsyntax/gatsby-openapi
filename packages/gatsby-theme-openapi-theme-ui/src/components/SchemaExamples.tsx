/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';
import { useDeferenceOpenApiSchema } from '../hooks/useDeferenceOpenApiSchema';
import { Dereference } from '../types';

const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

function getExampleObject(
  schema: OpenAPIV3.NonArraySchemaObject,
  dereference: Dereference<OpenAPIV3.SchemaObject>
) {
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
) {
  const itemsSchema = dereference(schema.items);
  if (itemsSchema.oneOf) {
    return itemsSchema.oneOf.map((item) => {
      const itemSchema = dereference(item);
      return getExampleFromSchema(itemSchema, dereference);
    });
  }
  return [getExampleFromSchema(itemsSchema, dereference)];
}

function getExampleValue(schema: OpenAPIV3.SchemaObject) {
  return schema.example !== undefined
    ? schema.example
    : schema.format || schema.type;
}

function getExampleFromSchema(
  schema: OpenAPIV3.SchemaObject,
  dereference: Dereference<OpenAPIV3.SchemaObject>
) {
  switch (schema.type) {
    case SCHEMA_TYPE_OBJECT:
      return getExampleObject(schema, dereference);
    case SCHEMA_TYPE_ARRAY:
      return getExampleArray(schema, dereference);
    default:
      return getExampleValue(schema);
  }
}

interface SchemaExampleProps {
  example: any;
}

const SchemaExample: React.FunctionComponent<SchemaExampleProps> = ({
  example,
}) => {
  return (
    <pre
      sx={{
        backgroundColor: 'codeBlockBG',
        p: 2,
      }}
    >
      {typeof example === 'string' ? example : JSON.stringify(example, null, 2)}
    </pre>
  );
};

interface SchemaMediaExamplesProps {
  media: OpenAPIV3.MediaTypeObject;
}

export const SchemaMediaExamples: React.FunctionComponent<SchemaMediaExamplesProps> = ({
  media,
}) => {
  const dereferenceExample = useDeferenceOpenApiSchema<
    OpenAPIV3.ExampleObject
  >();
  const dereferenceSchema = useDeferenceOpenApiSchema<OpenAPIV3.SchemaObject>();
  if (media.examples) {
    return (
      <React.Fragment>
        {Object.keys(media.examples).map((name) => {
          const example = dereferenceExample(media.examples![name]);
          return (
            <React.Fragment key={name}>
              {name}
              <SchemaExample example={example.value} />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
  if (media.example) {
    return <SchemaExample example={media.example} />;
  }
  if (media.schema) {
    const schema = dereferenceSchema(media.schema);
    const example = getExampleFromSchema(schema, dereferenceSchema);
    return <SchemaExample example={example} />;
  }
  return null;
};

interface SchemaSingleExampleProps {
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
}

export const SchemaSingleExample: React.FunctionComponent<SchemaSingleExampleProps> = ({
  schema,
}) => {
  const dereferenceSchema = useDeferenceOpenApiSchema<OpenAPIV3.SchemaObject>();
  const dereferencedSchema = dereferenceSchema(schema);
  const example = getExampleFromSchema(dereferencedSchema, dereferenceSchema);
  return <SchemaExample example={example} />;
};
