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

const themeLight = createTheme({
  palette: {
    mode: 'light',
    secondary: {
      main: '#474140',
    },
    background: {
      default: '#fff',
      paper: '#4fc3f7',
    },
    text: {
      primary: '#000',
    },
  },
});

const themeDark = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#e3f2fd',
    },
    background: {
      default: '#222222',
      paper: '#332E33',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const Home = () => {
  const theme = useTheme();
  const [light, setLight] = React.useState(true);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  // let ws = new WebSocket(
  //   'wss://data-stream.binance.com/stream?streams=ethbusd@kline_1m',
  // );
  let ws = new WebSocket(
    'wss://data-stream.binance.com/stream?streams=ethbusd@trade',
  );
  // let ws = new WebSocket('wss://data-stream.binance.com:9443/ws/etheur@trade')

  ws.onmessage = (event) => {
    // console.log('1oi')
    let parseData = JSON.parse(event.data);
    // console.log(parseData.data);
    // console.log(event.data)
  };
  const drawerWidth = mobile && isDrawerOpen === false ? 0 : 240;

  React.useEffect(() => {
    axios.get('https://data.binance.com/api/v3/exchangeInfo').then((data) => {
      console.log(data);
    });
  }, []);

  function toggleDrawerOpen() {
    setDrawerOpen((prev) => !prev);
  }
  function closeDrawer() {
    setDrawerOpen((prev) => (prev ? !prev : prev));
  }
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <Box sx={{ display: 'flex', bgcolor: '' }}>
        <CssBaseline />
        <AppBar
          sx={{
            width: mobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar sx={{ bgcolor: 'background.paper' }}>
            <Box mr={2}>
              <ButtonBase onClick={toggleDrawerOpen}>
                <MenuIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
              </ButtonBase>
            </Box>
            <Typography
              variant="h6"
              color={'secondary'}
              noWrap
              // component="div"
            >
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant={mobile ? 'temporary' : 'permanent'}
          anchor="left"
          open={isDrawerOpen}
          onClose={closeDrawer}
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ListAltIcon color="primary"></ListAltIcon>
                </ListItemIcon>
                <ListItemText primary={'Coin List'} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CurrencyBitcoinIcon color="primary"></CurrencyBitcoinIcon>
                </ListItemIcon>
                <ListItemText primary={'Track Coins'} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DarkMode color="primary"></DarkMode>
                </ListItemIcon>
                <Switch
                  onChange={() => setLight((prev) => !prev)}
                  checked={light === false}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <Box sx={{ p: 3 }}>
          <Toolbar />
          <TableCoins />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
