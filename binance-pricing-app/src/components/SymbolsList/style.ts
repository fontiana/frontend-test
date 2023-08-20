import styled from 'styled-components';

export const SymbolsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const SymbolsListTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

export const SymbolsListContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  overflow-y: auto;
`;

export const SymbolItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #eee;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ddd;
  }
`;

export const SymbolItemText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;