import {
  SymbolsListContainer,
  SymbolsListTitle,
  SymbolsListContent,
  SymbolItem,
  SymbolItemText
} from './style.ts';

interface SymbolsListProps {
  symbols: string[];
}

export const SymbolsList: React.FC<SymbolsListProps> = ({ symbols }) => {
  console.log('SymbolsData', symbols);
  return (
    <SymbolsListContainer>
      <SymbolsListTitle>Symbols</SymbolsListTitle>
      <SymbolsListContent>
        { symbols.map((symbol, index) => (
          <SymbolItem key={ index }>
            <SymbolItemText>{ symbol }</SymbolItemText>
          </SymbolItem>
        )) }
      </SymbolsListContent>
    </SymbolsListContainer>
  );
}