function getExampleObject(schema) {
  return Object.keys(schema.properties).reduce((obj, propertyName) => {
    const property = schema.properties[propertyName];
    obj[propertyName] = getExample(property);
    return obj;
  }, {});
}

function getExampleArray(schema) {
  if (schema.items.oneOf) {
    return schema.items.oneOf.map(getExample);
  }
  switch (schema.items.type) {
    case 'object':
      return [getExampleObject(schema.items)];
    case 'array':
      return [getExampleArray(schema.items)];
    default:
      return [getExampleString(schema.items)];
  }
}

function getExampleString(schema) {
  return schema.example !== undefined
    ? schema.example
    : schema.format || schema.type;
}

function getExample(schema) {
  switch (schema.type) {
    case 'object':
      return getExampleObject(schema);
    case 'array':
      return getExampleArray(schema);
    default:
      return getExampleString(schema);
  }
}

function getExamples(content) {
  if (content.examples) {
    return Object.keys(content.examples).map((name) => ({
      name,
      example: JSON.stringify(content.examples[name].value),
    }));
  }
  return [
    {
      name: null,
      example: JSON.stringify(getExample(content.schema)),
    },
  ];
}

function sanitizeFieldNames(obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    newObj[key.replace('-', '_')] = obj[key];
    return newObj;
  }, {});
}

module.exports = {
  getExamples,
  sanitizeFieldNames,
};
