import React from 'react';

export const FavContext = React.createContext({} as IFavContextGlobal) ;
interface IFavStorage{
  children: React.ReactNode
}
interface ISymbolObj {
  symbol: string,
  price?: string
}
export interface IFavContextGlobal {
  setFavCoins: React.Dispatch<React.SetStateAction<ISymbolObj[]>>;
  favCoins : ISymbolObj[]
}

export const FavStorage:React.FC<IFavStorage> = ({children}) => {
  const [favCoins, setFavCoins] = React.useState<ISymbolObj[]>([])

  return <FavContext.Provider value={{favCoins, setFavCoins} as IFavContextGlobal}>{children}</FavContext.Provider>;
};
