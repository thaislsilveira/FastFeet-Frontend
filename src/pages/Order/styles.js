import styled from 'styled-components';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const statusBackgroundColor = {
  Cancelado: '#FAB0B0',
  Entregue: '#2CA42B',
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
`;

export const MyMenu = styled(Menu)`
  > .MuiMenu-paper {
    box-shadow: 0px 0px 2px #00000026;
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

export const MyMenuItem = styled(MenuItem)``;
