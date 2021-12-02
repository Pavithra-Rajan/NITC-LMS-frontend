import React, { useContext, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import BookLoaderComponent from "./Loaders/BookLoader";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { Box } from "@mui/system";

const Request = ({ type }) => {
	const [bookName, setBookName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSucess] = useState(false);
	const { user } = useContext(AuthContext);
	const handleSubmit = (e) => {
		setIsLoading(true);
		const req_type = type == "Request" ? "request" : "donate";
		const data = {
			bookName: bookName,
			type: req_type,
		};
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		axios
			.post(`/user/${user.user_id}/request`, data, config)
			.then((resp) => {
				console.log(resp);
				setSucess(true);
				setIsLoading(false);
				setTimeout(() => {
					setSucess(false);
				}, 2000);
			})
			.catch((err) => {
				setError(err.response.data.message);
				setIsLoading(false);
				setTimeout(() => {
					setError(null);
				}, 2000);
			});
		console.log(data);
	};
	return (
		<>
			{isLoading ? (
				<BookLoaderComponent />
			) : (
				<div>
					<TextField
						id='book-name'
						label='Book Name'
						variant='standard'
						justifyContent='center'
						align='center'
						value={bookName}
						onChange={(e) => {
							setBookName(e.target.value);
						}}
						style={{ width: 400, marginTop: "20px" }}
						required
					/>
					<br />
					<Button
						variant='contained'
						onClick={handleSubmit}
						disabled={bookName.length == 0}
						style={{
							backgroundColor: "#677eff",
							color: "#FFFFFF",
							marginTop: "20px",
						}}
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
								The request has been succesfully submitted
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

export default function RequestAndDonate() {
	const [alignment, setAlignment] = useState("Request");

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	return (
		<div>
			<ToggleButtonGroup
				color='primary'
				value={alignment}
				exclusive
				onChange={handleChange}
			>
				<ToggleButton value='Request'>Request</ToggleButton>
				<ToggleButton value='Donate'>Donate</ToggleButton>
			</ToggleButtonGroup>
			{alignment === "Request" && <Request type={alignment} />}
			{alignment === "Donate" && <Request type={alignment} />}
		</div>
	);
}
