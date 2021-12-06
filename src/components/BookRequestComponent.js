import React, { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { AuthContext } from "../AuthContext";

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

const RequestComponent = () => {
	const [requestRows, setRequestRows] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(AuthContext);
	useEffect(() => {
		setIsLoading(true);
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		axios
			.get(`/user/${user.user_id}/borrow`, config)
			.then((resp) => {
				console.log("response of borrow");
				console.log(user.user_id);
				console.log(resp.data);
				setRequestRows(resp.data.requests);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				console.log(err.response);
			});
	}, []);
	return (
		<>
			<br />
			<h3>Requested Books</h3>
			<br />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell align='left'>Issue ID</StyledTableCell>
							<StyledTableCell align='left'>ISBN</StyledTableCell>
							<StyledTableCell align='left'>Book Name</StyledTableCell>
							<StyledTableCell align='left'>Status</StyledTableCell>
							<StyledTableCell align='left'>Requested Date</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{requestRows.map((row) => (
							<StyledTableRow key={row.request_id}>
								<StyledTableCell component='th' scope='row'>
									{row.request_id}
								</StyledTableCell>
								<StyledTableCell align='left'>{row.isbn}</StyledTableCell>
								<StyledTableCell align='left'>{row.book_name}</StyledTableCell>
								<StyledTableCell align='left'>{row.status}</StyledTableCell>
								<StyledTableCell align='left'>{row.req_date}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
export default RequestComponent;
