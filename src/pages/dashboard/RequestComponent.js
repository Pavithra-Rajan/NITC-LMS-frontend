import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import TextField from "@mui/material/TextField";

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

function BorrowInfo(issue_ID, ISBN, book_number, name, issue_date, returndate,renewals_left) {
	return { issue_ID, ISBN, book_number, name, issue_date, returndate,renewals_left};
  }
  
const BorrowalRows = [
	BorrowInfo(
	  "56",
	  "9780262033848",
	  3,
	  "Introduction to Algorithms, 3rd Edition",
	  "2021-08-30",
	  "2021-08-29",
	  2
	),
	BorrowInfo(
	  "57",
	  "9781292097619",
	  1,
	  "Fundamentals of Database Systems",
	  "2021-08-30",
	  "2021-08-29",
	  2
	),
	BorrowInfo(
	  "58",
	  "9780470458365",
	  8,
	  "Advanced Engineering Mathematics 10th Edition",
	  "2021-08-30",
	  "2021-08-29",
	  1
	)
  ];

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

function DuesData(issue_ID, ISBN, book_number, name, fine) {
	return { issue_ID, ISBN, book_number, name, fine };
  }
  
const DuesRows = [
	DuesData(47, " 9780071160902", 1, "Object Oriented Systems Development", 72.5)
  ];


const RequestComponent = () => {
	return (
		<>
			<h3>Borrowed Books</h3>
			<br/>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
					<TableRow>
						<StyledTableCell align="left">Issue ID</StyledTableCell>
						<StyledTableCell align="left">ISBN</StyledTableCell>
						<StyledTableCell align="left">Book Number</StyledTableCell>
						<StyledTableCell align="left">Book Name</StyledTableCell>
						<StyledTableCell align="left">Issue Date</StyledTableCell>
						<StyledTableCell align="left">Return Date</StyledTableCell>
						<StyledTableCell align="left">Renewals Left</StyledTableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{BorrowalRows.map((row) => (
						<StyledTableRow key={row.issue_ID}>
						<StyledTableCell component="th" scope="row">
							{row.issue_ID}
						</StyledTableCell>
						<StyledTableCell align="left">{row.ISBN}</StyledTableCell>
						<StyledTableCell align="left">{row.book_number}</StyledTableCell>
						<StyledTableCell align="left">{row.name}</StyledTableCell>
						<StyledTableCell align="left">{row.issue_date}</StyledTableCell>
						<StyledTableCell align="left">{row.returndate}</StyledTableCell>
						<StyledTableCell align="left">{row.renewals_left}</StyledTableCell>
						</StyledTableRow>
					))}
					</TableBody>
				</Table>
    		</TableContainer>
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
			<br/>			
			<h3>Dues to be paid</h3>
			<br/>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
					<TableRow>
						<StyledTableCell align="left">Issue ID</StyledTableCell>
						<StyledTableCell align="left">ISBN</StyledTableCell>
						<StyledTableCell align="left">Book Number</StyledTableCell>
						<StyledTableCell align="left">Book Name</StyledTableCell>
						<StyledTableCell align="left">Fine in (Rs)</StyledTableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{DuesRows.map((row) => (
						<StyledTableRow key={row.issue_ID}>
						<StyledTableCell component="th" scope="row">
							{row.issue_ID}
						</StyledTableCell>
						<StyledTableCell align="left">{row.ISBN}</StyledTableCell>
						<StyledTableCell align="left">{row.book_number}</StyledTableCell>
						<StyledTableCell align="left">{row.name}</StyledTableCell>
						<StyledTableCell align="left">{row.fine}</StyledTableCell>
						</StyledTableRow>
					))}
					</TableBody>
				</Table>
				</TableContainer>
		</>
	);
};
export default RequestComponent