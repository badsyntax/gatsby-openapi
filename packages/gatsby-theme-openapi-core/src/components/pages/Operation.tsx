import React from 'react';
import { OpenApiPath } from '../../types';
import { PageProps } from 'gatsby';

interface OperationDataProps {
  path: OpenApiPath;
}

export const Operation: React.FunctionComponent<PageProps<
  OperationDataProps
>> = () => {
  return <div>Operation</div>;
};
