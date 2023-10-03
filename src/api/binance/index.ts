import Api from "../httpConfig";

export const getSymbols = async () => {
  try {
    const { data } = await Api.get("/exchangeInfo");

    return data;
  } catch (error) {
    return error;
  }
};
