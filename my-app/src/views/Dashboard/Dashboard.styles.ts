import styled from "styled-components";
import { Input as _Input } from "../../components/Input";

export const Input = styled(_Input)``;

export const SubTitle = styled.h3`
  margin-right: 4px;
  font-size: 20px;
  margin: 12px 0;
`;

export const Section = styled.div`
  width: 100%;
  @media screen and (max-width: 500px) {
    margin-top: 12px;
  }
`;

export const Wrapper = styled.div`
  display: flex;

  @media screen and (max-width: 500px) {
    display: block;
  }
`;
