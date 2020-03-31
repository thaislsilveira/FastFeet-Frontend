import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 10px auto 0 auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 4px;
  background: #f5f5f5;
`;

export const Content = styled.div`
  background: #f5f5f5;
  form {
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    margin: 0 auto 10px auto;
    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 4px 0 0 1px;
      font-weight: bold;
    }
    label {
      font-size: 18px;
      font-weight: bold;
      margin: 15px 0;
    }
    input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 10px;
      border-radius: 4px;
      padding: 10px 15px;
      margin-right: 10px;
    }
    select {
      border: 1px solid rgba(0, 0, 0, 0.2);
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      padding: 10px 15px;
      margin-right: 10px;
    }
    div.wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    div.organize {
      display: flex;
      flex-direction: column;
      align-items: center;
      label {
        align-self: flex-start;
      }
    }
  }
`;
