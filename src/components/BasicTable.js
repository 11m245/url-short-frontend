import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinkIcon from "@mui/icons-material/Link";
import IconButton from "@mui/material/IconButton";
import { apiContext } from "../App";

export default function BasicTable({ createdList }) {
  const { clientURL } = React.useContext(apiContext);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Length URL</TableCell>
            <TableCell align="right">Short Url</TableCell>
            <TableCell align="right">Visit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createdList.map((row) => (
            <TableRow
              key={row.shortUrl}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.lengthUrl}
              </TableCell>
              <TableCell align="right">{row.shortUrl}</TableCell>
              <TableCell align="right">
                {
                  <a
                    href={`${clientURL}/short/${row.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon />
                  </a>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
