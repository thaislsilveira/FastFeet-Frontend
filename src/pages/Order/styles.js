import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const statusBackgroundColor = {
  Cancelado: '#FAB0B0',
  Entregue: '#DFF0DF',
  Retirada: '#BAD2FF',
  Pendente: '#F0F0DF',
};

const statusTextColor = {
  Cancelado: '#DE3B3B',
  Entregue: '#2CA42B',
  Retirada: '#4D85EE',
  Pendente: '#C1BC35',
};

export const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  text-align: left;
  letter-spacing: 0px;
  opacity: 1;
  margin-right: 12px;
`;

export const AvatarName = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
`;

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

export const Status = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${props => {
    return statusTextColor[props.status];
  }};
  background-color: ${props => {
    return statusBackgroundColor[props.status];
  }};
  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => {
      return statusTextColor[props.status];
    }};
    margin-right: 6px;
  }
`;
