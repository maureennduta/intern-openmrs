import React, { useEffect, useState } from "react";
import "./scss/CreatePatient.scss";
import {
  Form,
  TextInput,
  Select,
  SelectItem,
  DatePicker,
  DatePickerInput,
  Button,
  Row,
} from "carbon-components-react";
import { useLocation, useHistory } from "react-router-dom";
import { AddPatient } from "./AddPatient";
import { IdentifierType } from "./IdentifierType";
import { LocationName } from "./Location";
const moment = require("moment");

const CreatePatient = () => {
  const [person, setPerson] = useState([]);
  const [personId, setPersonId] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [identifierType, setIdentifierType] = useState("");
  const [area, setLocation] = useState("");
  const [identifierResults, setIdentifierResults] = useState([]);
  const [locationResults, setLocationResults] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setPerson([location.state]);
    setPersonId(location.id);

    //fetch identifiertypes
    IdentifierType().then((resp) => {
      const results = resp.map((identifier) => {
        return {
          id: identifier.uuid,
          value: identifier.display,
        };
      });
      setIdentifierResults(results);
    });

    //fetch locations
    LocationName().then((resp) => {
      const results = resp.map((identifier) => {
        return {
          id: identifier.uuid,
          value: identifier.display,
        };
      });
      setLocationResults(results);
    });
  }, [location.id, location.state]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      person: personId,
      identifiers: [
        {
          identifier: `${identifier}`,
          identifierType: `${identifierType}`,
          location: `${area}`,
          preferred: true,
        },
      ]
    });

    // console.log(data);
    AddPatient(data)
    .then((resp) => {
      // console.log(resp.data);
      history.push({
        pathname: "/PatientsRecords",
      });
    });
  };
  return (
    <>
      <div className="bx--grid--full-width">
        <Form onSubmit={handleSubmit}>
          {person.map((item) => (
            <Row>
              <div className="bx--col-lg-3"></div>
              <div className="bx--col-lg-10" id="patientform">
                <h2>Create a New Patient</h2>
                <hr />
                <Row>
                  <div className="bx--col" id="patientinputs">
                    <TextInput
                      labelText="GivenName: "
                      invalidText="Invalid error message."
                      placeholder="Enter given name"
                      value={item.display}
                      readOnly
                    />
                  </div>
                  <div className="bx--col" id="patientinputs">
                    <TextInput
                      labelText="MiddleName: "
                      placeholder=""
                      value=""
                      readOnly
                    />
                  </div>
                  <div className="bx--col" id="patientinputs">
                    <TextInput
                      labelText="FamilyName: "
                      placeholder=""
                      readOnly
                    />
                  </div>
                </Row>

                <Row>
                  <div className="bx--col" id="patientinputs">
                    <Select
                      id="select"
                      invalidText="This is an invalid error message."
                      labelText="Gender: "
                      defaultValue={item.gender}
                    >
                      <SelectItem text="Female" value="F" />
                      <SelectItem text="Male" value="M" />
                      <SelectItem text="Other" value="O" />
                    </Select>
                  </div>
                  <div className="bx--col" id="patientinputs">
                    <TextInput
                      labelText="Age: "
                      invalidText="Invalid error message."
                      placeholder="Enter age"
                      value={item.age}
                    />
                  </div>
                  <div className="bx--col" id="patientinputs">
                    <DatePicker
                      dateFormat="d/m/Y"
                      datePickerType="single"
                      value={moment(item.birthdate).format("DD/MM/YYYY")}
                    >
                      <DatePickerInput
                        id="date-picker-calendar-id"
                        placeholder="mm/dd/yyyy"
                        labelText="Date of Birth: "
                        type="text"
                      /> 
                    </DatePicker>
                  </div>
                </Row>

                <Row>
                  <div className="bx--col" id="patientinputs">
                    <TextInput
                      labelText="Identifier: "
                      invalidText="Invalid error message."
                      placeholder="Enter identifier"
                      required
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                  </div>
                  <div className="bx--col" id="patientinputs">
                    <Select
                      labelText="IdentifierType: "
                      required
                      value={identifierType}
                      onChange={(e) => setIdentifierType(e.target.value)}
                    >
                      {identifierResults.map((item,index) => (
                        // console.log(item.value),
                        <SelectItem
                          text={item.value}
                          key={index}
                          value={item.id}
                        />
                      ))}
                    </Select>
                  </div>
                  <div className="bx--col" id="patientinputs">
                    <Select
                      labelText="Location: "
                      required
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      {locationResults.map((item) => (
                        <SelectItem
                          text={item.value}
                          key={item.id}
                          value={item.id}
                        />
                      ))}
                    </Select>
                  </div>
                </Row>
                <Row>
                  <div className="bx--col" id="patientinputs">
                    <TextInput labelText="Address: " readOnly />
                  </div>

                  <div className="bx--col" id="patientinputs">
                    <TextInput labelText="Town/Village: " readOnly />
                  </div>
                  <div className="bx--col" id="patientinputs">
                    <TextInput labelText="Postalcode: " readOnly />
                  </div>
                </Row>
                <Row>
                  <div className="bx--col" id="patientinputs">
                    <TextInput labelText="County: " readOnly />
                  </div>

                  <div className="bx--col" id="patientinputs">
                    <TextInput
                      labelText="Country: "
                      readOnly
                      value={item.country}
                    />
                  </div>
                </Row>

                <div id="patientinputs">
                  <Button size="default" kind="secondary" type="submit">
                    Create Patient
                  </Button>
                </div>
              </div>
              <div className="bx--col-lg-3"></div>
            </Row>
          ))}
        </Form>
      </div>
    </>
  );
};
export default CreatePatient;

