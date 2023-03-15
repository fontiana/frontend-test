# Get Started

Criar uma aplicação React que realiza uma conexão via websocket da Binance, para exibição de atualização de valores: 1. A aplicação deve chamar o endpoint de listagem de symbols e listá-los em uma tabela. URL da API para listagem: (GET) https://data.binance.com/api/v3/exchangeInfo 2. O usuário deve poder criar uma lista de symbols e adicionar symbols nessa lista para acompanhar as atualizações de Last Price, Best bid price, Best ask price e Price change percent. Para isso, a conexão com o websocket deve ser estabelecida conforme os itens adicionados nesta lista, e a atualização dos valores deve ocorrer em tempo real na tabela. URL do Websocket para atualizações dos valores (onde symbol é o symbol retornado pelo API de listagem em Lowercase): wss://data-stream.binance.com/stream?streams=<symbol>/<symbol>/<symbol> Exemplo de conexão: wss://data-stream.binance.com/stream?streams=ethbtc/bnbbtc

Websocket sample response:
```
{
  "e": "24hrTicker",  // Event type
  "E": 123456789,     // Event time
  "s": "BNBBTC",      // Symbol
  "p": "0.0015",      // Price change
  "P": "250.00",      // Price change percent
  "w": "0.0018",      // Weighted average price
  "x": "0.0009",      // First trade(F)-1 price (first trade before the 24hr rolling window)
  "c": "0.0025",      // Last price
  "Q": "10",          // Last quantity
  "b": "0.0024",      // Best bid price
  "B": "10",          // Best bid quantity
  "a": "0.0026",      // Best ask price
  "A": "100",         // Best ask quantity
  "o": "0.0010",      // Open price
  "h": "0.0025",      // High price
  "l": "0.0010",      // Low price
  "v": "10000",       // Total traded base asset volume
  "q": "18",          // Total traded quote asset volume
  "O": 0,             // Statistics open time
  "C": 86400000,      // Statistics close time
  "F": 0,             // First trade ID
  "L": 18150,         // Last trade Id
  "n": 18151          // Total number of trades
}
````

# Utils
  
Binance documentation:
- https://binance-docs.github.io/apidocs/spot/en/#introduction

UI Sample to use as a guide:
