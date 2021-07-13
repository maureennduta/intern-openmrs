import axios from "axios";
import AuthHeaders from "../API/AuthHeaders";
import apiURL from "../API/Config";

const PatientEncounters = async (id) => {
  try {
    const res = await axios.get(
      apiURL +
        `/encounter?patient=${id}&v=custom:(uuid,display,encounterDatetime,location)`,
      AuthHeaders
    );
    return res.data.results;
  } catch (error) {
    return console.log(error);
  }
};
export { PatientEncounters };
