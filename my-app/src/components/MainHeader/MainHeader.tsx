import * as S from "./MainHeader.styles";
import { Switch } from "../Switch";

export const MainHeader = () => {
  return (
    <S.Wrapper>
      <Switch />
      <S.Profile>
        <S.HelloContent>
          <S.IntroducingMessage> Olá </S.IntroducingMessage>
        </S.HelloContent>
        <S.UserName> Victor Moraes </S.UserName>
      </S.Profile>
    </S.Wrapper>
  );
};
