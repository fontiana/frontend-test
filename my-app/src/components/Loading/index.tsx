import styled from "styled-components";

export const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};

const CircularProgress = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid ${({ theme }) => theme.color.white};
  border-radius: 50%;
  position: relative;
  animation: loading 1s infinite linear;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.white};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: loading-inner 1s infinite linear;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loading-inner {
    0% {
      opacity: 0;
      transform: scale(0.6);
    }

    50% {
      opacity: 1;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(0.6);
    }
  }
`;
