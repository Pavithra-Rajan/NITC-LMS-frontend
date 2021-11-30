import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
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

function BorrowInfo(user_ID, ISBN, book_number, name, req_date,renewals_done) {
	return { user_ID, ISBN, book_number, name, req_date,renewals_done};
  }
  
const BorrowalRows = [
	BorrowInfo(
	  "B190402CS",
	  "9780262033848",
	  4,
	  "Introduction to Algorithms, 3rd Edition",
	  "2021-08-30",
	  0
	),
	BorrowInfo(
	  "EMP001CSE",
	  "9781292097619",
	  2,
	  "Fundamentals of Database Systems",
	  "2021-08-30",
	  1
	)
  ];

const ViewReq = () => {
	return (
		<>
            <h3>Check-Out Requests</h3>
			<br/>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
					<TableRow>
						<StyledTableCell align="left">User ID</StyledTableCell>
						<StyledTableCell align="left">ISBN</StyledTableCell>
						<StyledTableCell align="left">Book Number</StyledTableCell>
						<StyledTableCell align="left">Book Name</StyledTableCell>
						<StyledTableCell align="left">Request Date</StyledTableCell>
						<StyledTableCell align="left">Renewals Done</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{BorrowalRows.map((row) => (
						<StyledTableRow key={row.user_ID}>
						<StyledTableCell component="th" scope="row">
							{row.user_ID}
						</StyledTableCell>
						<StyledTableCell align="left">{row.ISBN}</StyledTableCell>
						<StyledTableCell align="left">{row.book_number}</StyledTableCell>
						<StyledTableCell align="left">{row.name}</StyledTableCell>
						<StyledTableCell align="left">{row.req_date}</StyledTableCell>
						<StyledTableCell align="left">{row.renewals_done}</StyledTableCell>
                        <StyledTableCell align="left">
                            <Button variant="contained" style={{backgroundColor: '#018501', color: '#FFFFFF', marginRight:'10px'}}>Approve</Button>
                            <Button variant="contained" style={{backgroundColor: '#850101', color: '#FFFFFF'}}>Reject</Button>
                        </StyledTableCell>
						</StyledTableRow>
					))}
					</TableBody>
				</Table>
    		</TableContainer>
			
		</>
	);
};
export default ViewReq