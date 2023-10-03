import React, {useContext} from 'react';
import {StyledButton} from '../../assets/styles/AddToListButton';
import {SymbolContext} from '../../contexts/SymbolContext';

interface ButtonProps {
  content: string;
}

export default function AddToListButton({content}: ButtonProps) {
  const {addCheckedSymbolsToList} = useContext(SymbolContext);
  return (
    <StyledButton onClick={addCheckedSymbolsToList}>{content}</StyledButton>
  );
}
