/** @jsx jsx */
import React from 'react';
import { Badge, jsx, BadgeProps } from 'theme-ui';

const badgeLabel = {
  delete: 'del',
};

interface RequestMethodBadge {
  method: string;
  shortLabel?: boolean;
}

export const RequestMethodBadge: React.FunctionComponent<
  RequestMethodBadge & Omit<BadgeProps, 'ref'>
> = ({ method, shortLabel = true, ...props }) => {
  return (
    <Badge
      variant={method}
      css={{
        textTransform: 'uppercase',
      }}
      {...props}
    >
      {(shortLabel && badgeLabel[method]) || method}
    </Badge>
  );
};
