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
  { id: "polMember", label: "Policy Member" },
  { id: "polFname", label: "First Name" },
  { id: "polLname", label: "Last Name" },
  { id: "polAddress", label: "Address" },
  { id: "polCity", label: "City" },
  { id: "polState", label: "State" },
];

const MemberList = () => {
  const [memberList, setMemberList] = useState([]);
  // const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");

  useEffect(() => {
    async function fetchMyApi() {
      let response = await api.get("/polmembers");
      setMemberList(response.data);
    }
    fetchMyApi();
  }, []);

  let copy = [...memberList];

  let filteredList = copy
    ?.filter((item) =>
      item.polLname?.toString().toUpperCase().includes(lastNameInput)
    )
    .filter((item) => item.polMember?.includes(numberInput));

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(filteredList, headCells);

  const handleInputChange = (filterToChange, e) => {
    filterToChange(e.target.value.toUpperCase() || e.target.value);
  };

  const handleReset = () => {
    // setFirstNameInput("");
    setLastNameInput("");
    setNumberInput("");
  };

  // function normalize(phone) {
  //   //normalize string and remove all unnecessary characters
  //   phone = phone?.replace(/[^\d]/g, "");
  //   if (phone?.length === 10) {
  //     return phone?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  //   }
  //   return null;
  // }

  return (
    <div>
      <h1>Members List</h1>
      {memberList.length === 0 && <Spinner customText="Loading.." />}
      {memberList.length > 0 && (
        <div>
          <p>Filters</p>
          <hr />
          <div
            className="filters"
            style={{ marginTop: "50px", marginBottom: "50px" }}
          >
            {/* <label>First Name</label>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              onChange={(e) => handleInputChange(setFirstNameInput, e)}
              value={firstNameInput}
            /> */}
            <label>Last Name</label>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              onChange={(e) => handleInputChange(setLastNameInput, e)}
              value={lastNameInput}
            />

            <label>Number</label>
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
          <div className="showResults" style={{ marginTop: "50px" }}>
            <TblPagination />
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item, index) => (
                  <StyledTableRow key={item.polMember}>
                    <StyledTableCell>{item.polMember}</StyledTableCell>
                    <StyledTableCell>
                      {item.polFname?.toUpperCase() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.polLname?.toUpperCase() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.polAddress?.toUpperCase() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.polCity?.toUpperCase() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.polState?.toUpperCase() || "-"}
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

export default MemberList;
