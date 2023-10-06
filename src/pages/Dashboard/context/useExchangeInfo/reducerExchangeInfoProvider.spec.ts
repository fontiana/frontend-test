import { reducer } from "./reducer";
import { ACTION_TYPE } from "./actions";

type ActionI = {
  type: ACTION_TYPE;
  payload: any;
};

const initialState = {
  currentList: "",
  lists: {},
};

describe("reducer() of ExchangeInfoProvider", () => {
  const setup = (action: ActionI) => reducer(initialState, action);

  it("Should add a new list", () => {
    const action = {
      type: ACTION_TYPE.ADD_NEW_LIST,
      payload: "Top List",
    };

    expect(setup(action)).toEqual({
      currentList: "Top List",
      lists: {
        "Top List": {},
      },
    });
  });

  it("Should alter the current list", () => {
    const action = {
      type: ACTION_TYPE.ALTER_CURRENT_LIST,
      payload: "Top List",
    };

    expect(setup(action).currentList).toBe("Top List");
  });

  it("Should add an item to the current list", () => {
    const action = {
      type: ACTION_TYPE.ADD_TO_LIST,
      payload: ["BTCUSDT", "ETHUSDT"],
    };

    expect(setup(action).lists).toEqual({
      [initialState.currentList]: {
        "0": "BTCUSDT",
        "1": "ETHUSDT",
      },
    });
  });
});
