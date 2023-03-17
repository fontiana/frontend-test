import React from 'react';

import axios from 'axios';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Switch,
  useTheme,
  createTheme,
  ThemeProvider,
  ButtonBase,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DarkMode from '@mui/icons-material/DarkMode';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

import useMediaQuery from '@mui/material/useMediaQuery';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import TableCoins from '../../shared/components/table/TableCoins';
import DrawerLeft from '../../shared/components/drawer/DrawerLeft';


const Home = () => {
  

  // let ws = new WebSocket(
  //   'wss://data-stream.binance.com/stream?streams=ethbusd@kline_1m',
  // );
  // let ws = new WebSocket(
  //   'wss://data-stream.binance.com/stream?streams=ethbusd@trade',
  // );
  // let ws = new WebSocket('wss://data-stream.binance.com:9443/ws/etheur@trade')

  // ws.onmessage = (event) => {
  //   let parseData = JSON.parse(event.data);
  // };


  return (
    <DrawerLeft pageName='Tabela'>
          <TableCoins />
    </DrawerLeft>
  );
};

export default Home;
