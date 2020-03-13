import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    display: flex;

    li:first-child {
      margin-left: 20px;
    }
    .nav-link {
      color: #444444;
    }
    li {
      margin: 0 10px;
      a {
        color: #999999;
        font-size: 15px;
        font-weight: bold;
      }
    }
  }

  img {
    width: 200px;
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #eee;
  }
  a {
    font-weight: bold;
    color: #7159c1;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 3px;
      font-size: 12 px;
      color: #ff0000;
    }
  }
`;
