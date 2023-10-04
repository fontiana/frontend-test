import MockAdapter from "axios-mock-adapter";
import { cleanup } from "@testing-library/react";
import Api from "../httpConfig";
import { getSymbols } from ".";
import { AxiosError } from "axios";

describe("getSymbols()", () => {
  const mock = new MockAdapter(Api, { onNoMatch: "throwException" });

  beforeAll(() => {
    mock.reset();
  });

  afterEach(cleanup);

  it("should fetch symbols successfully", async () => {
    const mockSymbols = [{ symbol: "BTCUSDT" }, { symbol: "ETHUSDT" }];

    mock.onGet("/exchangeInfo").reply(200, { symbols: mockSymbols });

    const response = await getSymbols();

    expect(response).toEqual(mockSymbols);
  });

  it("should handle errors gracefully", async () => {
    mock.onGet("/exchangeInfo").reply(500);

    const response = await getSymbols();

    expect(response).toBeInstanceOf(AxiosError);
  });
});
