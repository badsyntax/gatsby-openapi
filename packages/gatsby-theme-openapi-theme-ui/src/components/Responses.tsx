/** @jsx jsx */
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { jsx } from 'theme-ui';
import { useDeferenceOpenApiSchema } from '../hooks/useDeferenceOpenApiSchema';
import { Response } from './Response';

interface ResponsesProps {
  responses: OpenAPIV3.ResponsesObject;
}

export const Responses: React.FunctionComponent<ResponsesProps> = ({
  responses,
}) => {
  const deference = useDeferenceOpenApiSchema<OpenAPIV3.ResponseObject>();

  const dereferencedResponses = Object.keys(responses).map((code) => {
    return {
      code,
      response: deference(responses[code]),
    };
  });

  return (
    <React.Fragment>
      {dereferencedResponses.map((response) => {
        return (
          <Response
            code={response.code}
            key={`response-${response.code}`}
            response={response.response}
          />
        );
      })}
    </React.Fragment>
  );
};
