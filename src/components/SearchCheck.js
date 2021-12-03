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

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Select,FormControl,InputLabel,MenuItem } from '@mui/material';

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

const options_author =  [
	"Thomas H Cormen",
	"Charles E Leiserson",
	"Ronald L",
	"Rivest Clifford Stein",
	"braham Silberschatz", "Peter B Galvin", "Greg Gagne",
]

const options = [
	"Author","Book Name","Tags"
]

const options_book_name = [
	"Introduction To Algorithms",
	"Operating System Concepts",

]

const options_tag = [
	"Algorithms", "DSA", "Computer Science",
	"OS",  "Design",
]

const Search = () => {

	const [value,setValue]=useState('');
	const handleSelect=(e)=>{
		console.log(e);
		setValue(e)
	}
	console.log(value)
	return <div className="d-flex flex-row">
		<h3>Search : </h3>
		
		<FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
			
		<InputLabel id="demo-simple-select-label">Select Search Preference</InputLabel>
		<Select
			labelId="demo-simple-select-label"
			id="demo-simple-select"
			onChange={handleSelect}
			label="Select Search Preference"
		>
			<MenuItem value={1}>Author</MenuItem>
			<MenuItem value={2}>Book Name</MenuItem>
			<MenuItem value={3}>Tags</MenuItem>
		</Select>
		</FormControl>
			
		<br/><br/>
			<Autocomplete
				sx={{
				display: 'inline-block',
				'& input': {
					width: 200,
					bgcolor: 'background.paper',
					color: (theme) =>
					theme.palette.getContrastText(theme.palette.background.paper),
				},
				}}
				
				id="custom-input-demo"
				
				options={(() => 
				{
					if (value==1) 
					{
					  return (options_author)
					} 
					else if (value==2) 
					{
					  return (options_book_name)
					} 
					else 
					{
					  return (options_tag)
					}
				  })()}
			
				//options={options_author}
				//options={data_dropdown}
				style={{width: 500}}
				multiple
				
				renderInput={(params) => (
				<div ref={params.InputProps.ref}>

					
					<TextField
						{...params}
						variant="standard"
						placeholder="Select Your Choice"
					/>
				</div>
				)}
			/>
		
			<br/>
	</div>;
};

const BookSearch = (props) => {
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

export default BookSearch;
