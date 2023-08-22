import styled from 'styled-components';

export const SymbolsDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const SymbolsDetailsTitle = styled.h3`
  font-size: 24px;
  color: #30B482;
  margin-bottom: 20px;
`;

export const SymbolsDetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #30B482;
`;

export const SymbolsDetailsTableHead = styled.thead`
  background-color: #30B482;
  color: #ffffff;
`;

export const SymbolsDetailsTH = styled.th`
  padding: 12px;
  text-align: left;
`;

export const SymbolsDetailsTD = styled.td`
  padding: 12px;
  border: 1px solid #30B482;
`;

export const SymbolsDetailsTR = styled.tr`
  &:nth-child(even) {
    background-color: #ebebeb;
  }
`;

export const SymbolsDetailsTBody = styled.tbody`
  background-color: #ffffff;
  color: #30B482;
`;

export const SymbolsDetailsLoding = styled.div`
  font-size: 24px;
  color: #30B482;
  margin-top: 20px;
`;
