import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import BookLoaderComponent from "./Loaders/BookLoader";
import { AuthContext } from "../AuthContext";
import axios from "axios";

function stringAvatar(user_name) {
	user_name = user_name.split(" ");
	let name = "";
	for (let i = 0; i < user_name.length; i++)
		name += user_name[i].substr(0, 1).toUpperCase();
	return {
		sx: {
			bgcolor: "#677eff",
			marginLeft: "48%",
			height: "60px",
			width: "60px",
			marginTop: "10px",
		},
		children: name,
	};
}
export default function Profile({ role }) {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({});
	const { user } = useContext(AuthContext);
	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		console.log(user);
		axios
			.get(`/user/${user.user_id}?role=${role}`, config)
			.then((resp) => {
				console.log(resp.data);
				setData(resp.data.user);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				console.log(err.response);
			});
	}, []);

	return (
		<>
			{isLoading ? (
				<BookLoaderComponent />
			) : (
				<div>
					<h2>Profile</h2>
					<Avatar {...stringAvatar(data.mem_name)} />
					<TextField
						id='outlined-read-only-input'
						label='Name'
						defaultValue={data.mem_name}
						InputProps={{
							readOnly: true,
						}}
						style={{ width: 400, marginTop: "25px" }}
					/>
					<br />

					<TextField
						id='outlined-read-only-input'
						label='User ID'
						defaultValue={data.user_id}
						InputProps={{
							readOnly: true,
						}}
						style={{ width: 400, marginTop: "25px" }}
					/>
					<br />

					<TextField
						id='outlined-read-only-input'
						label='Email'
						defaultValue={data.email}
						InputProps={{
							readOnly: true,
						}}
						style={{ width: 400, marginTop: "25px" }}
					/>
					<br />

					<TextField
						id='outlined-read-only-input'
						label='Role'
						defaultValue={data.role}
						InputProps={{
							readOnly: true,
						}}
						style={{ width: 400, marginTop: "25px" }}
					/>
					<br />
					{data.role != "librarian" && (
						<div>
							<TextField
								id='outlined-read-only-input'
								label='Department'
								defaultValue={data.dept}
								InputProps={{
									readOnly: true,
								}}
								style={{ width: 400, marginTop: "25px" }}
							/>
							<br />
						</div>
					)}

					{data.role === "student" && (
						<div>
							<TextField
								id='outlined-read-only-input'
								label='Programme'
								defaultValue={data.programme}
								InputProps={{
									readOnly: true,
								}}
								style={{ width: 400, marginTop: "25px" }}
							/>
							<br />
						</div>
					)}
				</div>
			)}
		</>
	);
}
