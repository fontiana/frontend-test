import styled, { keyframes } from "styled-components";

// Crie uma animação de rotação
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Estilize o componente de Loading usando Styled Components
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  // Animação de rotação
  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        stroke="#fffff"
      >
        <circle cx="20" cy="20" r="18" fill="none" strokeWidth="4" />
        <circle cx="20" cy="20" r="18" fill="none" strokeWidth="4" />
      </svg>
    </LoadingWrapper>
  );
};

export default Loading;
