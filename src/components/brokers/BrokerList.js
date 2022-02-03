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
  { id: "brNo", label: "Broker Number" },
  { id: "brName", label: "Broker Name" },
  { id: "brPhone", label: "Phone Number" },
  { id: "brEmail", label: "E-mail" },
  { id: "brFax", label: "Fax" },
  { id: "brContact", label: "Contact" },
  { id: "brAddress", label: "Address" },
  { id: "brCity", label: "City" },
  { id: "brState", label: "State" },
  { id: "brZip", label: "Zip" },
];

const BrokerList = ({ brokerList }) => {
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");

  let filteredList = brokerList
    ?.filter((item) => item.brName.toUpperCase().includes(nameInput))
    .filter((item) => item.brNo.includes(numberInput))
    .filter((item) => item.brPhone?.includes(phoneNumberInput));

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(filteredList, headCells);

  const handleInputChange = (filterToChange, e) => {
    filterToChange(e.target.value.toUpperCase() || e.target.value);
  };

  const handleReset = () => {
    setNameInput("");
    setNumberInput("");
    setPhoneNumberInput("");
  };

  function normalize(phone) {
    //normalize string and remove all unnecessary characters
    phone = phone?.replace(/[^\d]/g, "");
    if (phone?.length === 10) {
      return phone?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    return null;
  }

  return (
    <div>
      <h1>Brokers List</h1>
      {brokerList.length === 0 && <Spinner customText="Loading.." />}
      {brokerList.length > 0 && (
        <div>
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

              <label>Broker Number</label>
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
                  <StyledTableRow key={item.brNo}>
                    <StyledTableCell>{item.brNo.trim() || "-"}</StyledTableCell>
                    <StyledTableCell>
                      {item.brName?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {normalize(item.brPhone?.trim()) || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.brEmail?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {normalize(item.brFax?.trim()) || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.brContact?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.brAddress?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.brCity?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.brState?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.brZip?.trim() || "-"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </TblContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrokerList;
