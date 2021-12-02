import React, { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AuthContext } from "../AuthContext";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#3649b3",
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},

	"&:last-child td, &:last-child th": {
		border: 1,
	},
}));

const BorrowedComponent = () => {
	const [borrowedBooks, setBorrowedBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(AuthContext);
	useEffect(() => {
		setIsLoading(true);
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		axios
			.get(`/user/${user.user_id}/borrowed`, config)
			.then((resp) => {
				setBorrowedBooks(resp.data.data);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				console.log(err.response);
			});
	}, []);
	return (
		<>
			<h3>Borrowed Books</h3>
			<br />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell align='left'>ISBN</StyledTableCell>
							<StyledTableCell align='left'>Book Name</StyledTableCell>
							<StyledTableCell align='left'>Issue Date</StyledTableCell>
							<StyledTableCell align='left'>Return Date</StyledTableCell>
							<StyledTableCell align='left'>Renewed</StyledTableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{borrowedBooks.map((row) => (
							<StyledTableRow key={row.issue_ID}>
								<StyledTableCell align='left'>{row.ISBN}</StyledTableCell>
								<StyledTableCell align='left'>{row.book_name}</StyledTableCell>
								<StyledTableCell align='left'>{row.issue_date}</StyledTableCell>
								<StyledTableCell align='left'>
									{row.return_date}
								</StyledTableCell>
								<StyledTableCell align='left'>{row.renewed}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
export default BorrowedComponent;
