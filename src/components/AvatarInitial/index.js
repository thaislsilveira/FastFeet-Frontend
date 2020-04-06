import React from 'react';

import { Container } from './styles';

const backgroundArray = [
  '#F4EFFC',
  '#FCF4EE',
  '#EBFBFA',
  '#FFEEF1',
  '#F4F9EF',
  '#FCFCEF',
];

const colorArray = [
  '#A28FD0',
  '#CB946C',
  '#83CEC9',
  '#CC7584',
  '#A8D080',
  '#CCCC8B',
];

export default function AvatarInitial({ children }) {
  const randomColorPosition =
    Math.floor(Math.random() * backgroundArray.length) + 1 - 1;
  return (
    <Container
      textColor={colorArray[randomColorPosition]}
      bgColor={backgroundArray[randomColorPosition]}
    >
      {children}
    </Container>
  );
}
