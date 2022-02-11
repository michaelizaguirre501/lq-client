import {
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Button,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import useTable from "../UI/useTable";
import Spinner from "../UI/spinner/Spinner";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    padding: "6px 24px 6px 16px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const headCells = [
  { id: "agNo", label: "Agent Number" },
  { id: "agName", label: "Agent Name" },
  { id: "agPhone", label: "Phone Number" },
  { id: "agEmail", label: "E-mail" },
  { id: "agFax", label: "Fax" },
  { id: "agContact", label: "Contact" },
  { id: "agAddress", label: "Address" },
  { id: "agCity", label: "City" },
  { id: "agState", label: "State" },
  { id: "agZip", label: "Zip" },
];

const AgentList = ({ agentList }) => {
  const [nameInput, setNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [stateInput, setStateInput] = useState("");

  //filter the array from api
  let filteredList = agentList
    ?.filter((item) => item.agName?.toUpperCase().includes(nameInput))
    .filter((item) => item.agNo?.includes(numberInput))
    .filter((item) => item.agPhone?.includes(phoneNumberInput))
    .filter((item) => item.agState?.toUpperCase().includes(stateInput));

  //send to table hook
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(filteredList, headCells);

  //phone number clean up
  function normalize(phone) {
    phone = phone?.replace(/[^\d]/g, "");
    if (phone?.length === 10) {
      return phone?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    return null;
  }

  //state handlers
  const handleInputChange = (filterToChange, e) => {
    filterToChange(e.target.value.toUpperCase() || e.target.value);
  };
  const handleReset = () => {
    setNameInput("");
    setNumberInput("");
    setPhoneNumberInput("");
    setStateInput("");
  };

  return (
    <div>
      <h1>Agents List</h1>
      <h2>Current Returned Results - {filteredList.length}</h2>
      {agentList.length === 0 && <Spinner customText="Loading.." />}
      {agentList.length > 0 && (
        <div>
          {" "}
          <div>
            <p>Filters</p>
            <hr />
            <div
              className="filters"
              style={{ marginTop: "50px", marginBottom: "50px" }}
            >
              <label>Name</label>
              <TextField
                type="text"
                variant="outlined"
                size="small"
                onChange={(e) => handleInputChange(setNameInput, e)}
                value={nameInput}
              />

              <label>Agent Number</label>
              <TextField
                type="text"
                variant="outlined"
                size="small"
                onChange={(e) => handleInputChange(setNumberInput, e)}
                value={numberInput}
              />
              <label>Phone Number</label>
              <TextField
                type="text"
                variant="outlined"
                size="small"
                onChange={(e) => handleInputChange(setPhoneNumberInput, e)}
                value={phoneNumberInput}
              />
              <label>State</label>
              <TextField
                type="text"
                variant="outlined"
                size="small"
                onChange={(e) => handleInputChange(setStateInput, e)}
                value={stateInput}
              />

              <Button
                className="resetButton"
                variant="contained"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="showResults" style={{ marginTop: "50px" }}>
            <TblPagination />
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <StyledTableRow key={item.agNo}>
                    <StyledTableCell>
                      {"A" + item.agNo.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.agName?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {normalize(item.agPhone?.trim()) || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.agEmail?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {normalize(item.agFax?.trim()) || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.agContact?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.agAddress?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.agCity?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.agState?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.agZip?.trim() || "-"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </TblContainer>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default AgentList;
