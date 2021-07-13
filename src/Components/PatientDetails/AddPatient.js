import axios from "axios";
import AuthHeaders from "../API/AuthHeaders";
import apiURL from "../API/Config";
const AddPatient = async (data) => {
  let config = {
    method: "POST",
    url: apiURL + "patient",
    headers: AuthHeaders,
    data: data,
    json: true,
  };
  console.log(config);
  try {
    return axios(config)
      .then(
        (response) => {
          return response;
        }
        // console.log(response)
      )
      .catch((error) => console.error(error));
  } catch (error) {
    console.log(error);
  }
};

export { AddPatient };