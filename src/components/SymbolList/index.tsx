import React, {useContext, useState} from 'react';
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

  const [searchValue, setSearchValue] = useState('');

  const filteredSymbols = symbols.filter(data =>
    data.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          value={searchValue}
          type="text"
          placeholder="Search"
          onChange={({target}) => setSearchValue(target.value)}
        />
        <SearchIconSpan>
          <FaSearch />
        </SearchIconSpan>
      </SearchContainer>
      <ListContainer>
        {filteredSymbols.map(data => (
          <SymbolElement key={data.name} symbol={data.name} />
        ))}
      </ListContainer>
    </Container>
  );
}
