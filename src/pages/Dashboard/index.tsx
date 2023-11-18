import { Suspense } from "react";
import ListSymbols from "./components/ListSymbols";
import Symbols from "./components/Symbols";
import { ExchangeInfoProvider } from "./context/useExchangeInfo";
import * as S from "./styles";
import Spinner from "../../components/Spinner";

const Dashboard = () => {
  return (
    <ExchangeInfoProvider>
      <S.Wrapper>
        <Suspense
          fallback={
            <S.Wrapper>
              <Spinner message="Loading symbols..." />
            </S.Wrapper>
          }
        >
          <Symbols />
        </Suspense>
        <ListSymbols />
      </S.Wrapper>
    </ExchangeInfoProvider>
  );
};

export default Dashboard;
