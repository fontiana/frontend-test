import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import axios from 'axios';
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const TableCoins = () => {

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  // const drawerWidth = isDrawerOpen === false ? 0 : 240;


  React.useEffect(() => {
    axios.get('https://data.binance.com/api/v3/exchangeInfo').then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <Box display={'flex'} justifyContent={'start'}>
      <TableContainer
        component={Paper}
        sx={{
          overflowX: 'auto',
          // marginRight: 'auto',
          // marginLeft: 'auto',
          width: {
            xs: '80vw',
            sm: '50vw',
            md: 'calc(100% - 240px)',
            lg: '100%',
            xl: '100%',
          },
        }}
      >
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableCoins;
