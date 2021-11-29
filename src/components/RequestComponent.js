import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
	  backgroundColor: "#3649b3",
	  color: theme.palette.common.white
	},
	[`&.${tableCellClasses.body}`]: {
	  fontSize: 14
	}
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
	  backgroundColor: theme.palette.action.hover
	},

	"&:last-child td, &:last-child th": {
	  border: 1
	}
  }));

function RequestData(issue_ID, ISBN, book_number, name, status) {
	return { issue_ID, ISBN, book_number, name, status };
  }
  
const RequestRows = [
	RequestData(
	  101,
	  "9781119800361",
	  1,
	  "Operating System Concepts",
	  "Processing"
	)
  ];



const RequestComponent = () => {
	return (
		<>
			<br/>
			<h3>Requested Books</h3>
			<br/>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
					<TableRow>
						<StyledTableCell align="left">Issue ID</StyledTableCell>
						<StyledTableCell align="left">ISBN</StyledTableCell>
						<StyledTableCell align="left">Book Number</StyledTableCell>
						<StyledTableCell align="left">Book Name</StyledTableCell>
						<StyledTableCell align="left">Status</StyledTableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{RequestRows.map((row) => (
						<StyledTableRow key={row.issue_ID}>
						<StyledTableCell component="th" scope="row">
							{row.issue_ID}
						</StyledTableCell>
						<StyledTableCell align="left">{row.ISBN}</StyledTableCell>
						<StyledTableCell align="left">{row.book_number}</StyledTableCell>
						<StyledTableCell align="left">{row.name}</StyledTableCell>
						<StyledTableCell align="left">{row.status}</StyledTableCell>
						</StyledTableRow>
					))}
					</TableBody>
				</Table>
				</TableContainer>
			
		</>
	);
};
export default RequestComponent