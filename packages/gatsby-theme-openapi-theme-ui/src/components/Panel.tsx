/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

export const Panel: React.FunctionComponent = (props) => {
  return (
    <div
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 3,
        boxShadow:
          'rgba(0,0,0,0.133) 0px 1px 3px 0px, rgba(0,0,0,0.11) 0px 0.5px 1.8px 0px',
        mb: 3,
        ':last-child': {
          mb: 0,
        },
        animationName: 'animateIn',
        animationDuration: '1s',
        animationTimingFunction: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
        animationFillMode: 'both',
        '@keyframes animateIn': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0px, 20px, 0px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate3d(0px, 0px, 0px)',
          },
        },
      }}
      {...props}
    />
  );
};
