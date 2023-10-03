import React from "react";
import * as S from "./styles";

const Symbols = () => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <S.Wrapper>
      <S.Search type="search" placeholder="Procurar..." />
      <ul style={{ width: "100%" }}>
        <li>
          <S.CoinSymbolHeader htmlFor="Symbol">
            <S.Checkbox checked={isChecked} />
            Symbol
          </S.CoinSymbolHeader>
        </li>
        <li>
          <S.CoinSymbol isChecked={isChecked} htmlFor="ETHBTC">
            <S.Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            ETHBTC
          </S.CoinSymbol>
        </li>
      </ul>
      <S.Button value="Adicionar a lista" />
    </S.Wrapper>
  );
};

export default Symbols;
