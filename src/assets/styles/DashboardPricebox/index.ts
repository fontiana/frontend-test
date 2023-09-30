import styled from 'styled-components';

export const PositivePriceBox = styled.button`
  padding: 1px;
  background-color: #e6f8ee;
  border: 1px solid #b7efd0;
  width: 30%;
  color: green;
  border-radius: 1em;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const NegativePriceBox = styled.button`
  padding: 1px;
  background-color: #ffcccc;
  border: 1px solid #ff9999;
  width: 30%;
  color: red;
  border-radius: 1em;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
