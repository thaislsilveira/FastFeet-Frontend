import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: center;
  background: #fff;
  border-radius: 5px;
  display: flex;

  img {
    width: 80%;
    padding: 0 15px;
    margin-top: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;

    h3 {
      font-weight: bold;
      text-transform: uppercase;
      text-align: left;
    }

    input {
      background: rgba(255, 255, 255, 0.2);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #333;
      margin: 0 0 10px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7159c1;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 0 10px;
      font-weight: bold;
    }
  }
`;
