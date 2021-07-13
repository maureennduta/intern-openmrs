import axios from "axios";
import AuthHeaders from "../API/AuthHeaders";
import apiURL from "../API/Config";

const PatientsData = (searchTerm) => {
  return axios
    .get(apiURL + `patient?q=${searchTerm}&v=default`,AuthHeaders)
    .then((res) => {
      return res.data.results;
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
export { PatientsData };