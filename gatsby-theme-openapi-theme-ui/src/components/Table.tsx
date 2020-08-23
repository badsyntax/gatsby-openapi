/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

interface TableProps {
  variant?: 'default' | 'borderLess';
}

export const Table: React.FunctionComponent<TableProps> = ({
  children,
  variant = 'default',
  ...props
}) => {
  return (
    <table
      sx={{
        variant: `table.${variant}`,
      }}
      {...props}
    >
      {children}
    </table>
  );
};
