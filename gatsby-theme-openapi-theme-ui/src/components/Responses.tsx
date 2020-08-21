/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { OpenApiResponse, OpenApiSchemasByName } from '../../../types';
import { Response } from './Response';

interface ResponsesProps {
  responses: OpenApiResponse[];
  allSchemasByName: OpenApiSchemasByName;
}

export const Responses: React.FunctionComponent<ResponsesProps> = ({
  responses,
  allSchemasByName,
}) => {
  return (
    <div>
      {responses.map((response, i) => {
        return (
          <Response
            key={`response-${i}`}
            response={response}
            allSchemasByName={allSchemasByName}
          />
        );
      })}
    </div>
  );
};
