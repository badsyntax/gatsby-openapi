/** @jsx jsx */
import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { jsx } from 'theme-ui';
// import { OpenApiResponse, OpenApiSchemasByName } from '../types';
import { Response } from './Response';
import { useDeferenceOpenApiSchema } from '../hooks/useDeferenceOpenApiSchema';

interface ResponsesProps {
  responses: OpenAPIV3.ResponsesObject;
  // allSchemasByName: OpenApiSchemasByName;
}

export const Responses: React.FunctionComponent<ResponsesProps> = ({
  responses,
  // allSchemasByName,
}) => {
  const deference = useDeferenceOpenApiSchema<OpenAPIV3.ResponseObject>();

  const dereferencedResponses = Object.keys(responses).map((code) => {
    return {
      code,
      response: deference(responses[code]),
    };
  });

  return (
    <div>
      {dereferencedResponses.map((response) => {
        return (
          <Response
            code={response.code}
            key={`response-${response.code}`}
            response={response.response}
          />
        );
      })}
    </div>
  );
};
