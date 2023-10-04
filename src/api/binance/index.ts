import Api from "../httpConfig";

export const getSymbols = async () => {
  try {
    const { data } = await Api.get("/exchangeInfo");

    return data.symbols;
  } catch (error) {
    return error;
  }
};
