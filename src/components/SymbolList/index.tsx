import React, {useContext} from 'react';
import {
  Container,
  ListContainer,
  SearchContainer,
  SearchIconSpan,
  SearchInput,
} from '../../assets/styles/SymbolList';

import {FaSearch} from 'react-icons/fa';
import SymbolElement from '../SymbolElement';
import {SymbolContext} from '../../contexts/SymbolContext';

export default function SymbolList() {
  const {symbols} = useContext(SymbolContext);

  return (
    <Container>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search" />
        <SearchIconSpan>
          <FaSearch />
        </SearchIconSpan>
      </SearchContainer>
      <ListContainer>
        {symbols.map(data => (
          <SymbolElement key={data.symbol} symbol={data.symbol} />
        ))}
      </ListContainer>
    </Container>
  );
}
