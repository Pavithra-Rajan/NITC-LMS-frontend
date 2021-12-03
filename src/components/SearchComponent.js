import React, { useContext, useEffect, useState } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import BookLoaderComponent from "./Loaders/BookLoader";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	marginTop: 1,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "#000000",
	backgroundColor: "#d9deff",
	borderRadius: 16,
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 1),

		paddingLeft: `calc(1em + ${theme.spacing(0)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "30ch",
		},
	},
}));

const originalData = [
	{ user_ID: "B190632CS", ISBN: "9780262033848", issue_id: 4 },
	{ user_ID: "B190529CS", ISBN: "9781337627900", issue_id: 2 },
	{ user_ID: "B190402CS", ISBN: "9781565770393", issue_id: 1 },
	{ user_ID: "B190672CS", ISBN: "9780134746753", issue_id: 3 },
	{ user_ID: "B190539CS", ISBN: "9780262033848", issue_id: 1 },
	{ user_ID: "B190412CS", ISBN: "9780262033848", issue_id: 5 },
	{ user_ID: "B190612CS", ISBN: "9781337627900", issue_id: 1 },
	{ user_ID: "B190589CS", ISBN: "9780262033848", issue_id: 3 },
	{ user_ID: "B190502CS", ISBN: "9780133591620", issue_id: 2 },
];

export default function App() {
	const [initdata, setInitData] = useState([]);
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const { user } = useContext(AuthContext);
	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		setIsLoading(true);
		axios
			.get(`/admin/borrowals`, config)
			.then((resp) => {
				console.log(resp.data.data);
				setInitData(resp.data.data);
				setData(initdata);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			})
			.catch((err) => console.log(err));

		let columns = [
			{
				Header: "ISBN",
				accessor: "user_id",
				sortable: false,
				show: true,
				displayValue: "ISBN",
			},
			{
				Header: "Book Number",
				accessor: "isbn",
				sortable: false,
				show: true,
				displayValue: "Book Number",
			},
			{
				Cell: (props) => (
					<Button
						onClick={() => {
							hanldeChekin(props.original.issue_id);
						}}
						variant='outlined'
						color='success'
					>
						chekin
					</Button>
				),
			},
		];
		setColumns(columns);
	}, [refresh]);

	const hanldeChekin = (issue_id) => {
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		setIsLoading(true);
		axios
			.get(`/admin/checkin/${issue_id}`, config)
			.then((resp) => {
				setRefresh(!refresh);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (searchInput.length > 0) {
			let filteredData = initdata.filter((value) => {
				return (
					value.user_id
						.toString()
						.toLowerCase()
						.includes(searchInput.toLowerCase()) ||
					value.isbn
						.toString()
						.toLowerCase()
						.includes(searchInput.toLowerCase()) ||
					value.issue_id
						.toString()
						.toLowerCase()
						.includes(searchInput.toLowerCase())
				);
			});
			setData(filteredData);
		} else {
			setData(initdata);
		}
	}, [searchInput]);

	return (
		<>
			{isLoading ? (
				<BookLoaderComponent />
			) : (
				<div>
					<br />
					<Search>
						<SearchIcon />

						<StyledInputBase
							placeholder='Search...'
							inputProps={{ "aria-label": "search" }}
							name='searchInput'
							value={searchInput}
							onChange={(e) => {
								setSearchInput(e.target.value);
							}}
							label='Search'
						/>
					</Search>

					<br />
					<br />
					<ReactTable
						data={data}
						columns={columns}
						defaultPageSize={10}
						className='-striped -highlight'
					/>
				</div>
			)}
		</>
	);
}
