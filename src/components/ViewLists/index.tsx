import React, { useEffect, useState } from "react";
import "./styles.css";
import { useAppContext } from "../../contexts/AppContext";
import { StreamList } from "../../types/StreamList";
import { Stream } from "../../types/Stream";
import useWebSocket from "react-use-websocket";

const ViewLists: React.FC = () => {
  const {
    streamLists,
    setStreamLists,
    selectedStreamList,
    setSelectedStreamList,
  } = useAppContext();
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    var streamList = streamLists.find(
      (streamList) => streamList.name === selectedStreamList
    );
    setStreams([]);
  }, [selectedStreamList]);

  const getStreams = () => {
    var streamList = streamLists.find(
      (streamList) => streamList.name === selectedStreamList
    );

    var streamListSymbols = streamList?.symbols.map((symbol) =>
      symbol.concat("@ticker")
    );

    return streamListSymbols?.join("/");
  };

  const handleMessage = (messageEvent: MessageEvent) => {
    const updateStream = JSON.parse(messageEvent.data);

    const index = streams.findIndex(
      (stream) => stream.s === updateStream.data.s
    );

    const updatedStreams = [...streams];

    if (index !== -1) {
      updatedStreams[index] = updateStream.data;
      setStreams(updatedStreams);
    } else {
      updatedStreams.push(updateStream.data);
      setStreams(updatedStreams);
    }

    getColorPriceChange(updateStream.data.s, updateStream.data.P);
  };

  const { sendJsonMessage } = useWebSocket(
    `wss://stream.binance.com/stream?streams=${getStreams()}`,
    {
      onOpen: () => console.log("Connected on Binance"),
      onError: (errorEvent) => console.error("WebSocket error:", errorEvent),
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 3000,
      onMessage: handleMessage,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedListName = e.target.value;
    const selectedList = streamLists.find(
      (list) => list.name === selectedListName
    );

    if (selectedList !== undefined) {
      setSelectedStreamList(selectedList.name);
    }
  };

  const handleCreateNewList = () => {
    const newListName = "List " + (streamLists.length + 1);
    const streamList: StreamList = { name: newListName, symbols: [] };

    setStreamLists([...streamLists, streamList]);
  };

  const getColorPriceChange = (symbol: string, priceChange: string) => {
    var streamPriceChange = document.getElementById(symbol + "-price-change");
    var value = parseFloat(priceChange);

    if (value === 0) {
      streamPriceChange?.classList.remove("negative");
      streamPriceChange?.classList.remove("positive");
    } else if (value < 0) {
      streamPriceChange?.classList.remove("positive");
      streamPriceChange?.classList.add("negative");
    } else {
      streamPriceChange?.classList.remove("negative");
      streamPriceChange?.classList.add("positive");
    }
  };

  return (
    <div className="view-lists-container">
      <div className="select-or-add-list-container">
        <select className="select-stream-list" onChange={handleChange}>
          {streamLists.map((list) => (
            <option key={list.name} value={list.name}>
              {list.name}
            </option>
          ))}
        </select>
        <button
          className="add-stream-list-button"
          onClick={handleCreateNewList}
        ></button>
      </div>
      <ul className="stream-list">
        <div className="stream-list-header">
          <span className="stream-list-header-item-title">Symbol</span>
          <span className="stream-list-header-item-title">Last Price</span>
          <span className="stream-list-header-item-title">Bid Price</span>
          <span className="stream-list-header-item-title">Ask Price</span>
          <span className="stream-list-header-item-title">
            Price Change (%)
          </span>
        </div>
        {streams.map((stream) => (
          <li className="stream-list-item" key={stream.s}>
            <span className="stream-list-item-value">{stream.s}</span>
            <span className="stream-list-item-value">{stream.c}</span>
            <span className="stream-list-item-value">{stream.b}</span>
            <span className="stream-list-item-value">{stream.a}</span>
            <div
              id={stream.s + "-price-change"}
              className="stream-list-item-price-change-container"
            >
              <span className="stream-list-item-price-change-value">
                {stream.P} %
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewLists;
