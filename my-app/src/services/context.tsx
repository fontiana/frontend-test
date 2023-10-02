import { ReactNode, createContext, useState } from "react";

export const BidContext = createContext<IBidData>({} as IBidData);

interface ITicker {
  stream: string;
  data: {
    c: string;
    b: string;
    a: string;
    P: string;
    s: string;
  };
}

interface IBidData {
 setBidData: React.Dispatch<React.SetStateAction<ITicker[] | undefined>>
  bidData?: ITicker[] 
}

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const [bidData, setBidData] = useState<ITicker[]>();

  const objectData = {
    bidData,
    setBidData,
  };

  return (
    <BidContext.Provider value={objectData as IBidData}>{children}</BidContext.Provider>
  );
};
