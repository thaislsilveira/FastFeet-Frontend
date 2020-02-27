import React from 'react';

import { Button } from './styles';

export default function PageButton({ children, funcPage, lock }) {
  return (
    <Button disabled={lock} onClick={funcPage}>
      {children}
    </Button>
  );
}
