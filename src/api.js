import axios from "axios";

export const fetchProductList = async () => {
  const { data } = await axios.get("http://127.0.0.1:4000/product");

  return data;
};
