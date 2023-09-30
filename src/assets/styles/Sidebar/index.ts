import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  position: fixed;
  left: 2;
  width: 30vh;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em;
  box-shadow: 0 0 0.2em #ccc;
  border-radius: 0.5em;
  @media (max-width: 768px) {
    display: none;
  }
`;
