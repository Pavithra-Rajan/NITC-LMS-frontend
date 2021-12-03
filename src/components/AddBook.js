import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Cancel, Public, Tag } from "@mui/icons-material";
import { FormControl, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import Counter from "./counter";
const Tags = ({ data, handleDelete }) => {
	//styling for the tags in the new form
	return (
		<Box
			sx={{
				background: "#5263bf",
				height: "90%",
				display: "flex",
				padding: "0.3rem",
				margin: "0 0.5rem 0 0",
				justifyContent: "center",
				alignContent: "center",
				color: "#ffffff",
				borderRadius: 1,
			}}
		>
			<Stack direction='row' gap={1}>
				<Typography>{data}</Typography>
				<Cancel
					sx={{ cursor: "pointer" }}
					onClick={() => {
						handleDelete(data);
					}}
				/>
			</Stack>
		</Box>
	);
};

export default function AddBook() {
	const [alignment, setAlignment] = React.useState("New"); //default when component renders is New

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	const [tags, setTags] = useState([]);
	const [authors, setAuthors] = useState([]);
	const tagRef = useRef();
	const authorRef = useRef();

	const [auth, SetAuth] = useState([]);
	const AuthRef = useRef();

	const [ISBN, SetISBN] = useState("");
	const [Name, SetName] = useState("");
	const [Pub, SetPub] = useState("");

	const handleDelete = (value) => {
		//deletion of tags

		const newtags = tags.filter((val) => val !== value);
		setTags(newtags);
	};
	const handleOnSubmit = (e, label) => {
		//adding new tags
		e.preventDefault();
		if (label == "tags") {
			setTags([...tags, tagRef.current.value]);
			tagRef.current.value = "";
		} else if (label == "authors") {
			setAuthors([...authors, authorRef.current.value]);
			authorRef.current.value = "";
		}
	};

	const handleDeleteAuth = (value) => {
		//deletion of authors
		const NewAuth = auth.filter((val) => val !== value);
		SetAuth(NewAuth);
	};
	const handleOnSubmitAuth = (e) => {
		//adding new authors
		e.preventDefault();
		SetAuth([...auth, AuthRef.current.value]);
		AuthRef.current.value = "";
	};

	return (
		<div>
			<ToggleButtonGroup
				color='primary'
				value={alignment}
				exclusive
				onChange={handleChange}
			>
				<ToggleButton value='Existing'>Existing</ToggleButton>
				<ToggleButton value='New'>New</ToggleButton>
			</ToggleButtonGroup>
			{/*Conditional rendering when existing is selected*/}
			{alignment === "Existing" && (
				<div>
					<TextField
						id='ISBN'
						label='ISBN'
						variant='standard'
						justifyContent='center'
						align='center'
						style={{ width: 400, marginTop: "20px" }}
						value={ISBN}
						onChange={(e) => {
							SetISBN(e.target.value);
						}}
					/>
					<br />
					<Button
						variant='contained'
						style={{
							backgroundColor: "#677eff",
							color: "#FFFFFF",
							marginTop: "20px",
						}}
					>
						Submit
					</Button>
				</div>
			)}

			{/*Conditional rendering when New is selected*/}
			{alignment === "New" && (
				<div>
					<TextField
						id='ISBN'
						label='ISBN'
						variant='standard'
						justifyContent='center'
						align='center'
						style={{ width: 400, marginTop: "20px" }}
						value={ISBN}
						onChange={(e) => {
							SetISBN(e.target.value);
						}}
					/>
					<br />
					<TextField
						id='book-name'
						label='Book Name'
						variant='standard'
						justifyContent='center'
						align='center'
						style={{ width: 400, marginTop: "20px" }}
						value={Name}
						onChange={(e) => {
							SetName(e.target.value);
						}}
					/>
					<br />
					<TextField
						id='publisher'
						label='Publisher'
						variant='standard'
						justifyContent='center'
						align='center'
						style={{ width: 400, marginTop: "20px" }}
						value={Pub}
						onChange={(e) => {
							SetPub(e.target.value);
						}}
					/>

					<br />
					<Box sx={{ flexGrow: 1 }}>
						<form onSubmit={handleOnSubmitAuth}>
							<TextField
								inputRef={AuthRef}
								style={{ width: 400, marginTop: "35px" }}
								variant='standard'
								sx={{ margin: "1rem 0" }}
								margin='none'
								placeholder={auth.length < 4 ? "Authors" : ""}
								InputProps={{
									startAdornment: (
										<Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
											{auth.map((data, index) => {
												return (
													<Tags
														data={data}
														handleDelete={handleDeleteAuth}
														key={index}
													/>
												);
											})}
										</Box>
									),
								}}
							/>
						</form>
					</Box>

					<Box sx={{ flexGrow: 1 }}>
						<form onSubmit={handleOnSubmit}>
							<TextField
								inputRef={tagRef}
								style={{ width: 400, marginTop: "20px", marginBottom: "25px" }}
								variant='standard'
								sx={{ margin: "1rem 0" }}
								margin='none'
								placeholder={tags.length < 4 ? "Tags" : ""}
								InputProps={{
									startAdornment: (
										<Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
											{tags.map((data, index) => {
												return (
													<Tags
														data={data}
														handleDelete={handleDelete}
														key={index}
													/>
												);
											})}
										</Box>
									),
								}}
							/>
						</form>
					</Box>
					<br />
					<Box sx={{ flexGrow: 1 }}>
						<form onSubmit={handleOnSubmit}>
							<TextField
								inputRef={tagRef}
								style={{ width: 400, marginTop: "35px" }}
								variant='standard'
								sx={{ margin: "1rem 0" }}
								margin='none'
								placeholder={tags.length < 4 ? "Tags" : ""}
								InputProps={{
									startAdornment: (
										<Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
											{tags.map((data, index) => {
												return (
													<Tags
														data={data}
														handleDelete={handleDelete}
														key={index}
													/>
												);
											})}
										</Box>
									),
								}}
							/>
						</form>
					</Box>
					<Counter />
					<br />
					<Button
						variant='contained'
						style={{
							backgroundColor: "#677eff",
							color: "#FFFFFF",
							marginTop: "20px",
						}}
					>
						Submit
					</Button>
				</div>
			)}
		</div>
	);
}
