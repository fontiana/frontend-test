import styled from 'styled-components';

export const ListWrapper = styled.div`
margin: 1rem;
@media (min-width: 768px) {
  display: flex;
  flex-direction: column;
  width: 55%;
}
`;

export const ListSelect = styled.select`
  width: 100%;
  padding: 0.3rem;
  margin-right: 0.5rem;
`;

export const ListButton = styled.button`
  width: 15%;
`;

export const ListDropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const ListInput = styled.input`
  width: 30%;
  border: 1px solid;
  padding: 0.5rem;
  margin-right: 1rem;
`;

export const ListOption = styled.option``;

export const ListTable = styled.table`
  border-spacing: 0;
  table-layout: fixed;
  padding: 5px;
  background-color: #F8F9FA;
`;

export const ListHeader = styled.thead``;

export const ListRow = styled.tr``;

export const ListHead = styled.th`
  background-color: #F8F9FA;
  &:not(&:first-of-type) {
    border: 1px solid #d8d5d5;
  }

  &.active {
    background-color: #E7EAED;
  }
`;

export const ListBody = styled.tbody``;

export const ListData = styled.td`
  border: 1px solid #d8d5d5;
  text-align: center;
  padding: 0 15px;

  &.active {
    background-color: #E7EAED;
  }
`;