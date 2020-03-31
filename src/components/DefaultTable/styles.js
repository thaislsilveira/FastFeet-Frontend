import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 25px;

  background: #f5f5f5;
  font-size: 16px;
  width: 100%;
  text-align: left;

  thead {
    tr {
      font-size: 18px;
    }
  }
  tbody tr {
    background: #f5f5f5;
    height: 57px;
  }

  tbody td {
    background: #ffffff 0% 0% no-repeat padding-box;
    padding-right: 50px;
    margin-bottom: 25px;
    border-radius: 4px;
  }
`;
