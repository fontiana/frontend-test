import React from "react";
import ListSymbol from "../ListSymbol/ListSymbol";
import Dashboard from "../Dashboard/Dashboard";
import { SymbolProvider } from "../../context/context";
import { HomeContainer, DataContainer } from "./styles";

const Home: React.FC = () => {
  return (
    <SymbolProvider>
      <HomeContainer>
        <DataContainer>
          <ListSymbol />
        </DataContainer>
        <DataContainer>
          <Dashboard />
        </DataContainer>
      </HomeContainer>
    </SymbolProvider>
  );
};

export default Home;
