import React from 'react';

import './assets/styles/Global/index.css';
import Home from './pages/Home';
import {SymbolContextProvider} from './contexts/SymbolContext';

function App() {
  return (
    <SymbolContextProvider>
      <Home />
    </SymbolContextProvider>
  );
}

export default App;
