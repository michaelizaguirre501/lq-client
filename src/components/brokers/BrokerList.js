import {
  TableBody,
  TableCell,
  TableRow,
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

const BrokerList = () => {
  const [brokerList, setBrokerList] = useState([]);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    async function fetchMyApi() {
      let response = await api.get("/brokers");
      setBrokerList(response.data);
    }
    fetchMyApi();
  }, []);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(brokerList, headCells);

  console.log(brokerList);
  return (
    <div>
      <h1>Brokers List</h1>
      {brokerList.length === 0 && <Spinner customText="Loading.." />}
      {brokerList.length > 0 && (
        <div>
          <div>FILTER AREA</div>
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
                      {item.brPhone?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.brEmail?.trim() || "-"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.brFax?.trim() || "-"}
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
