import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 7px;
  border-radius: 50%;
  margin-right: 12px;
  text-align: center;
  font-size: 21px;
  opacity: 1;
  width: 38px;
  height: 38px;
  background: ${props => props.bgColor};
  color: ${props => props.textColor};
`;
