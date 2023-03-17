import React from 'react';

export const FavContext = React.createContext({} as IFavContextGlobal) ;
interface IFavStorage{
  children: React.ReactNode
}
export interface IFavContextGlobal {
  setFavCoins: React.Dispatch<React.SetStateAction<string[]>>;
  favCoins : string[]
}

export const FavStorage:React.FC<IFavStorage> = ({children}) => {
  const [favCoins, setFavCoins] = React.useState<string[]>([])

  return <FavContext.Provider value={{favCoins, setFavCoins} as IFavContextGlobal}>{children}</FavContext.Provider>;
};
