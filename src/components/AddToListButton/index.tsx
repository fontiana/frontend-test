import React from 'react';
import {StyledButton} from '../../assets/styles/AddToListButton';

interface ButtonProps {
  content: string;
}

export default function AddToListButton({content}: ButtonProps) {
  return <StyledButton>{content}</StyledButton>;
}
