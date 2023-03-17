import * as React from 'react';

import axios from 'axios';
import { FavContext, IFavContextGlobal } from '../../context/FavContext';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { Box, IconButton, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';



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
  let arraysSymbolsFav: string[] = [];


  function isSymbol(obj: unknown): obj is ISymbol {
    if (obj && typeof obj === 'object' && 'data' in obj) {
      console.log('true');
      return true;
    } else {
      console.log('false');
      return false;
    }
  }

  function handleAddFavCoin(symbol: string) {
    if(fav.favCoins.includes(symbol)){
    fav.setFavCoins(current => [...current.filter(oldFav => oldFav !== symbol)])
    }
     else{
      fav.setFavCoins([...fav.favCoins, symbol])
    }
    setTimeout(() =>{
      console.log(fav.favCoins)
    }, 1000)
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
        console.log('oi');
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
              md: 'calc(100% - 240px)',
              lg: '100%',
              xl: '100%',
            },
            width: {
              xs: '80vw',
              sm: '50vw',
              md: 'calc(100% - 240px)',
              lg: '100%',
              xl: '100%',
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
              {symbols.map((item) => {
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
                        { fav.favCoins.includes(item.symbol) ?  <FavoriteIcon></FavoriteIcon>:<FavoriteBorderIcon></FavoriteBorderIcon>}
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
