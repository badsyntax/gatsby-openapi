/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import {
  OpenApiSchemasByName,
  OpenApiResponseContent,
  OpenApiResponseContentExample,
} from '../../../types';

interface ResponseExamplesProps {
  content: OpenApiResponseContent;
  allSchemasByName: OpenApiSchemasByName;
}

const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

function getExampleObject(schema, allSchemasByName: OpenApiSchemasByName) {
  return Object.keys(schema.properties).reduce(
    (obj, propertyName) => ({
      ...obj,
      [propertyName]: getExample(
        schema.properties[propertyName],
        allSchemasByName
      ),
    }),
    {}
  );
}

function getExampleArray(schema, allSchemasByName: OpenApiSchemasByName) {
  if (schema.items.oneOf) {
    return schema.items.oneOf.map(getExample);
  }
  return [getExample(schema.items, allSchemasByName)];
}

function getExampleValue(schema) {
  return schema.example !== undefined
    ? schema.example
    : schema.format || schema.type;
}

function getExampleRef(ref: string, allSchemasByName: OpenApiSchemasByName) {
  const refSchemaName = ref.split('/').pop();
  const refSchema = allSchemasByName[refSchemaName];
  return getExample(JSON.parse(refSchema), allSchemasByName);
}

function getExample(schema, allSchemasByName: OpenApiSchemasByName) {
  switch (schema.type) {
    case SCHEMA_TYPE_OBJECT:
      return getExampleObject(schema, allSchemasByName);
    case SCHEMA_TYPE_ARRAY:
      return getExampleArray(schema, allSchemasByName);
    default:
      if (schema['$ref']) {
        return getExampleRef(schema['$ref'], allSchemasByName);
      }
      return getExampleValue(schema);
  }
}

function buildExamples(
  content: OpenApiResponseContent,
  allSchemasByName: OpenApiSchemasByName
): OpenApiResponseContentExample[] {
  if (content.examples.length) {
    return content.examples;
  }
  return [
    {
      name: null,
      example: JSON.stringify(
        getExample(JSON.parse(content.schema), allSchemasByName)
      ),
    },
  ];
}

export const ResponseExamples: React.FunctionComponent<ResponseExamplesProps> = ({
  content,
  allSchemasByName,
}) => {
  const examples = buildExamples(content, allSchemasByName);
  return (
    <div>
      {examples.map((example) => {
        return (
          <div>
            {example.name && <div>{example.name}:</div>}
            <pre>{JSON.stringify(JSON.parse(example.example), null, 2)}</pre>
          </div>
        );
      })}
    </div>
  );
};
