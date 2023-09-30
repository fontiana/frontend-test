import { SymbolContextProvider } from "@/context/SymbolContext";
import { queryClient } from "@/services/queryClient";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SymbolContextProvider>
        <Component {...pageProps} />
      </SymbolContextProvider>
    </QueryClientProvider>
  );
}
