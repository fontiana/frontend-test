import React from "react";
import * as S from "./Content.styles";

interface IContent {
  children: React.ReactNode;
}

export const Content: React.FC<IContent> = ({ children }) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};
