import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import TextField from "@mui/material/TextField";

import logo from "./logo.png";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	Redirect,
} from "react-router-dom";
import BookComponent from "../../components/book";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-start",
}));

const FirstComponent = () => {
	return (
		<>
			<h2>Check Out</h2>
			<TextField
				id='book-name'
				label='Book Name'
				variant='standard'
				justifyContent='center'
				align='center'
				style={{ width: 400 }}
			/>
			<br />
			<TextField
				id='book-name'
				label='Book Name'
				variant='standard'
				justifyContent='center'
				align='center'
				style={{ width: 400 }}
			/>
			<br />
			<br />
			<Button variant='contained' style={{ background: "#677eff" }}>
				Submit
			</Button>
		</>
	);
};

const SecondComponent = () => {
	return (
		<>
			<h2>Second Component</h2>
			<Typography paragraph style={{ color: "red" }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
				non enim praesent elementum facilisis leo vel. Risus at ultrices mi
				tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
				tellus. Convallis convallis tellus id interdum velit laoreet id donec
				ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
				suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
				quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
				proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
				tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
				varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
				Lorem donec massa sapien faucibus et molestie ac.
			</Typography>
			<Typography paragraph>
				Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
				ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
				integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
				lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
				Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
				vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
				accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
				Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
				senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
				Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
				maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
				aliquam ultrices sagittis orci a.
			</Typography>
		</>
	);
};

export const Dashboard = () => {
	const theme = useTheme();

	const [open, setOpen] = React.useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Router basename='/dashboard'>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position='fixed' open={open} style={{ background: "#677eff" }}>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{ mr: 2, ...(open && { display: "none" }) }}
						>
							<MenuIcon />
						</IconButton>

						<Button onClick={handleDrawerClose} edge='start'>
							<img style={{ maxWidth: 40 }} src={logo} alt='logo' />
						</Button>

						<Typography sx={{ mx: 2 }} variant='h6'>
							NITC Library Management System
						</Typography>
						<Box sx={{ flexGrow: 1 }} />
						<IconButton color='inherit' aria-label='open drawer' edge='start'>
							<LogoutIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}
					variant='persistent'
					anchor='left'
					open={open}
				>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}></IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						<ListItem component={Link} to='/first' button key={"inbox"}>
							<ListItemIcon>
								<AccountBoxIcon />
							</ListItemIcon>
							<ListItemText primary={"Checkout"} />
						</ListItem>
						<ListItem component={Link} to='/books' button key={"inbox"}>
							<ListItemIcon>
								<LibraryBooksIcon />
							</ListItemIcon>
							<ListItemText primary={"Books"} />
						</ListItem>
						<ListItem component={Link} to='/first' button key={"inbox"}>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary={"Borrowal"} />
						</ListItem>
						<ListItem component={Link} to='/second' button key={"inbox"}>
							<ListItemIcon>
								<CollectionsBookmarkIcon />
							</ListItemIcon>
							<ListItemText primary={"inbox"} />
						</ListItem>
					</List>
				</Drawer>
				<Main open={open}>
					<DrawerHeader />
					<Switch>
						<Route path='/first'>
							<FirstComponent />
						</Route>
						<Route path='/books'>
							<BookComponent />
						</Route>
						<Redirect to='/first' />
					</Switch>
				</Main>
			</Box>
		</Router>
	);
};
