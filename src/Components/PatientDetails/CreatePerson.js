import React, {  useState } from "react";
import "./scss/CreatePerson.scss";
import {
  Form,
  TextInput,
  Select,
  SelectItem,
  DatePicker,
  DatePickerInput,
  Button,
} from "carbon-components-react";
import { useHistory } from "react-router-dom";
import { AddPerson } from "./AddPerson";

function CreatePerson(){
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const history = useHistory();
  const handleChange = (date) => {
    let selectedDate = new Date(date).toLocaleDateString("fr-CA");
    setBirthDate(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      names: [{ givenName: `${givenName}`, familyName: `${familyName}` }],
      gender: `${gender}`,
      birthdate: `${birthDate}`,
      addresses: [
        { address1: "", cityVillage: "", country: "Kenya", postalCode: "" },
      ],
    });
    
    AddPerson(data).then((resp) => {
      history.push({
        pathname: "/CreatePatient",
        id:resp.data.uuid,
        state:resp.data,
      });
    });
    
  };

  return ( 
    <>
      <div className="bx--grid--full-width">
        <Form onSubmit={handleSubmit} data-testid="form">
          <div className="bx--row">
            <div className="bx--col"></div>
            <div className="bx--col" id="patientform">
              <h2>Create a New Patient</h2>
              <br/>
              <h6>Person Form</h6>
              <hr />

              <div id="patientinputs">
                <TextInput
                  id="gname"
                  data-testid="gname"
                  labelText="GivenName: "
                  invalidText="Invalid error message."
                  placeholder="Enter given name"
                  required
                  onChange={(e) => setGivenName(e.target.value)}
                />
              </div>

              <div id="patientinputs">
                <TextInput
                  id="fname"
                  data-testid="fname"
                  labelText="FamilyName: "
                  invalidText="Invalid error message."
                  placeholder="Enter family name"
                  required
                  onChange={(e) => setFamilyName(e.target.value)}
                />
              </div>

              <div id="patientinputs">
                <DatePicker
                  data-testid="datepicker"
                  dateFormat="d/m/Y"
                  datePickerType="single"
                  onChange={handleChange}
                >
                  <DatePickerInput
                    id="date-picker-calendar-id"
                    placeholder="mm/dd/yyyy"
                    labelText="Date of Birth: "
                    type="text"
                  />
                </DatePicker>
              </div>

              <div id="patientinputs">
                <Select
                  data-testid="gender"
                  defaultValue="placeholder-item"
                  id="select"
                  invalidText="This is an invalid error message."
                  labelText="Gender: "
                  onChange={(e) => setGender(e.target.value)}
                >
                  <SelectItem text="Female" value="F" />
                  <SelectItem text="Male" value="M" />
                  <SelectItem text="Other" value="O" />
                </Select>
              </div> 
              <div className="bx--row">
                <div className="bx--col" id="patientinputs">
                  <Button size="default" kind="secondary" type="submit" data-testid="btnSubmit">
                    Create Person
                  </Button>
                </div>
                
              </div>
            </div>
            <div className="bx--col"></div>
          </div>
        </Form>
      </div>
    </>
  );
};
export default CreatePerson;