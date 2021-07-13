import axios from "axios";
import AuthHeaders from "../API/AuthHeaders";
import apiURL from "../API/Config";

const AddPerson = async (data) => {
  let config = {
    method: "POST",
    url: apiURL + "person",
    headers: AuthHeaders,
    data: data,
    json: true,
    
  };
console.log(config);
  try {   
    return axios(config)
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export { AddPerson };
