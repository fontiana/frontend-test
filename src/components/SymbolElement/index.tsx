import React from 'react';
import {Container, SymbolText} from '../../assets/styles/SymbolElement';
import {Checkbox} from 'antd';

interface SymbolElementProps {
  symbol: string;
}

export default function SymbolElement({symbol}: SymbolElementProps) {
  return (
    <Container>
      <Checkbox>
        <SymbolText>{symbol}</SymbolText>
      </Checkbox>
    </Container>
  );
}
