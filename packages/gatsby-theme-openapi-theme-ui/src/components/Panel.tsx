/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

export const Panel: React.FunctionComponent = (props) => {
  return (
    <div
      sx={{
        backgroundColor: 'white',
        border: (theme) => `1px solid ${theme.colors.muted}`,
        borderRadius: '4px',
        padding: 3,
        mb: 3,
        ':last-child': {
          mb: 0,
        },
      }}
      {...props}
    />
  );
};
