import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const modalEffect = keyframes`
    from {
      opacity: 0;
      transform: translateY(-60px)
    } to {
      opacity: 1;
      transform: translateY(0)
    }
  `;

export const Modal = styled.div`
  border-radius: 4px;
  width: 480px;
  max-width: 480px;
  padding: 40px;
  background: #fff;
  ${props =>
    props.visibleEffect &&
    css`
      animation: ${modalEffect} 0.3s;
    `}
  > strong {
    display: block;
    font-size: 17px;
    margin-bottom: 5px;
  }
  p {
    color: #666666;
    font-size: 16px;
    line-height: 30px;
    text-align: left;
  }
  form {
    display: flex;
    flex-direction: column;

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 10px 0;
      font-weight: bold;
    }
    > strong {
      display: block;
      margin: 10px 0;
      font-size: 17px;
    }
  }
`;

export const Signature = styled.img`
  width: 234px;
  height: 36px;
  margin: auto;
`;

export const SignatureBlock = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
`;

export const Text = styled.div`
  border-radius: 50%;
  margin: auto;
  text-align: center;
  font-size: 21px;
  opacity: 1;
`;
