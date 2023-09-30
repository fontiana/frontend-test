import * as S from "./ContentHeader.styles";

import { ReactNode } from "react";

type Props = {
  title: string;
  underLineColor?: string;
  children?: ReactNode;
};

export const ContentHeader = ({ title, underLineColor, children }: Props) => {
  return (
    <S.Wrapper>
      <S.TitleWrapper underLineColor={underLineColor}>
        <h1>{title}</h1>
      </S.TitleWrapper>
      <S.Controllers>{children}</S.Controllers>
    </S.Wrapper>
  );
};
