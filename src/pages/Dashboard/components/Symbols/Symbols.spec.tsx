import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Symbols from ".";
import { ACTION_TYPE } from "../../context/useExchangeInfo/actions";
import Api from "../../../../api/httpConfig";
import MockAdapter from "axios-mock-adapter";
import { PAGES } from "../../../../utils/pages";
import { useExchangeInfo } from "../../context/useExchangeInfo";
const mockApi = new MockAdapter(Api, { onNoMatch: "throwException" });

jest.mock("../../context/useExchangeInfo");

const mock = jest.fn();
const mockSymbols = [{ symbol: "BTCUSDT" }, { symbol: "ETHUSDT" }];

describe("<Symbols />", () => {
  const setup = async (status: number) => {
    mockApi.onGet("/exchangeInfo").reply(status, { symbols: mockSymbols });

    await act(async () => {
      render(<Symbols />);
    });
  };

  beforeEach(() => {
    mockApi.reset();
    (useExchangeInfo as jest.Mock).mockImplementation(() => ({
      exchanges: {
        currentList: "Top List",
        lists: {
          "Top List": {},
        },
      },
      dispatchExchanges: mock,
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Should show component loading", async () => {
    await setup(500);

    expect(screen.findByText("Loading symbols..")).toBeTruthy();
  });

  it("Should show component Error", async () => {
    await setup(500);

    expect(
      screen.getByText("Error: The symbols could not be found")
    ).toBeInTheDocument();
  });

  it("Should show component with symbols", async () => {
    await setup(200);

    mockSymbols.forEach((symbol) => {
      const symbolText = screen.getByText(symbol.symbol);
      expect(symbolText).toBeInTheDocument();
    });
  });

  it("Should submit symbols form correctly and call alert", async () => {
    (useExchangeInfo as jest.Mock).mockImplementation(() => ({
      exchanges: {
        currentList: "",
        lists: {
          "Top List": {},
        },
      },
      dispatchExchanges: mock,
    }));

    const mockAlert = jest.fn();
    window.alert = mockAlert;

    await setup(200);

    mockSymbols.forEach(({ symbol }) => {
      fireEvent.click(screen.getByText(symbol));
    });

    fireEvent.click(screen.getByText("Add to List"));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("Please select a list");
    });
  });

  it("Should submit symbols form correctly and useExchangeInfopdate reducer", async () => {
    await setup(200);

    await act(async () => {
      mockSymbols.forEach(({ symbol }) => {
        fireEvent.click(screen.getByText(symbol));
      });

      fireEvent.click(screen.getByText("Add to List"));
    });

    await waitFor(() => {
      expect(mock).toHaveBeenCalledWith({
        type: ACTION_TYPE.ADD_TO_LIST,
        payload: ["BTCUSDT", "ETHUSDT"],
      });
    });
  });

  it("should select all checkbox when clicked on checkbox select all", async () => {
    await setup(200);

    await act(async () => {
      fireEvent.click(
        screen.getByTestId(`${PAGES.DASHBOARD}__input-checkbox--symbol`)
      );

      fireEvent.click(screen.getByText("Add to List"));
    });

    await waitFor(() => {
      expect(mock).toHaveBeenCalledWith({
        type: ACTION_TYPE.ADD_TO_LIST,
        payload: ["BTCUSDT", "ETHUSDT"],
      });
    });
  });

  it("should change list of symbol when was insert values on field search", async () => {
    await setup(200);

    const searchInput = screen.getByPlaceholderText("Search...");

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "ETHU" } });
      fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });
    });

    await waitFor(() => {
      expect(screen.queryByText(mockSymbols[0].symbol)).not.toBeInTheDocument();
    });
  });
});
