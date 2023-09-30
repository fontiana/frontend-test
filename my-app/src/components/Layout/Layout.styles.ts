import styled from "styled-components";

/**
 * @description
 * MH = Main Header
 * AS = Aside
 * CT = Container
 */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 140px auto;
  grid-template-rows: 70px auto;

  grid-template-areas:
    "AS MH"
    "AS CT";

  height: 100vh;

  ::-webkit-scrollbar {
    width: 10px;
  }
`;