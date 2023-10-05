import styled from "styled-components";

export const DropdownContainer = styled.div`
  margin-bottom: 20px;
`;

export const Select = styled.select`
  padding: 10px;
  width: 200px;
`;

export const Option = styled.option`
  padding: 10px;
  background-color: white;
`;

export const SelectActive = styled(Select)`
padding: 10px;
  background-color: #f5f5f5;
`;

export const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 16px;
  table-layout: fixed;
`;

export const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;
