import { useState } from "react";
import img from "./reptile.jpg";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Chip, Stack } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";

const toTitleCase = (str) => {
	return str
		.toLowerCase()
		.split(" ")
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
};

const Book = ({ book }) => {
	const color = { available: "success", borrowed: "danger" };
	return (
		<Card sx={{ maxWidth: 270 }}>
			<CardMedia component='img' alt='green iguana' height='140' image={img} />
			<CardContent>
				<Typography align='left' gutterBottom variant='h5' component='div'>
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
				{/* {Object.keys(book.availability).map((key, value) => (
					<Typography
						align='left'
						variant='caption'
						display='block'
						style={{ color: color.key }}
					>
						{toTitleCase(key)} : {book.availability[key]}
					</Typography>
				))}
				<Divider sx={{ my: 1 }} /> */}
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
				<Button sx={{ mt: 1 }} variant='outlined' fullWidth>
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

const BookComponent = (props) => {
	const initialData = [
		{
			authors: [
				"Thomas H Cormen",
				"Charles E Leiserson",
				"Ronald L",
				"Rivest Clifford Stein",
			],
			availability: {
				available: 5,
				borrowed: 5,
			},
			book_name: "Introduction To Algorithms",
			isbn: "9780070131439",
			publisher: "MIT Press",
			tags: ["Algorithms", "DSA", "Computer Science"],
		},
		{
			authors: ["braham Silberschatz", "Peter B Galvin", "Greg Gagne"],
			availability: {
				available: 5,
				borrowed: 5,
			},
			book_name: "Operating System Concepts",
			isbn: "9780470128725",
			publisher: "MIT Press",
			tags: ["Algorithms", "OS", "Computer Science", "Design"],
		},
		{
			authors: [
				"Thomas H Cormen",
				"Charles E Leiserson",
				"Ronald L",
				"Rivest Clifford Stein",
			],
			availability: {
				available: 5,
				borrowed: 5,
			},
			book_name: "Introduction To Algorithms",
			isbn: "9780070131439",
			publisher: "MIT Press",
			tags: ["Algorithms", "DSA", "Computer Science"],
		},
		{
			authors: ["braham Silberschatz", "Peter B Galvin", "Greg Gagne"],
			availability: {
				available: 5,
				borrowed: 5,
			},
			book_name: "Operating System Concepts",
			isbn: "9780470128725",
			publisher: "MIT Press",
			tags: ["Algorithms", "OS", "Computer Science", "Design"],
		},
		{
			authors: [
				"Thomas H Cormen",
				"Charles E Leiserson",
				"Ronald L",
				"Rivest Clifford Stein",
			],
			availability: {
				available: 5,
				borrowed: 5,
			},
			book_name: "Introduction To Algorithms",
			isbn: "9780070131439",
			publisher: "MIT Press",
			tags: ["Algorithms", "DSA", "Computer Science"],
		},
		{
			authors: ["braham Silberschatz", "Peter B Galvin", "Greg Gagne"],
			availability: {
				available: 5,
				borrowed: 5,
			},
			book_name: "Operating System Concepts",
			isbn: "9780470128725",
			publisher: "MIT Press",
			tags: ["Algorithms", "OS", "Computer Science", "Design"],
		},
		{
			authors: [
				"Thomas H Cormen",
				"Charles E Leiserson",
				"Ronald L",
				"Rivest Clifford Stein",
			],
			availability: {
				available: 5,
				borrowed: 5,
			},
			book_name: "Introduction To Algorithms",
			isbn: "9780070131439",
			publisher: "MIT Press",
			tags: ["Algorithms", "DSA", "Computer Science"],
		},
		{
			authors: ["braham Silberschatz", "Peter B Galvin", "Greg Gagne"],
			availability: {
				available: 5,
				borrowed: 5,
			},
			book_name: "Operating System Concepts",
			isbn: "9780470128725",
			publisher: "MIT Press",
			tags: ["Algorithms", "OS", "Computer Science", "Design"],
		},
	];
	const [book, setBook] = useState(initialData);
	return (
		<Box p={2}>
			<Search />
			<Grid container>
				{book.map((book) => (
					<Grid my={3} xs={3}>
						<Book book={book} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default BookComponent;
