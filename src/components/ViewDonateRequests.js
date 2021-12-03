import React, { useEffect, useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import BookLoaderComponent from "./Loaders/BookLoader";
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

function DonateInfo(user_ID, ISBN, name) {
	return { user_ID, ISBN, name };
}

const DonateRows = [
	DonateInfo(
		"B190632CS",
		"9780262033848",
		"Introduction to Algorithms, 3rd Edition"
	),
	DonateInfo("B190402CS", "9781292097619", "Fundamentals of Database Systems"),
	DonateInfo(
		"B190839CS",
		"9780470458365",
		"Advanced Engineering Mathematics 10th Edition"
	),
];

const DonateBook = () => {
	const [donateRows, setDonateRows] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(AuthContext);
	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		axios
			.get("/admin/requests", config)
			.then((resp) => {
				setDonateRows(resp.data.requests);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			});
	}, []);
	return (
		<>
			{isLoading ? (
				<BookLoaderComponent />
			) : (
				<>
					<h3>Requests</h3>
					<br />
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 700 }} aria-label='customized table'>
							<TableHead>
								<TableRow>
									<StyledTableCell align='left'>Book Name</StyledTableCell>
									<StyledTableCell align='left'>User ID</StyledTableCell>
									<StyledTableCell align='left'>Request Date</StyledTableCell>
									<StyledTableCell align='left'>Request Type</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{donateRows.map((row) => (
									<StyledTableRow key={row.request_id}>
										<StyledTableCell component='th' scope='row'>
											{row.book_name}
										</StyledTableCell>
										<StyledTableCell component='th' scope='row'>
											{row.user_id}
										</StyledTableCell>
										<StyledTableCell align='left'>
											{row.req_date}
										</StyledTableCell>
										<StyledTableCell
											style={{
												color: row.req_type == "DONATE" ? "blue" : "green",
											}}
											align='left'
										>
											{row.req_type}
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
		</>
	);
};
export default DonateBook;
