import React, {useContext} from 'react';
import {Container, SymbolText} from '../../assets/styles/SymbolElement';
import {Checkbox} from 'antd';
import {SymbolContext} from '../../contexts/SymbolContext';

interface SymbolElementProps {
  symbol: string;
  checked: boolean;
}

export default function SymbolElement({symbol, checked}: SymbolElementProps) {
  const {handleSymbolCheck} = useContext(SymbolContext);

  const handleCheckboxChange = () => {
    handleSymbolCheck(symbol);
  };

  return (
    <Container>
      <Checkbox onChange={handleCheckboxChange} checked={checked}>
        <SymbolText>{symbol}</SymbolText>
      </Checkbox>
    </Container>
  );
}
