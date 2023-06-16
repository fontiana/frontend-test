import { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from '@mui/material';

import * as S from './styled';

const List = (lastJsonMessage: any) => {
  const [inputValue, setInputValue] = useState('');
  const [listName] = useState('List A');
  const [list, setList] = useState([{listName}]);
  const [array, setArray] = useState<any[]>([]);

  const createList = () => {
    if (!inputValue){
      setInputValue('');
      setList([
        ...list,
        {listName: inputValue}
      ])
    }
  };

  const handleListChange = (e: any) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    const handleSymbolChange = () => {
      if (array.length === 0) {
        if (lastJsonMessage.data !== undefined) {
          setArray([lastJsonMessage.data])
        }
      } else {
        const filtered = array.some((data) =>  { 
          return data?.s.includes(lastJsonMessage.data?.s)
        })
  
        if (filtered) {
          const updateItem = array.findIndex((item) => item.s === lastJsonMessage.data.s);
          const newArray = array;
          array[updateItem] = lastJsonMessage.data;
          setArray(newArray);
        } else {
          setArray([...array, lastJsonMessage.data])
        }
      }
    }

    if (!lastJsonMessage.data) {
      return
    }
    handleSymbolChange();
  }, [lastJsonMessage.data, array]);

    return (
      <>
        <S.ListWrapper>
          <S.ListDropdownWrapper>
            <S.ListInput onChange={handleListChange} value={inputValue} type="text" placeholder='List name' />
            <S.ListSelect >
              {list.map((data: any) => (
                <S.ListOption key={data.listName} value={data.listName}>
                  {data.listName}
                </S.ListOption>
              ))}
            </S.ListSelect>
            <S.ListButton type="submit" onClick={() => createList()}>
              +
            </S.ListButton>
          </S.ListDropdownWrapper>
          <TableContainer component={Paper}>
            <Table aria-label="exchange info table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Symbol</TableCell>
                  <TableCell align="left">Last Price</TableCell> 
                  <TableCell align="left">Bid Price</TableCell>
                  <TableCell align="left">Ask Price</TableCell>
                  <TableCell align="left">Price Change (%)</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {lastJsonMessage ? (
                    <>
                      {array.map((exchangeData: any) => 
                        <TableRow key={exchangeData.s}>
                          <TableCell align="left">{exchangeData.s}</TableCell>
                          <TableCell align="left">{exchangeData.c}</TableCell>
                          <TableCell align="left">{exchangeData.b}</TableCell>
                          <TableCell align="left">{exchangeData.a}</TableCell>
                          <TableCell align="left">{exchangeData.P}</TableCell>
                        </TableRow>
                      )}
                    </>
                    ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </S.ListWrapper>
      </>
    );
  };

export default List;