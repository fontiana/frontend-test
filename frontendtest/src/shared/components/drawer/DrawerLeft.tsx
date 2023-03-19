import React from 'react';

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

import {useNavigate } from 'react-router-dom';


import MenuIcon from '@mui/icons-material/Menu';
import DarkMode from '@mui/icons-material/DarkMode';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

import useMediaQuery from '@mui/material/useMediaQuery';
import ClickAwayListener from '@mui/material/ClickAwayListener';
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
interface IDrawerLeft {
  children: React.ReactNode
  pageName: string
}
const DrawerLeft: React.FC<IDrawerLeft> = ({children, pageName}) => {
  
  const theme = useTheme();
  const [light, setLight] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate()
  
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerWidth = mobile && isDrawerOpen === false ? 0 : 240;

  const toggleDrawerOpen = React.useCallback(() => {
    setDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
}, []);
    function closeDrawer() {
      setDrawerOpen((prev) => (prev ? !prev : prev));
    }

    function handleNavigateHome(){
      navigate('/home')
    }
    function handleNavigateFavorite(){
      navigate('/favorites')
    }
    const toggleTheme = React.useCallback(() => {
      setLight(light => !light)
    },[])

    
  return (
    <>
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
                {pageName}
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
                <ListItemButton onClick={handleNavigateHome}>
                  <ListItemIcon>
                    <ListAltIcon color="primary"></ListAltIcon>
                  </ListItemIcon>
                  <ListItemText primary={'Coin List'} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={handleNavigateFavorite}>
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
                    onChange={toggleTheme}
                    checked={light === false}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </Drawer>
          <Box sx={{ p: 3 }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default DrawerLeft;
