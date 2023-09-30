import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: #2497a6;
  border: none;
  border-radius: 0.2em;
  color: #d3edef;
  padding: 1em;
  width: 80%;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;
