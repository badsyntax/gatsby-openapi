/** @jsx jsx */
import React from 'react';
import { Container, Image, jsx } from 'theme-ui';
import { OpenApiInfo_XLogo } from '../types';

interface Props {
  logo: OpenApiInfo_XLogo;
}

export const Logo: React.FunctionComponent<Props> = ({ logo }) => {
  return (
    <Container
      sx={{
        maxWidth: 180,
      }}
    >
      <Image src={logo.url} alt={logo.altText} />
    </Container>
  );
};
