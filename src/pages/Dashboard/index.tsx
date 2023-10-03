import ListSymbols from "./components/ListSymbols";
import Symbols from "./components/Symbols";
import { ExchangeInfoProvider } from "./context/useExchangeInfo";
import * as S from "./styles";

const Dashboard = () => {
  return (
    <ExchangeInfoProvider>
      <S.Wrapper>
        <Symbols />
        <ListSymbols />
      </S.Wrapper>
    </ExchangeInfoProvider>
  );
};

export default Dashboard;
