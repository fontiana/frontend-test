import React from "react";

import { HeaderContainer, HeaderText } from './style.ts';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <HeaderContainer>
      <HeaderText>{ title }</HeaderText>
    </HeaderContainer>
  );
}