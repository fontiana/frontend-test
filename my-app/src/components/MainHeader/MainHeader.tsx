import * as S from "./MainHeader.styles";

export const MainHeader = () => {
  return (
    <S.Wrapper>
      <S.Profile>
        <S.HelloContent>
          <S.IntroducingMessage>
            Welcome to binace application to verify your bids
          </S.IntroducingMessage>
        </S.HelloContent>
      </S.Profile>
      <div />
    </S.Wrapper>
  );
};
