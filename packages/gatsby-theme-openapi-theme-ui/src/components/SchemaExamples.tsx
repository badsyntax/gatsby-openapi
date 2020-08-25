/** @jsx jsx */
import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { jsx } from 'theme-ui';

interface SchemaExamplesProps {
  media: OpenAPIV3.MediaTypeObject;
}

const SCHEMA_TYPE_OBJECT = 'object';
const SCHEMA_TYPE_ARRAY = 'array';

// function getExampleObject(schema, allSchemasByName: OpenApiSchemasByName) {
//   return Object.keys(schema.properties).reduce(
//     (obj, propertyName) => ({
//       ...obj,
//       [propertyName]: getExample(
//         schema.properties[propertyName],
//         allSchemasByName
//       ),
//     }),
//     {}
//   );
// }

// function getExampleArray(schema, allSchemasByName: OpenApiSchemasByName) {
//   if (schema.items.oneOf) {
//     return schema.items.oneOf.map(getExample);
//   }
//   return [getExample(schema.items, allSchemasByName)];
// }

// function getExampleValue(schema) {
//   return schema.example !== undefined
//     ? schema.example
//     : schema.format || schema.type;
// }

// function getExampleRef(ref: string, allSchemasByName: OpenApiSchemasByName) {
//   const refSchemaName = ref.split('/').pop();
//   const refSchema = allSchemasByName[refSchemaName];
//   return getExample(JSON.parse(refSchema), allSchemasByName);
// }

// function getExample(schema, allSchemasByName: OpenApiSchemasByName) {
//   switch (schema.type) {
//     case SCHEMA_TYPE_OBJECT:
//       return getExampleObject(schema, allSchemasByName);
//     case SCHEMA_TYPE_ARRAY:
//       return getExampleArray(schema, allSchemasByName);
//     default:
//       if (schema['$ref']) {
//         return getExampleRef(schema['$ref'], allSchemasByName);
//       }
//       return getExampleValue(schema);
//   }
// }

// function buildExamples(
//   content: OpenApiResponseContent,
//   allSchemasByName: OpenApiSchemasByName
// ): OpenApiSchemaExample[] {
//   if (content.examples && content.examples.length) {
//     return content.examples;
//   }
//   return [
//     {
//       name: null,
//       example: JSON.stringify(
//         getExample(JSON.parse(content.schema), allSchemasByName)
//       ),
//     },
//   ];
// }

export const SchemaExamples: React.FunctionComponent<SchemaExamplesProps> = ({
  media,
}) => {
  return <div>examples</div>;
  // const examples = buildExamples(content, allSchemasByName);
  // return (
  //   <React.Fragment>
  //     {examples.map((example) => {
  //       return (
  //         <React.Fragment>
  //           {example.name && <div>{example.name}:</div>}
  //           <pre>{JSON.stringify(JSON.parse(example.example), null, 2)}</pre>
  //         </React.Fragment>
  //       );
  //     })}
  //   </React.Fragment>
  // );
};
