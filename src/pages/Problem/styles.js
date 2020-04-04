import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import 'react-confirm-alert/src/react-confirm-alert.css';

export const MyMenu = styled(Menu)`
  > .MuiMenu-paper {
    box-shadow: 0 0 6px 0px rgba(224, 224, 224, 0.2);
  }
`;

export const MyMenuItem = styled(MenuItem)`
  vertical-align: middle;
  svg {
    margin-right: 6px;
  }
`;
