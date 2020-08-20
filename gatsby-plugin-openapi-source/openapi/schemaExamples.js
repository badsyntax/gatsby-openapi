const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

function getExampleObject(schema) {
  return Object.keys(schema.properties).reduce(
    (obj, propertyName) => ({
      ...obj,
      [propertyName]: getExample(schema.properties[propertyName]),
    }),
    {}
  );
}

function getExampleArray(schema) {
  if (schema.items.oneOf) {
    return schema.items.oneOf.map(getExample);
  }
  return [getExample(schema.items)];
}

function getExampleValue(schema) {
  return schema.example !== undefined
    ? schema.example
    : schema.format || schema.type;
}

function getExample(schema) {
  switch (schema.type) {
    case SCHEMA_TYPE_OBJECT:
      return getExampleObject(schema);
    case SCHEMA_TYPE_ARRAY:
      return getExampleArray(schema);
    default:
      return getExampleValue(schema);
  }
}

function getExamples(content) {
  if (content.examples) {
    return Object.keys(content.examples).map((name) => ({
      name,
      example: JSON.stringify(content.examples[name].value),
    }));
  }
  if (content.example) {
    return [
      {
        name: null,
        example: JSON.stringify(content.example),
      },
    ];
  }
  return [
    {
      name: null,
      example: JSON.stringify(getExample(content.schema)),
    },
  ];
}

function normaliseSchemaExample(schema) {
  return {
    ...schema,
    example: JSON.stringify(getExample(schema)),
  };
}

module.exports = {
  getExamples,
  normaliseSchemaExample,
};
