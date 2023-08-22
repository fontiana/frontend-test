import styled from 'styled-components';

export const SymbolsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 20px;
  margin: 20px;
  background-color: #30B482;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const SymbolsListTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

export const SymbolsListContent = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100%;
  margin-top: 20px;
`;

export const SymbolItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  padding: 10px;
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

export const SymbolInput = styled.input`
  width: auto;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.2rem;
  color: #333;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #333;
  }
`;