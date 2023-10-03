import * as S from "./styles";

const ListSymbols = () => {
  return (
    <S.Wrapper>
      <S.Table>
        <S.TableHead>
          <tr>
            <S.TableHeaderCell>Symbol</S.TableHeaderCell>
            <S.TableHeaderCell>Last Price</S.TableHeaderCell>
            <S.TableHeaderCell>Bid Price</S.TableHeaderCell>
            <S.TableHeaderCell>Ask Price</S.TableHeaderCell>
            <S.TableHeaderCell>Price Change (%)</S.TableHeaderCell>
          </tr>
        </S.TableHead>
        <tbody>
          <S.TableRow>
            <S.SymbolCell>ABC</S.SymbolCell>
            <S.TableCell>100.00</S.TableCell>
            <S.TableCell>98.50</S.TableCell>
            <S.TableCell>101.00</S.TableCell>
            <S.TableCell>+2.5%</S.TableCell>
          </S.TableRow>
          <S.TableRow>
            <S.SymbolCell>XYZ</S.SymbolCell>
            <S.TableCell>50.25</S.TableCell>
            <S.TableCell>49.75</S.TableCell>
            <S.TableCell>50.75</S.TableCell>
            <S.TableCell>-1.0%</S.TableCell>
          </S.TableRow>
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default ListSymbols;
