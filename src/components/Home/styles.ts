import styled from "styled-components";

export const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 20px;
  margin: 0 auto;
  @media (min-width: 990px) {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  }
`;

export const DataContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;
