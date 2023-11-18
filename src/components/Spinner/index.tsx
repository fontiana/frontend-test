import * as S from "./styles";

type TSpinner = {
  page?: string;
  message?: string;
};

const Spinner = ({ page, message }: TSpinner) => {
  return (
    <S.Container data-testid={`${page}__spinner`}>
      <S.Loader />
      {message && <h1>{message}</h1>}
    </S.Container>
  );
};

export default Spinner;
