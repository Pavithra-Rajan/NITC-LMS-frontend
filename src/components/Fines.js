import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { Alert, Breadcrumbs, Link, Typography } from "@mui/material";
import BookLoaderComponent from "./Loaders/BookLoader";
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

const ViewFines = () => {
	const [bookRequests, setBookRequests] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(AuthContext);
	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		axios
			.get("/admin/fine/view", config)
			.then((resp) => {
				const requestData = [];
				resp.data.fines.map((request) => {
					requestData.push({
						...request,
					});
				});
				setBookRequests(requestData);
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
	}, [refresh]);

	const handleClose = (id) => {
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		setIsLoading(true);
		axios
			.get(`/admin/fine/close/${id}`, config)
			.then((resp) => {
				setRefresh(!refresh);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			{isLoading ? (
				<BookLoaderComponent />
			) : (
				<>
					<h3>View Fines</h3>
					<br />
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 700 }} aria-label='customized table'>
							<TableHead>
								<TableRow>
									<StyledTableCell align='left'>User ID</StyledTableCell>
									<StyledTableCell align='left'>Amount</StyledTableCell>
									<StyledTableCell align='left'>Payement Date</StyledTableCell>
									<StyledTableCell align='left'>Status</StyledTableCell>
									<StyledTableCell align='left'>Action</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{bookRequests.map((row) => (
									<StyledTableRow key={row.fine_id}>
										<StyledTableCell component='th' scope='row'>
											{row.user_id}
										</StyledTableCell>
										<StyledTableCell align='left'>{row.amount}</StyledTableCell>
										<StyledTableCell align='left'>
											{row.payment_date}
										</StyledTableCell>
										<StyledTableCell align='left'>
											{row.fine_status}
										</StyledTableCell>
										<StyledTableCell align='left'>
											<Button
												variant='contained'
												onClick={() => handleClose(row.fine_id)}
												primary

												// style={{
												// 	backgroundColor: "#018501",
												// 	color: "#FFFFFF",
												// 	marginRight: "10px",
												// }}
											>
												Approve
											</Button>
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

const AddFines = () => {
	const [userID, setUserID] = useState("");
	const [fine, setFine] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSucess] = useState(false);
	const { user } = React.useContext(AuthContext);
	const handleSubmit = (e) => {
		setIsLoading(true);
		const data = {
			userID: userID,
			amount: fine,
		};
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		axios
			.post(`/admin/fine`, data, config)
			.then((resp) => {
				console.log(resp);
				setSucess(true);
				setIsLoading(false);
				setTimeout(() => {
					setSucess(false);
				}, 4000);
			})
			.catch((err) => {
				setError(err.response.data.message);
				setIsLoading(false);
				setTimeout(() => {
					setError(null);
				}, 4000);
			});
		console.log(data);
	};
	return (
		<>
			{isLoading ? (
				<BookLoaderComponent />
			) : (
				<div>
					<h2>Add Fines</h2>
					<TextField
						id='user-ID'
						label='User ID'
						variant='standard'
						justifyContent='center'
						align='center'
						style={{ width: 400, marginTop: "25px" }}
						value={userID}
						onChange={(e) => {
							setUserID(e.target.value);
						}}
					/>
					<br />
					<TextField
						id='fine'
						label='Fine'
						variant='standard'
						justifyContent='center'
						align='center'
						style={{ width: 400, marginTop: "25px", marginBottom: "25px" }}
						value={fine}
						onChange={(e) => {
							setFine(e.target.value);
						}}
					/>
					<br />
					<Button
						onClick={handleSubmit}
						variant='contained'
						style={{ background: "#677eff" }}
					>
						Submit
					</Button>
					<br />
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							width: "300px",
							margin: "20px 0",
							width: "100%",
						}}
					>
						{success && (
							<Alert variant='outlined' severity='success'>
								fine added succesfully
							</Alert>
						)}
						{error && (
							<Alert variant='outlined' severity='error'>
								{error}
							</Alert>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default function FineComponent() {
	const [add, setAdd] = useState(true);
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Breadcrumbs aria-label='breadcrumb'>
					<Link
						underline='hover'
						color='inherit'
						onClick={() => {
							setAdd(true);
						}}
					>
						Add
					</Link>
					<Link
						underline='hover'
						color='inherit'
						onClick={() => {
							setAdd(false);
						}}
					>
						View
					</Link>
				</Breadcrumbs>
			</div>
			<br />
			<div style={{ margin: "10px 0" }}>
				{add ? <AddFines /> : <ViewFines />}
			</div>
		</>
	);
}
