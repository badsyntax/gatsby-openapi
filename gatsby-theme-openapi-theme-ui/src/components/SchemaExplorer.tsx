/** @jsx jsx */
import React from 'react';
import { jsx, Alert } from 'theme-ui';
import { OpenApiSchemasByName, ParsedSchema } from '../types';
import { Link } from './Link';
import { Table } from './Table';

interface SchemaProps {
  schema: ParsedSchema;
  allSchemasByName: OpenApiSchemasByName;
}

const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

function renderSchemaArray(schema, allSchemasByName) {
  return (
    <React.Fragment>
      [{' '}
      {schema.items.oneOf ? (
        <OneOfType
          oneOf={schema.items.oneOf}
          allSchemasByName={allSchemasByName}
        />
      ) : (
        [renderSchemaTree(schema.items, allSchemasByName)]
      )}{' '}
      ]
    </React.Fragment>
  );
}

function renderSchemaRef(ref: string, allSchemasByName: OpenApiSchemasByName) {
  const refSchemaName = ref.split('/').pop();
  const refSchemaString = allSchemasByName[refSchemaName];
  if (!refSchemaString) {
    return <Alert>Error: can't find ref schema: {refSchemaName}</Alert>;
  }
  const refSchema = JSON.parse(refSchemaString);
  const isComplexSchema =
    refSchema.type === 'object' || refSchema.type === 'array';
  return (
    <React.Fragment>
      {!isComplexSchema && (
        <Link to={`/model/${refSchemaName}`}>
          {renderSchemaTree(refSchema, allSchemasByName)} ({refSchemaName})
        </Link>
      )}
      {isComplexSchema && renderSchemaTree(refSchema, allSchemasByName)}
    </React.Fragment>
  );
}

function renderSchemaObject(schema, allSchemasByName: OpenApiSchemasByName) {
  console.log('render schema object');
  return (
    <React.Fragment>
      {'{'}
      <Table
        variant="borderLess"
        sx={{
          ml: 3,
        }}
      >
        <tbody>
          {Object.keys(schema.properties).map((key) => {
            return (
              <tr>
                <th>{key}:</th>
                <td>
                  {renderSchemaTree(schema.properties[key], allSchemasByName)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {'}'}
    </React.Fragment>
  );
}

function renderSchemaValue(schema: ParsedSchema) {
  return (
    <code>
      {schema.type}
      {schema.format && (
        <React.Fragment>&lt;{schema.format}&gt;</React.Fragment>
      )}
    </code>
  );
}

function renderSchemaTree(
  schema: ParsedSchema,
  allSchemasByName: OpenApiSchemasByName
) {
  switch (schema.type) {
    case SCHEMA_TYPE_OBJECT:
      return renderSchemaObject(schema, allSchemasByName);
    case SCHEMA_TYPE_ARRAY:
      return renderSchemaArray(schema, allSchemasByName);
    default:
      if (schema['$ref']) {
        return renderSchemaRef(schema['$ref'] as string, allSchemasByName);
      }
      return renderSchemaValue(schema);
  }
}

interface OneOfType {
  oneOf: Array<ParsedSchema>;
  allSchemasByName: OpenApiSchemasByName;
}

const OneOfType: React.FunctionComponent<OneOfType> = ({
  oneOf,
  allSchemasByName,
}) => {
  return (
    <React.Fragment>
      One of:
      {oneOf.map((schema, i) => {
        return (
          <div>
            {renderSchemaTree(schema, allSchemasByName)}
            {i !== oneOf.length - 1 ? <span>, </span> : null}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export const SchemaExplorer: React.FunctionComponent<SchemaProps> = ({
  schema,
  allSchemasByName,
}) => {
  return renderSchemaTree(schema, allSchemasByName);
};
