import React, {useContext} from 'react';
import {Container, SymbolText} from '../../assets/styles/SymbolElement';
import {Checkbox} from 'antd';
import {SymbolContext} from '../../contexts/SymbolContext';

interface SymbolElementProps {
  symbol: string;
}

export default function SymbolElement({symbol}: SymbolElementProps) {
  const {handleSymbolCheck} = useContext(SymbolContext);

  const handleCheckboxChange = () => {
    handleSymbolCheck(symbol);
  };

  return (
    <Container>
      <Checkbox onChange={handleCheckboxChange}>
        <SymbolText>{symbol}</SymbolText>
      </Checkbox>
    </Container>
  );
}
