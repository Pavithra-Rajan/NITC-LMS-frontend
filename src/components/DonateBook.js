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

function DonateInfo(user_ID,ISBN, name) {
	return {user_ID, ISBN, name};
  }

const DonateRows = [
	DonateInfo(
      "B190632CS",
	  "9780262033848",
	  "Introduction to Algorithms, 3rd Edition"
	),
	DonateInfo(
      "B190402CS",
	  "9781292097619",
	  "Fundamentals of Database Systems"
	),
	DonateInfo(
      "B190839CS",
	  "9780470458365",
	  "Advanced Engineering Mathematics 10th Edition"
	)
  ];

const DonateBook = () => {
	return (
		<>
            <h3>Donations</h3>
			<br/>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
					<TableRow>
						<StyledTableCell align="left">ISBN</StyledTableCell>
						<StyledTableCell align="left">Book Name</StyledTableCell>
                        <StyledTableCell align="left">User ID</StyledTableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{DonateRows.map((row) => (
						<StyledTableRow key={row.ISBN}>
						<StyledTableCell component="th" scope="row">
							{row.ISBN}
						</StyledTableCell>
						<StyledTableCell align="left">{row.name}</StyledTableCell>
                        <StyledTableCell align="left">{row.user_ID}</StyledTableCell>
						</StyledTableRow>
					))}
					</TableBody>
				</Table>
    		</TableContainer>

		</>
	);
};
export default DonateBook