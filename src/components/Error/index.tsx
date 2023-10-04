import React, { FC } from "react";
import * as S from "./styles";
interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

const ErrorComponent = ({ message, onRetry }: ErrorProps) => {
  return (
    <S.ErrorContainer>
      <h1>Error: {message}</h1>
      <S.RetryButton onClick={onRetry}>Try again</S.RetryButton>
    </S.ErrorContainer>
  );
};

export default ErrorComponent;
