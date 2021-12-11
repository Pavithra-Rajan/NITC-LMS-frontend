import { useContext, useEffect, useState } from "react";
import img from "./reptile.jpg";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Chip, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import BookLoaderComponent from "./Loaders/BookLoader";

const toTitleCase = (str) => {
	return str
		.toLowerCase()
		.split(" ")
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
};

const Book = ({ book, requestBorrwal }) => {
	const color = { available: "success", borrowed: "danger" };
	const { user } = useContext(AuthContext);
	return (
		<Card sx={{ maxWidth: 270 }}>
			<CardMedia component='img' alt='green iguana' height='140' image={img} />
			<CardContent>
				<Typography
					align='left'
					gutterBottom
					variant='subheading1'
					component='div'
				>
					<strong>{book.book_name}</strong>
				</Typography>
				<Divider sx={{ my: 1 }} />
				<Typography
					align='left'
					gutterBottom
					variant='subheading1'
					component='div'
				>
					{book.publisher}
				</Typography>
				<Typography
					align='left'
					variant='caption'
					display='block'
					color='text.secondary'
				>
					{toTitleCase(book.authors.join(" , "))}
				</Typography>
				<Divider sx={{ my: 1 }} />
				{Object.keys(book.availability).map((key, value) => (
					<Box display='inline-flex' justifyContent='flex-start'>
						<Chip
							sx={{ mx: 1 }}
							label={toTitleCase(key) + " : " + book.availability[key]}
							size='small'
							variant='outlined'
							color={key == "available" ? "success" : "secondary"}
						/>
					</Box>
				))}
				<Button
					sx={{ mt: 1 }}
					variant='outlined'
					onClick={() => requestBorrwal(book.isbn)}
					fullWidth
				>
					Borrow
				</Button>
			</CardContent>
			<CardActions disableSpacing></CardActions>
		</Card>
	);
};

const Search = () => {
	return <div></div>;
};

const BookComponent = () => {
	const [book, setBook] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useContext(AuthContext);
	useEffect(() => {
		axios
			.get(`/book?userID=${user.user_id}`)
			.then((resp) => {
				console.log(axios.defaults);
				setBook(resp.data.data);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			})
			.catch((err) => console.log(err));
	}, [refresh]);
	const requestBorrwal = (isbn) => {
		setIsLoading(true);
		const config = {
			headers: { Authorization: `Bearer ${user.token}` },
		};
		const data = {};
		axios
			.post(`/user/${user.user_id}/borrow?isbn=${isbn}`, data, config)
			.then((resp) => {
				setRefresh(!refresh);
				setIsLoading(false);
				console.log(resp);
			})
			.catch((err) => console.log(err.response));
	};
	return (
		<>
			{isLoading ? (
				<BookLoaderComponent />
			) : (
				<Box p={2}>
					<Search />
					<Grid container>
						{book.map((book) => (
							<Grid my={3} xs={3}>
								<Book book={book} requestBorrwal={requestBorrwal} />
							</Grid>
						))}
					</Grid>
				</Box>
			)}
		</>
	);
};

export default BookComponent;