import * as React from "react";
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

const DueComponent = () => {
	const [duesRows, setDuesRows] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const { user } = React.useContext(AuthContext);
	React.useEffect(() => {
		setIsLoading(true);
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		axios
			.get(`/user/${user.user_id}/dues`, config)
			.then((resp) => {
				setDuesRows(resp.data.fines);
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
			<h3>Dues to be paid</h3>
			<br />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell align='left'>ID</StyledTableCell>
							<StyledTableCell align='left'>Fine in (Rs)</StyledTableCell>
							<StyledTableCell align='left'>Due Date</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{duesRows.map((row) => (
							<StyledTableRow key={row.fine_id}>
								<StyledTableCell component='th' scope='row'>
									{row.fine_id}
								</StyledTableCell>
								<StyledTableCell align='left'>{row.amount}</StyledTableCell>
								<StyledTableCell align='left'>
									{row.payment_date}
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
export default DueComponent;
