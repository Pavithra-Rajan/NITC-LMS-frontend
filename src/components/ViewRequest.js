import React, { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Loader } from "./Loaders/TableLoader";

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

const ViewRequests = () => {
	const [bookRequests, setBookRequests] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const user = useContext(AuthContext);
	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		axios
			.get("/admin/requests/borrow", config)
			.then((resp) => {
				const requestData = [];
				resp.data.requests.map((request) => {
					requestData.push({
						...request,
					});
				});
				setBookRequests(requestData);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [refresh]);

	const handleApprove = (id) => {
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		setIsLoading(true);
		axios
			.get(`/admin/checkout/${id}`, config)
			.then((resp) => {
				setRefresh(!refresh);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h3>Check-Out Requests</h3>
			<br />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell align='left'>User Name</StyledTableCell>
							{/* <StyledTableCell align='left'>ISBN</StyledTableCell> */}
							{/* <StyledTableCell align='left'>Book Number</StyledTableCell> */}
							<StyledTableCell align='left'>Book Name</StyledTableCell>
							<StyledTableCell align='left'>Request Date</StyledTableCell>
							<StyledTableCell align='left'>Renewals Done</StyledTableCell>
							<StyledTableCell align='left'>Action</StyledTableCell>
						</TableRow>
					</TableHead>
					{isLoading ? (
						<Loader />
					) : (
						<TableBody>
							{bookRequests.map((row) => (
								<StyledTableRow key={row.user_ID}>
									<StyledTableCell component='th' scope='row'>
										{row.user}
									</StyledTableCell>
									{/* <StyledTableCell align='left'>{row.ISBN}</StyledTableCell> */}
									{/* <StyledTableCell align='left'>
									{row.book_number}
								</StyledTableCell> */}
									<StyledTableCell align='left'>{row.book}</StyledTableCell>
									<StyledTableCell align='left'>{row.req_date}</StyledTableCell>
									<StyledTableCell align='left'>{1}</StyledTableCell>
									<StyledTableCell align='left'>
										<Button
											variant='contained'
											onClick={() => handleApprove(row.id)}
											style={{
												backgroundColor: "#018501",
												color: "#FFFFFF",
												marginRight: "10px",
											}}
										>
											Approve
										</Button>
										<Button
											variant='contained'
											style={{ backgroundColor: "#850101", color: "#FFFFFF" }}
										>
											Reject
										</Button>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					)}
				</Table>
			</TableContainer>
		</>
	);
};
export default ViewRequests;
