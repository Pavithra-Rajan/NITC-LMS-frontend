import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Chip, Stack } from "@mui/material";
import { Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import BookLoaderComponent from "./Loaders/BookLoader";

const Tags = ({ data, handleDelete }) => {
	//styling for the tags in the new form
	return (
		<Box
			sx={{
				background: "#677eff",
				height: "90%",
				display: "flex",
				margin: "0 0.5rem 0.5rem 0",
				justifyContent: "center",
				alignContent: "center",
				color: "#ffffff",
				borderRadius: 100,
			}}
		>
			<Stack direction='row' gap={1}>
				<Chip
					size='small'
					style={{ color: "white" }}
					label={data}
					onDelete={() => handleDelete(data)}
				/>
			</Stack>
		</Box>
	);
};

const Counter = ({ nums, handleCount }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				"& > *": {
					m: 1,
				},
			}}
		>
			<ButtonGroup
				variant='outlined'
				color='primary'
				aria-label='outlined button group'
			>
				<Button
					onClick={() => {
						handleCount("dec");
					}}
				>
					-
				</Button>
				<Button disabled style={{ color: "#000000" }}>
					{nums}
				</Button>
				<Button
					onClick={() => {
						handleCount("inc");
					}}
				>
					+
				</Button>
			</ButtonGroup>
		</Box>
	);
};

const AddNewBook = () => {
	const [tags, setTags] = useState([]);
	const [authors, setAuthors] = useState([]);
	const tagRef = useRef();
	const authorRef = useRef();

	const [ISBN, SetISBN] = useState("");
	const [Name, SetName] = useState("");
	const [Pub, SetPub] = useState("");
	const [nums, setNums] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSucess] = useState(false);
	const { user } = React.useContext(AuthContext);

	const handleSubmit = () => {
		setIsLoading(true);
		const data = {
			ISBN: ISBN,
			bookName: Name,
			publisher: Pub,
			authors: authors,
			tags: tags,
			nums: nums,
		};
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		axios
			.post(`/book/register`, data, config)
			.then((resp) => {
				setError(null);
				console.log(resp);
				setSucess(true);
				setIsLoading(false);
			})
			.catch((err) => {
				setSucess(false);
				console.log(err.response);
				setError(err.response.data.message);
				setIsLoading(false);
				console.log(error);
			});
	};

	const handleCount = (type) => {
		if (type === "inc") {
			setNums(nums + 1);
		} else if (type == "dec") {
			if (nums > 0) {
				setNums(nums - 1);
			}
		}
	};

	const handleDelete = (value) => {
		//deletion of tags

		const newtags = tags.filter((val) => val !== value);
		setTags(newtags);
	};
	const handleDeleteAuth = (value) => {
		//deletion of authors
		const NewAuth = authors.filter((val) => val !== value);
		setAuthors(NewAuth);
	};
	const handleOnSubmitAuth = (e) => {
		//adding new authors
		function titleCase(str) {
			str = str.toLowerCase().split(" ");
			for (var i = 0; i < str.length; i++) {
				str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
			}
			return str.join(" ");
		}
		e.preventDefault();
		setAuthors([...authors, titleCase(authorRef.current.value)]);
		authorRef.current.value = "";
	};
	const handleOnSubmitTags = (e) => {
		//adding new tags

		e.preventDefault();
		setTags([...tags, tagRef.current.value.toLowerCase()]);
		tagRef.current.value = "";
	};
	return (
		<>
			{isLoading ? (
				<BookLoaderComponent />
			) : (
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
					<Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
						<div
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleOnSubmitAuth(e);
								}
							}}
						>
							<TextField
								inputRef={authorRef}
								style={{ width: 400, marginTop: "35px" }}
								multiline={true}
								variant='standard'
								sx={{ margin: "1rem 0 ", width: "100%" }}
								margin='none'
								placeholder={authors.length < 4 ? "Authors" : ""}
							/>
							{authors.length > 0 && (
								<Box
									sx={{
										margin: "0 0.2rem 0 0",
										display: "flex",
										maxWidth: 400,
										flexWrap: "wrap",
									}}
								>
									{authors.map((data, index) => {
										return (
											<Tags
												data={data}
												handleDelete={handleDeleteAuth}
												key={index}
											/>
										);
									})}
								</Box>
							)}
						</div>
					</Box>

					<Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
						<div
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleOnSubmitTags(e);
								}
							}}
						>
							<TextField
								inputRef={tagRef}
								multiline={true}
								style={{ width: 400, marginTop: "20px", marginBottom: "25px" }}
								variant='standard'
								sx={{ margin: "1rem 0 ", width: "100%" }}
								margin='none'
								placeholder={tags.length < 4 ? "Tags" : ""}
							/>
							{tags.length > 0 && (
								<>
									<Box
										sx={{
											margin: "0 0.2rem 0 0",
											display: "flex",
											maxWidth: 400,
											flexWrap: "wrap",
										}}
									>
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
								</>
							)}
						</div>
					</Box>
					<br />

					<Counter nums={nums} handleCount={handleCount} />
					<br />
					<Button
						onClick={handleSubmit}
						variant='contained'
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
								book added succesfully
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

const AddOldBook = () => {
	const [ISBN, SetISBN] = useState("");
	const [Nums, SetNums] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSucess] = useState(false);
	const { user } = React.useContext(AuthContext);
	const handleSubmit = () => {
		setIsLoading(true);
		setSucess(false);
		setError(null);
		const data = {};
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		axios
			.post(`/book/add/${ISBN}?nums=${Nums}`, data, config)
			.then((resp) => {
				console.log(resp);
				setSucess(true);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.response.data.message);
				setIsLoading(false);
			});
	};
	return (
		<>
			{isLoading ? (
				<BookLoaderComponent />
			) : (
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
						id='Number'
						label='Numer Of Copies'
						variant='standard'
						justifyContent='center'
						align='center'
						style={{ width: 400, marginTop: "20px" }}
						value={Nums}
						onChange={(e) => {
							SetNums(e.target.value);
						}}
					/>
					<br />
					<Button
						onClick={handleSubmit}
						variant='contained'
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
								The book have been succesfully updated
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

export default function AddBook() {
	const [isNew, setIsNew] = useState(1); //default when component renders is New

	return (
		<div>
			<ButtonGroup color='primary' exclusive>
				<Button
					disabled={isNew}
					onClick={() => {
						setIsNew(1);
					}}
				>
					New
				</Button>
				<Button
					disabled={!isNew}
					onClick={() => {
						setIsNew(0);
					}}
				>
					Existing
				</Button>
			</ButtonGroup>
			{/*Conditional rendering when existing is selected*/}
			{isNew ? <AddNewBook /> : <AddOldBook />}
		</div>
	);
}
