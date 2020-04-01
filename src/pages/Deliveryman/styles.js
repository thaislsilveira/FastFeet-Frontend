import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

export const Initial = styled.div`
  font-size: 40px;
  animation: transition 5s infinite;

  @keyframes transition {
    from {
      color: #5f3554;
    }
    to {
      color: #fe9c12;
    }
  }
`;

export const MyMenu = styled(Menu)`
  > .MuiMenu-paper {
    box-shadow: 0px 0px 2px #00000026;
  }
`;

export const MyMenuItem = styled(MenuItem)``;
