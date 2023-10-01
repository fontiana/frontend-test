import * as S from "./MainHeader.styles";
import { Switch } from "../Switch";

export const MainHeader = () => {
  return (
    <S.Wrapper>
      <Switch />
      <S.Profile>
        <S.HelloContent>
          <S.IntroducingMessage>
            Welcome to binace application to verify your bids
          </S.IntroducingMessage>
        </S.HelloContent>
      </S.Profile>
      <div></div>
    </S.Wrapper>
  );
};
