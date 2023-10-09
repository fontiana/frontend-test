import React, { useState, useEffect } from "react";
import "./styles.css";
import { useAppContext } from "../../contexts/AppContext";

const SearchList: React.FC = () => {
  const {
    symbols,
    setSymbols,
    streamLists,
    setStreamLists,
    selectedStreamList
  } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSymbols, setFilteredSymbols] = useState(symbols);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  const fetchSymbols = async () => {
    try {
      const response = await fetch(
        "https://api.binance.com/api/v3/exchangeInfo"
      );
      const data = await response.json();
      
      var symbolList = data.symbols.map((symbol: any) => symbol.symbol);
      setSymbols([].concat(...symbolList));
      setFilteredSymbols([].concat(...symbolList));
    } catch (error) {
      console.error("Erro ao buscar símbolos:", error);
    }
  };

  useEffect(() => {
    try {
      fetchSymbols();
    } catch (error) {
      console.error("Erro ao buscar símbolos:", error);
    }
  }, []);

  const handleSearch = (term: string) => {
    const filtered = symbols.filter((symbol) =>
      symbol.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSymbols(filtered);
    setSearchTerm(term);
  };

  const handleCheckboxChange = (symbol: string) => {
    const inputLabelStreamId: string = "label-" + symbol + "-checkbox";
    const inputStreamId: string = symbol + "-checkbox";
    const inputLabelStream = document.getElementById(
      inputLabelStreamId
    ) as HTMLElement;
    const inputStreamCheckbox = document.getElementById(
      inputStreamId
    ) as HTMLInputElement;

    inputLabelStream.style.backgroundColor = inputStreamCheckbox.checked
      ? "rgba(12, 196, 220, 0.1)"
      : "#FFFFFF";

    updateSelectedSymbols(symbol, inputStreamCheckbox.checked);
  };

  const updateSelectedSymbols = (
    symbolStream: string,
    streamChecked: boolean
  ) => {
    const updatedSelectedSymbols = [...selectedSymbols]; // Use spread operator para criar uma cópia do array

  const symbol = filteredSymbols.find(symbol => symbol === symbolStream);

  if (symbol !== undefined) {
    const symbolLower = symbol.toLowerCase();

    if (streamChecked && !updatedSelectedSymbols.includes(symbolLower)) {
      updatedSelectedSymbols.push(symbolLower);
    } else if (!streamChecked && updatedSelectedSymbols.includes(symbolLower)) {
      const indexToRemove = updatedSelectedSymbols.indexOf(symbolLower);
      updatedSelectedSymbols.splice(indexToRemove, 1); // Remove o símbolo do array
    }
  }

  setSelectedSymbols(updatedSelectedSymbols);
  };

  const handleAddStream = () => {
    const index = streamLists.findIndex(
      (streamList) => streamList.name === selectedStreamList
    );

    const updatedStreamLists = [...streamLists];

    if (index !== -1) {
      var updatedStreamList = updatedStreamLists[index];

      selectedSymbols.forEach((symbol) => {
        if (!updatedStreamList.symbols.includes(symbol)) {
          updatedStreamList.symbols.push(symbol);
        }
      })

      updatedStreamLists[index] = updatedStreamList;
      setStreamLists(updatedStreamLists);
    }
  };

  return (
    <div className="select-symbols-container">
      <div className="select-symbols-top-container">
        <div className="search-container">
          <input
            className="input-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
          <button
            className="search-button"
            onClick={(e) => handleSearch(searchTerm)}
          ></button>
        </div>
        <ul className="stream-list-to-select">
          <div className="stream-list-to-select-header">
            <span className="stream-list-to-select-header-title">Symbol</span>
          </div>
          {filteredSymbols.map((symbol) => (
            <li className="stream-item" key={symbol}>
              <label
                id={"label-" + symbol + "-checkbox"}
                className="label-stream"
              >
                {symbol}
                <input
                  id={symbol + "-checkbox"}
                  className="input-stream-checkbox"
                  type="checkbox"
                  onChange={() => handleCheckboxChange(symbol)}
                />
                <span className="checkmark"></span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button className="add-symbols-to-list-button" onClick={handleAddStream}>
        Add to List
      </button>
    </div>
  );
};

export default SearchList;
