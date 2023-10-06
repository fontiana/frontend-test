import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 10px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 200px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  position: relative;
  padding-left: 35px;
  cursor: pointer;

  input[type="checkbox"] {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;
