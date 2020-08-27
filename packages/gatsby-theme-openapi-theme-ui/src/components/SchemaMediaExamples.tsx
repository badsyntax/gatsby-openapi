import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { useDeferenceOpenApiSchema } from '../hooks/useDeferenceOpenApiSchema';
import { getExampleFromSchema } from '../util/examples';
import { SchemaExample } from './SchemaExample';
import { TabItem, Tabs } from './Tabs';

interface SchemaMediaExamplesProps {
  media: OpenAPIV3.MediaTypeObject;
  type?: string;
}

export const SchemaMediaExamples: React.FunctionComponent<SchemaMediaExamplesProps> = ({
  media,
  type,
}) => {
  const dereferenceExample = useDeferenceOpenApiSchema<
    OpenAPIV3.ExampleObject
  >();
  const dereferenceSchema = useDeferenceOpenApiSchema<OpenAPIV3.SchemaObject>();
  if (media.examples) {
    return (
      <Tabs>
        {Object.keys(media.examples).map((name) => {
          const example = dereferenceExample(media.examples![name]);
          return (
            <TabItem key={name} itemKey={name} label={name} variant="pill">
              <SchemaExample example={example.value} type={type} />
            </TabItem>
          );
        })}
      </Tabs>
    );
  }
  if (media.example) {
    return <SchemaExample example={media.example} type={type} />;
  }
  if (media.schema) {
    const schema = dereferenceSchema(media.schema);
    const example = getExampleFromSchema(schema, dereferenceSchema);
    return <SchemaExample example={example} type={type} />;
  }
  return null;
};
