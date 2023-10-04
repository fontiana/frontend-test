import styled from "styled-components";

export const ErrorContainer = styled.section`
  background-color: var(--error-color);
  border: 1px solid #f5c6cb;
  color: var(--white);
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 8px;
`;

export const RetryButton = styled.button`
  background-color: var(--white);
  color: var(--error-color);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color);
    color: var(--white);
  }
`;
