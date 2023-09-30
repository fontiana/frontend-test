import styled, { css } from "styled-components";

const getWarningColor = () =>
  css`
    ${({ theme }) => theme.color.warning}
  `;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  align-items: center;
`;

type TitleProps = {
  underLineColor?: string;
};

export const TitleWrapper = styled.div<TitleProps>`
  > h1 {
    &::after {
      content: "";
      display: block;
      width: 55px;
      height: 10px;
      background-color: ${({ underLineColor }) =>
        underLineColor || getWarningColor};
    }
  }
`;

export const Controllers = styled.div`
  display: flex;
`;
