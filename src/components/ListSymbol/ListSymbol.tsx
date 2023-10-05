import React, { useState, useEffect} from 'react'
import { getExchangeInfo } from '../../services/websocket';

function ListSymbol() {
  const [symbols, setSymbols] = useState<any[]>([])

  const fetchSymbolData = () => {
    fetch("https://api.binance.com/api/v3/exchangeInfo")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data.symbols)
        setSymbols(data.symbols)
      })
      .catch(error =>
        console.log(error)
      )
  }

  useEffect(() => {
    fetchSymbolData()
  }, [])

  return (
    <>
      {symbols.length > 0 && (
        <div>
          {symbols.slice(0, 15).map(symbol => (
            <label key={symbol.symbol}>
              <input type="checkbox" />
              {symbol.symbol}
            </label>
          ))}
        </div>
      )}
    </>
  );
}

export default ListSymbol;
