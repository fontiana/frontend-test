import React from 'react';
import './App.css';
import SelectStreams from './components/SelectStreams';
import ViewLists from './components/ViewLists';
import { AppProvider } from './contexts/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className='app'>
        <SelectStreams />
        <ViewLists />
      </div>
    </AppProvider>
  );
};

export default App;
