import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SymbolsContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #30B482;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    width: calc(50% - 10px);
    margin-right: 20px;
    margin-bottom: 0;
  }
`;
