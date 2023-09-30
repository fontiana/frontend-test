import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-top: 0.5em;
`;

export const SearchContainer = styled.div`
  position: relative;

  .group:focus-within {
    outline: none;
  }
`;

export const SearchInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 0 1px #ccc;

  padding: 3px;
  width: 98%;
  height: 100%;

  &:focus {
    outline-style: none;
    box-shadow: none;
  }
`;

export const SearchIconSpan = styled.span`
  position: absolute;
  top: 8px;
  right: 3.5px;
  color: #ccc;
  cursor: pointer;
  opacity: 0.5;

  &.group-focus-within:invisible {
    opacity: 0;
  }
`;

export const ListContainer = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  box-shadow: 0 0 0.2em #ccc;
  border-radius: 0.5em;
`;
