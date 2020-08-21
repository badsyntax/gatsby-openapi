const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

function getExampleObject(schema) {
  return Object.keys(schema.properties).reduce(
    (obj, propertyName) => ({
      ...obj,
      [propertyName]: getObjectTreeFromSchema(schema.properties[propertyName]),
    }),
    {}
  );
}

function getExampleArray(schema) {
  if (schema.items.oneOf) {
    return schema.items.oneOf.map(getObjectTreeFromSchema);
  }
  return [getObjectTreeFromSchema(schema.items)];
}

function getExampleValue(schema) {
  return schema.example !== undefined
    ? schema.example
    : schema.format || schema.type;
}

function getObjectTreeFromSchema(schema) {
  switch (schema.type) {
    case SCHEMA_TYPE_OBJECT:
      return getExampleObject(schema);
    case SCHEMA_TYPE_ARRAY:
      return getExampleArray(schema);
    default:
      return getExampleValue(schema);
  }
}

module.exports = {
  getObjectTreeFromSchema,
};
