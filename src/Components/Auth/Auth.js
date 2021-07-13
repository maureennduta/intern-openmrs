import axios from "axios";
import apiURL from "../API/Config";

export const LoginUser = (credentials) => {
  return axios
    .get(apiURL + "/session/", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Basic ${credentials}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
