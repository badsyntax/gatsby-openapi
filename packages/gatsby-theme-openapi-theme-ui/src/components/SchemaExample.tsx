import React from 'react';

interface SchemaExampleProps {
  example: any;
}

export const SchemaExample: React.FunctionComponent<SchemaExampleProps> = ({
  example,
}) => {
  if (!example) {
    return null;
  }
  return (
    <pre
      sx={{
        backgroundColor: 'codeBlockBG',
        p: 2,
      }}
    >
      {typeof example === 'string' ? example : JSON.stringify(example, null, 2)}
    </pre>
  );
};
