import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Search,
  Button,
} from "carbon-components-react";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import PagePagination from "../Pagination/Pagination";
import { PatientsData } from "../PatientsData/PatientsData";
import "../PatientsRecords/PatientsRecords.scss";
const headers = [
  { header: "UUId", key: "identifier" },
  { header: "Name", key: "name" },
  { header: "Age", key: "age" },
  { header: "Birthdate", key: "dob" },
  { header: " Gender", key: "gender" },
  { header: "Encounters", key: "encounters" },
];
const moment = require("moment");

const PatientsRecords = () => {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState([]);
  const [show, setShow] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    //e.preventDefault();
    if (e.target.value.match("^[a-zA-Z ]*$") != null) {
      setSearchTerm(e.target.value);
    }
    searchTerm.length >= 3 ? (
      PatientsData(searchTerm).then((resp) => {
        const results = resp.map((patient) => {
          return {
            id: patient.uuid,
            identifier: patient.person.uuid,
            name: patient.person.display,
            age: patient.person.age,
            gender: patient.person.gender,
            dob: moment(patient.person.birthdate).format("DD/MM/YYYY"),
            encounters: (
              <Link to={`/Encounters/${patient.uuid}`}>Encounters</Link>
            ),
          };
        });
        setRows(results);
      })
    ) : (
      <></>
    );
  };

  useEffect(() => {
    if (rows.length) {
      setShow(true);
    }
  }, [rows.length]);
  const load = () => {
    history.push("/PatientDetails");
  };

  return (
    <>
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-lg-2"></div>
          <div className="bx--col-lg-12" id="dt">
            <Button onClick={load} size="sm" kind="secondary">
              Add new 
            </Button>
            <Search
              id="search-1"
              labelText=" "
              placeHolderText="Search Patient"
              value={searchTerm}
              onChange={handleChange}
            />
            {show ? (
              <>
                <DataTable
                  id="dataTable"
                  rows={rows.slice(
                    firstRowIndex,
                    firstRowIndex + currentPageSize
                  )}
                  headers={headers}
                  isSortable
                  render={({ rows, headers, getHeaderProps }) => (
                    <TableContainer
                     title="Patient Details"
                     description={`You are viewing ${rows.length} results`}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader {...getHeaderProps({ header })}>
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan="8">
                                <h5>No records found</h5>
                              </TableCell>
                            </TableRow>
                          ) : (
                            rows.map((row) => (
                              <TableRow key={row.id}>
                                {row.cells.map((cell) => (
                                  <TableCell key={cell.id}>
                                    {cell.value}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                />

                <div style={{ width: "100%" }}>
                  <PagePagination
                    totalItems={rows.length}
                    setFirstRowIndex={setFirstRowIndex}
                    setCurrentPageSize={setCurrentPageSize}
                    currentPageSize={currentPageSize}
                  />
                </div>
              </>
            ) : null}
          </div>
          <div className="bx--col-lg-2"></div>
        </div>
      </div>
    </>
  );
};
export default PatientsRecords;
