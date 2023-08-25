import { SymbolContextProvider } from '@/contexts/SymbolContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { QueryClient, QueryClientProvider } from 'react-query';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SymbolContextProvider>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </SymbolContextProvider>
    </QueryClientProvider>
  );
}
