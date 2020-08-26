import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { useDeferenceOpenApiSchema } from '../hooks/useDeferenceOpenApiSchema';
import { getExampleFromSchema } from '../util/examples';
import { SchemaExample } from './SchemaExample';

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
