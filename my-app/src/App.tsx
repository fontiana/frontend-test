import GlobalStyles from "./Styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

import dark from "./Styles/themes/dark";
import { Routes } from "./routes";
import { Provider } from "./services/context";
// import light from './Styles/themes/light'

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ThemeProvider theme={dark}>
          <Routes />
          <GlobalStyles />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
};
