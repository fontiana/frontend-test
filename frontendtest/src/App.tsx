import React from 'react';
import './App.css';
import Home from './Pages/home/Home';
import AppRoutes from './shared/routes';
import {FavStorage} from './shared/context/FavContext';
function App() {
  return (
    <>
      <FavStorage>
        <AppRoutes />
      </FavStorage>
    </>
  );
}

export default App;
