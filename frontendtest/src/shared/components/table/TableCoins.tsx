import * as React from 'react';

import axios from 'axios';
import { FavContext } from '../../context/FavContext';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';


import FavoriteIcon from '@mui/icons-material/Favorite';
import TableContainer from '@mui/material/TableContainer';
import { Box, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



interface ISymbol {
  data: {
    symbols: {
      symbol: string;
      status: string;
    }[];
  };
}
interface ISymbolName {
  symbol: string;
  statusSymbol: string;
}


const TableCoins = () => {
  const [symbols, setSymbols] = React.useState<ISymbolName[] | undefined>();
  const fav = React.useContext(FavContext)


  function isSymbol(obj: unknown): obj is ISymbol {
    if (obj && typeof obj === 'object' && 'data' in obj) {
      return true;
    } else {
      return false;
    }
  }

  function handleAddFavCoin(symbolParameter: string) {
    const symbolIndex =  fav.favCoins.findIndex(symbolItem => symbolItem.symbol === symbolParameter)
    if(symbolIndex >= 0){
    fav.setFavCoins(current => [...current.filter(oldFav => oldFav.symbol !== symbolParameter)])
    }
     else{
      fav.setFavCoins(fav.favCoins.concat({symbol:symbolParameter}))
    }
  }

  React.useEffect(() => {
    axios
      .get('https://data.binance.com/api/v3/exchangeInfo')
      .then((dataSymbols) => {
        const symbolsReponse: ISymbol = dataSymbols;

        if (isSymbol(symbolsReponse)) {
          setSymbols(
            symbolsReponse.data.symbols.map((symbolItem) => {
              return {
                symbol: symbolItem.symbol,
                statusSymbol: symbolItem.status,
              };
            }),
          );
        }
      });
  }, []);

  if (symbols)
    return (
      <Box display={'flex'} justifyContent={'start'}>
        <TableContainer
          component={Paper}
          sx={{
            overflowX: 'auto',
            overflowY: 'auto',
            height: {
              xs: '50vh',
              sm: '50vh',
              md: '50vh',
              lg: '100%',
              xl: '100%',
            },
            width: {
              xs: '80vw',
              sm: '50vw',
              md: '50vw',
              lg: '50vw',
              xl: '50vw',
            },
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={'800'}>Symbol</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontWeight={'800'}>Favorite</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {symbols.map((item, index) => {
                if(index < 100)
                return (
                  <TableRow
                    key={item.symbol}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>{item.symbol}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleAddFavCoin(item.symbol)}>
                        { fav.favCoins.findIndex(symbolItemIndex => symbolItemIndex.symbol === item.symbol ) >= 0 ?  <FavoriteIcon></FavoriteIcon>:<FavoriteBorderIcon></FavoriteBorderIcon>}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  else {
    return <p>Loading</p>;
  }
};

export default TableCoins;
