/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsx jsx */
import Prism from '@theme-ui/prism';
import React from 'react';
import { jsx } from 'theme-ui';

type FormatterTypes = 'application/x-www-form-urlencoded' | 'application/json';
type Formatter = Record<FormatterTypes, (example: any) => void>;

const formatters: Formatter = {
  'application/x-www-form-urlencoded': (example: any) => {
    return decodeURIComponent(new URLSearchParams(example).toString());
  },
  'application/json': (example: any) => {
    return typeof example === 'string'
      ? example
      : JSON.stringify(example, null, 2);
  },
};

interface SchemaExampleProps {
  example: any;
  type?: string;
}

export const SchemaExample: React.FunctionComponent<SchemaExampleProps> = ({
  example,
  type = 'application/json',
}) => {
  if (!example) {
    return null;
  }
  const formattedExample =
    type && formatters[type] ? formatters[type](example) : String(example);

  return (
    <Prism
      sx={{
        mb: 0,
      }}
      className="language-json"
    >
      {formattedExample}
    </Prism>
  );
};
