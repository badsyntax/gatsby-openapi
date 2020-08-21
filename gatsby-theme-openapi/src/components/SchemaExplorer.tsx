/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { OpenApiSchemasByName, ParsedSchema } from '../types';
import { Link } from './Link';
import { Table } from './Table';

interface SchemaProps {
  schema: ParsedSchema;
  allSchemasByName: OpenApiSchemasByName;
}

const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

function renderSchemaRef(ref: string, allSchemasByName: OpenApiSchemasByName) {
  const refSchemaName = ref.split('/').pop();
  const refSchema = JSON.parse(allSchemasByName[refSchemaName]);
  const isComplexSchema =
    refSchema.type === 'object' || refSchema.type === 'array';
  return (
    <span>
      {!isComplexSchema && (
        <Link to={`/model/${refSchemaName}`}>
          {renderSchemaTree(refSchema, allSchemasByName)} ({refSchemaName})
        </Link>
      )}
      {isComplexSchema && renderSchemaTree(refSchema, allSchemasByName)}
    </span>
  );
}

function renderSchemaValue(schema: ParsedSchema) {
  return (
    <code>
      {schema.type}
      {schema.format && <span>&lt;{schema.format}&gt;</span>}
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

function renderSchemaArray(schema, allSchemasByName) {
  return (
    <span>
      [
      {schema.items.oneOf ? (
        <OneOfType
          oneOf={schema.items.oneOf}
          allSchemasByName={allSchemasByName}
        />
      ) : (
        [renderSchemaTree(schema.items, allSchemasByName)]
      )}
      ]
    </span>
  );
}

function renderSchemaObject(schema, allSchemasByName: OpenApiSchemasByName) {
  return (
    <Table variant="borderLess">
      <tbody>
        {Object.keys(schema.properties).map((key) => {
          return (
            <tr>
              <th>{key}</th>
              <td>
                {renderSchemaTree(schema.properties[key], allSchemasByName)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export const SchemaExplorer: React.FunctionComponent<SchemaProps> = ({
  schema,
  allSchemasByName,
}) => {
  return <div>{renderSchemaTree(schema, allSchemasByName)}</div>;
};
