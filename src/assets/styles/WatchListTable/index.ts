import styled from 'styled-components';

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

export const PercentageCell = styled(TableCell)``;
