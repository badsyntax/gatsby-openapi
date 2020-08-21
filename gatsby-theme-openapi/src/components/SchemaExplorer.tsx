/** @jsx jsx */
import React from 'react';
import { Container, Image, jsx } from 'theme-ui';
import { Schema, OpenApiSchemasByName } from '../types';
import { Link } from './Link';

interface SchemaProps {
  schema: Record<string, unknown>;
  allSchemasByName: OpenApiSchemasByName;
}

const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

function renderSchemaTree(
  schema: Record<string, unknown>,
  allSchemasByName: OpenApiSchemasByName
) {
  switch (schema.type) {
    case SCHEMA_TYPE_OBJECT:
      return renderSchemaObject(schema, allSchemasByName);
    case SCHEMA_TYPE_ARRAY:
      return renderSchemaArray(schema, allSchemasByName);
    default:
      if (schema['$ref']) {
        const refSchemaName = (schema['$ref'] as string).split('/').pop();
        const refSchema = allSchemasByName[refSchemaName];
        return (
          <span>
            <Link to={`/model/${refSchemaName}`}>
              {renderSchemaTree(JSON.parse(refSchema), allSchemasByName)}
            </Link>
          </span>
        );
      }
      return (
        <span>
          {schema.type}
          {/* {schema.description ? ` (${schema.description})` : null} */}
        </span>
      );
  }
}

interface OneOfType {
  oneOf: Array<Record<string, unknown>>;
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
    <ul>
      {Object.keys(schema.properties).map((key) => {
        return (
          <li>
            {key}: {renderSchemaTree(schema.properties[key], allSchemasByName)}
          </li>
        );
      })}
    </ul>
  );
}

export const SchemaExplorer: React.FunctionComponent<SchemaProps> = ({
  schema,
  allSchemasByName,
}) => {
  return <div>{renderSchemaTree(schema, allSchemasByName)}</div>;
};
