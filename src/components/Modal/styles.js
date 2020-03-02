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
    text-align: justify;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    textarea {
      padding: 10px;
      border-radius: 4px;
      height: 150px;
      margin-bottom: 15px;
    }
    button {
      font-size: 17px;
      font-weight: bold;
      border-radius: 4px;
      padding: 13px;
      background: #ee4d64;
      color: #fff;
      border: none;
    }
  }
`;
