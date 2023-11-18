import * as S from "./styles";

type TErrorProps = {
  message: string;
  onRetry?: () => void;
};

const ErrorComponent = ({ message, onRetry }: TErrorProps) => {
  return (
    <S.ErrorContainer>
      <h1>Error: {message}</h1>
      {onRetry && <S.RetryButton onClick={onRetry}>Try again</S.RetryButton>}
    </S.ErrorContainer>
  );
};

export default ErrorComponent;
