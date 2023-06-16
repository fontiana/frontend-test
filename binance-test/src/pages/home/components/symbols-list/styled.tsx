import styled from 'styled-components';

export const SymbolsListWrapper = styled.div`
@media (min-width: 768px) {
    width 30%;
    margin-top: 1rem;
}
`;

export const SymbolsListSymbolWrapper = styled.div`
margin: 0.5rem;
@media (min-width: 768px) {
    border: 1px solid #2597A7;
    padding: 0.5rem 1rem;
    margin: 1rem 0 3rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
`;

export const SymbolsListNotFound = styled.div``;

export const SymbolsListHeader = styled.h2``;

export const SymbolsListAddButton = styled.button`
    background-color: #2597A7;
    color: #ffffff;
    padding: 0.5rem 1rem;
    width: 100%;
    border-radius: 5px;
`;