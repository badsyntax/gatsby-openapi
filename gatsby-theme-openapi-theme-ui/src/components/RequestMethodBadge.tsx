/** @jsx jsx */
import React from 'react';
import { Badge, jsx } from 'theme-ui';
import { OpenApiPath } from '../types';

const badgeLabel = {
  delete: 'del',
};

interface RequestMethodBadge {
  path: OpenApiPath;
  shortLabel?: boolean;
}

export const RequestMethodBadge: React.FunctionComponent<RequestMethodBadge> = ({
  path,
  shortLabel = true,
  ...props
}) => {
  return (
    <Badge
      variant={path.method}
      {...props}
      css={{
        textTransform: 'uppercase',
      }}
    >
      {(shortLabel && badgeLabel[path.method]) || path.method}
    </Badge>
  );
};
