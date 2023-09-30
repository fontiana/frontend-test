import React from 'react';
import {
  Container,
  ListContainer,
  SearchContainer,
  SearchIconSpan,
  SearchInput,
} from '../../assets/styles/SymbolList';

import {FaSearch} from 'react-icons/fa';
import SymbolElement from '../SymbolElement';

const data: string[] = Array.from(
  {length: 50},
  (_, index) => `BBBSDH2${index + 1}`,
);

export default function SymbolList() {
  return (
    <Container>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search" />
        <SearchIconSpan>
          <FaSearch />
        </SearchIconSpan>
      </SearchContainer>
      <ListContainer>
        {data.map((item, index) => (
          <SymbolElement key={index} symbol={item} />
        ))}
      </ListContainer>
    </Container>
  );
}
