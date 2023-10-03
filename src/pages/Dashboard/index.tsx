import ListSymbols from "./components/ListSymbols";
import Symbols from "./components/Symbols";
import * as S from "./styles";

const Dashboard = () => {
  return (
    <S.Wrapper>
      <Symbols />
      <ListSymbols />
    </S.Wrapper>
  );
};

export default Dashboard;
