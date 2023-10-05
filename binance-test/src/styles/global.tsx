import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif;
  }

  input {
    border: 0;
    outline: none;
  }

  button {
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: box-shadow 250ms;
    
    &:hover {
      box-shadow: 0 0 8px rgba(0,0,0,0.2);
    }
  }
`;

export default GlobalStyle;