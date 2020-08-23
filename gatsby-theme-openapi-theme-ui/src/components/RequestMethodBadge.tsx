/** @jsx jsx */
import React from 'react';
import { Badge, jsx, BadgeProps } from 'theme-ui';
import { OpenApiPath } from '../types';

const badgeLabel = {
  delete: 'del',
};

interface RequestMethodBadge {
  path: OpenApiPath;
  shortLabel?: boolean;
}

export const RequestMethodBadge: React.FunctionComponent<
  RequestMethodBadge & Omit<BadgeProps, 'ref'>
> = ({ path, shortLabel = true, ...props }) => {
  return (
    <Badge
      variant={path.method}
      css={{
        textTransform: 'uppercase',
      }}
      {...props}
    >
      {(shortLabel && badgeLabel[path.method]) || path.method}
    </Badge>
  );
};
