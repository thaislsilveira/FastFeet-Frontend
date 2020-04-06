import styled from 'styled-components';

import searchlogo from '~/assets/search.svg';

export const Container = styled.div`
  background: #f5f5f5;
  div {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      flex-shrink: 0;
      flex-grow: 1 !important;
      font-size: 24px;
      font-weight: bold;
      padding-left: 30px;
      margin-right: auto;
    }

    aside {
      a.prevPage {
        background: #c4c4c4;
      }
      a {
        align-items: center;
        font-weight: bold;
        border-radius: 4px;
        padding: 10px 15px;
        background: #7159c1;
        color: #fff;
        border: none;
        height: 36px;
        vertical-align: middle;
        svg {
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      input {
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 0 30px;
        width: 250px;
        background: #fff url(${searchlogo}) no-repeat 10px;
        border-radius: 4px;
        margin-left: 30px;
      }
      button {
        font-weight: bold;
        margin-left: 10px;
        border-radius: 4px;
        padding: 0px 15px;
        background: #7159c1;
        color: #fff;
        border: none;
        height: 36px;
        svg {
          width: 16px;
          height: 16px;
          vertical-align: bottom;
          margin-right: 5px;
        }
      }
    }

    aside.blocoPesquisa {
      display: flex;
      justify-content: space-between;
      width: 100%;
      a.prevPage {
        background: #c4c4c4;
      }
      a {
        display: flex;
        align-items: center;
        font-weight: bold;
        border-radius: 4px;
        padding: 10px 15px;
        background: #7159c1;
        color: #fff;
        border: none;

        svg {
          margin-right: 5px;
        }
      }
      input {
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 0 30px;
        width: 250px;
        background: #fff url(${searchlogo}) no-repeat 10px;
        border-radius: 4px;
        margin-left: 30px;
      }
      button {
        display: flex;
        align-items: center;
        font-weight: bold;
        margin-left: 10px;
        border-radius: 4px;
        padding: 10px 15px;
        background: #7159c1;
        color: #fff;
        border: none;

        svg {
          margin-right: 5px;
        }
      }
    }
  }
`;
