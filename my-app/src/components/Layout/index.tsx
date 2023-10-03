import * as S from "./Layout.styles";
import { MainHeader } from "../MainHeader";
import { Aside } from "../Aside";
import { Content } from "../Content";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <S.Grid>
      <MainHeader />
      <Aside />
      <Content>{children}</Content>
    </S.Grid>
  );
};
