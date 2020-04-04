import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const get_random = list => {
  return list[Math.floor(Math.random() * list.length)];
};

const colorArray = [
  '#A28FD0',
  '#CB946C',
  '#83CEC9',
  '#CC7584',
  '#A8D080',
  '#CCCC8B',
];

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

export const Initial = styled.div`
  border-radius: 50%;
  margin: auto;
  text-align: center;
  font-size: 21px;
  opacity: 1;
  width: 38px;
  height: 38px;
  background: #f4effc;
  color: ${() => get_random(colorArray)};
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
