import styled, { css } from "styled-components";

const getBackgroundColor = () =>
  css`
    ${({ theme }) => theme.color.secondary}
  `;

const getBorderColor = () =>
  css`
    ${({ theme }) => theme.color.gray}
  `;

type GetFontColorProps = {
  info?: boolean;
};

const getFontColor = ({ info }: GetFontColorProps) =>
  info
    ? css`
        ${({ theme }) => theme.color.info}
      `
    : css`
        ${({ theme }) => theme.color.white}
      `;

export const Wrapper = styled.div`
  grid-area: AS;
  color: ${getFontColor({ info: false })};
  background-color: ${getBackgroundColor};
  border-right: 1px solid ${getBorderColor};
  padding-left: 24px;
`;

export const Logo = styled.img`
  margin-right: 4px;
  height: 40px;
  width: 40px;
`;

export const SidenavHeader = styled.header`
  display: flex;
  align-items: center;
  height: 70px;

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: 20px;

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const MenuItemLink = styled.a`
  color: ${getFontColor({ info: true })};
  text-decoration: none;
  margin-bottom: 12px;

  transition: opacity 0.3s;

  &:first-child {
    margin-top: 16px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const MyWallet = styled.span`
  font-size: 700;
`;

export const IconAndItemWrapper = styled.div;
