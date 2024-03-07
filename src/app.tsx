import { ThemeProvider } from "@emotion/react";
import { Home } from "./home";
import theme from "./theme/Theme";

export const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};
