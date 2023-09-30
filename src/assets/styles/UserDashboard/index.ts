import {Select} from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  height: 90vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  box-shadow: 0 0 0.2em #ccc;
  border-radius: 0.5em;
  margin-top: 0.5em;
  gap: 1em;
`;

export const StyledSelect = styled(Select)`
  width: 97%;
  height: 100%;
  border: 1px solid #ccc;
  borderradius: 4px;
  boxshadow: 0 0 1px #ccc;
`;

export const ListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.2em;
`;

export const ListButton = styled.button`
  height: 100%;
  width: 3%;
  border: none;
  background-color: #2597a6;
  border-radius: 0.5em;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    box-shadow: 3px 2px 6px 1px rgba(0, 0, 0, 0.24);
  }

  @media (max-width: 768px) {
    width: 10%;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    overflow-y: scroll;
    display: block;
  }
`;

export const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

export const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

export const TableRow = styled.tr`
  border: #f2f2f2;
`;

export const TableCell = styled.td`
  padding: 1em;
`;

export const SymbolCell = styled(TableCell)`
  font-weight: bold;
`;

export const PercentageCell = styled(TableCell)`
  color: green;
`;
