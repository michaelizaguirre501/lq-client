import {
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Button,
  withStyles,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import api from "../../api/api";
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

const AgentList = () => {
  const [agentList, setAgentList] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");

  useEffect(() => {
    async function fetchMyApi() {
      let response = await api.get("/agents");
      setAgentList(response.data);
    }
    fetchMyApi();
  }, []);

  let filteredList = agentList
    ?.filter((item) => item.agName.toUpperCase().includes(nameInput))
    .filter((item) => item.agNo.includes(numberInput));

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(filteredList, headCells);

  function normalize(phone) {
    //normalize string and remove all unnecessary characters
    phone = phone?.replace(/[^\d]/g, "");
    if (phone?.length === 10) {
      return phone?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    return null;
  }
  const handleInputChange = (filterToChange, e) => {
    filterToChange(e.target.value.toUpperCase() || e.target.value);
  };

  const handleReset = () => {
    setNameInput("");
    setNumberInput("");
  };

  return (
    <div>
      <h1>Agents List</h1>
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
                    <StyledTableCell>{item.agNo.trim() || "-"}</StyledTableCell>
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
