import styled, { css } from "styled-components";

const getBackgroundColor = () => css`${({ theme }) => theme.color.secondary}`;

const getBorderColor = () => css`${({ theme }) => theme.color.gray}`;

const getColor = () => css`${({ theme }) => theme.color.white}`;


export const Wrapper = styled.div`
grid-area: MH;
color: ${getColor};
background-color: ${getBackgroundColor};
border-bottom: 1px solid ${getBorderColor};
display: flex;
justify-content: space-between;
align-items: center;
padding: 32px;
`;

export const Profile = styled.div``;

export const HelloContent = styled.div`
display: flex;
`;

export const IntroducingMessage = styled.h3`
margin-right: 4px;
`;

export const UserName = styled.span``;