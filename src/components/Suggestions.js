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

function SuggestInfo(user_ID, name) {
	return {user_ID, name};
  }

const SuggestRows = [
	SuggestInfo(
      "B190632CS",
	  "Introduction to Algorithms, 3rd Edition"
	),
	SuggestInfo(
      "B190402CS",
	  "Fundamentals of Database Systems"
	),
	SuggestInfo(
      "B190839CS",
	  "Advanced Engineering Mathematics 10th Edition"
	)
  ];

const SuggestBook = () => {
	return (
		<>
            <br/>
            <h3>Suggestions</h3>
			<br/>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
					<TableRow>
                        <StyledTableCell align="left">User ID</StyledTableCell>
						<StyledTableCell align="left">Book Name</StyledTableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{SuggestRows.map((row) => (
						<StyledTableRow key={row.user_ID}>
						<StyledTableCell component="th" scope="row">
							{row.user_ID}
						</StyledTableCell>
						<StyledTableCell align="left">{row.name}</StyledTableCell>
						</StyledTableRow>
					))}
					</TableBody>
				</Table>
    		</TableContainer>

		</>
	);
};
export default SuggestBook