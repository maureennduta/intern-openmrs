import axios from "axios";
import AuthHeaders from "../API/AuthHeaders";
import apiURL from "../API/Config";

const LocationName =  () => {
  let config = {
    method: "GET",
    url: apiURL + "location?&v=custom:(uuid,display)",
  };

  try {
    return axios(config,AuthHeaders)
      .then((response) =>{return response.data.results})
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export { LocationName };