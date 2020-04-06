import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;

export const ImageAvatar = styled.div`
  border-radius: 50%;
  font-size: 16px;
  text-align: center;
  opacity: 1;
  color: #dddddd;
  width: 150px;
  height: 150px;
  margin: auto;

  border: 1px dashed #dddddd;
  .icon {
    margin: auto;
    display: block;
  }
  div {
    padding-top: 28px;
  }
`;
