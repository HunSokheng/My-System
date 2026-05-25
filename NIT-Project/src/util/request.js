import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";
export const request = (url = "", method = "", data = {}) => {
  return axios({
    method: method, // GET, GET, POST, PUT, DELETE
    url: BASE_URL + url, // http://localhost:8080/api/products
    data: data, // optional, {} or { name: "iPhone", price: 999 }
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Request error:", error);
      return { success: false, message: error.message };
    });
};