import styled from "styled-components";

export const Wrapper = styled.aside`
  border: 2px solid var(--primary-color);
  min-width: 220px;
  background-color: rgba(30, 65, 71, 0.5);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  max-height: 488px;
`;

export const Search = styled.input`
  width: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  outline: none;
  font-size: 16px;
  margin-bottom: 12px;
  background-color: var(--subtext-color);
  color: var(--black);
`;

export const CoinSymbolHeader = styled.label`
  display: flex;
  align-items: center;
  height: 32px;
  column-gap: 8px;
  background-color: var(--black);
  color: var(--white);
  padding-left: 12px;
  border-radius: 8px;
`;

export const CoinSymbol = styled.label`
  display: flex;
  align-items: center;

  height: 32px;
  column-gap: 8px;
  padding-left: 12px;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
`;

export const Button = styled.input.attrs({ type: "submit" })`
  width: 100%;
  height: 36px;
  border-radius: 8px;
  margin-top: 24px;
  cursor: pointer;

  &:hover {
    background-color: var(--black);
    color: var(--white);
  }
`;
