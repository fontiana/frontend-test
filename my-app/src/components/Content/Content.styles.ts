import styled, { css } from "styled-components";

const getBackgroundColor = () =>
  css`
    ${({ theme }) => theme.color.primary}
  `;
const getFontColor = () =>
  css`
    ${({ theme }) => theme.color.white}
  `;

export const Wrapper = styled.div`
  grid-area: CT;
  color: ${getFontColor};
  background-color: ${getBackgroundColor};
  padding: 16px;

  height: calc(100vh - 70px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.color.tertiary};
    border-radius: 10px;
  }
`;
