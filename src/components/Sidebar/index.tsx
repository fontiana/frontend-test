import React from 'react';

import SymbolList from '../SymbolList';
import AddToListButton from '../AddToListButton';
import {Container} from '../../assets/styles/Sidebar';

export default function SideBar() {
  return (
    <Container>
      <SymbolList />
      <AddToListButton content="Add to list" />
    </Container>
  );
}
