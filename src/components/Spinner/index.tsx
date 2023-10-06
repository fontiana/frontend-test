import * as S from "./styles";

interface SpinnerI {
  page?: string;
  message?: string;
}

const Spinner = ({ page, message }: SpinnerI) => {
  return (
    <S.Container data-testid={`${page}__spinner`}>
      <S.Loader />
      {message && <h1>{message}</h1>}
    </S.Container>
  );
};

export default Spinner;
