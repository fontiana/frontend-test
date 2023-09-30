import styled from "styled-components";

export const Input = styled.input`
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray};
  border-radius: 8px;
  width: 100%;
  height: 32px;
  font-size: 18px;
  padding: 8px;
  color: ${({ theme }) => theme.color.primary};

  &::placeholder {
    font-style: italic;
  }
`;

export const Label = styled.label`
  font-weight: 700;
  font-size: 20px;
`;

export const Wrapper = styled.div`
  width: 100%;
`;
