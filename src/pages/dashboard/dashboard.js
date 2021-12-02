import React, { useState, useEffect, useContext } from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useHistory } from "react-router";

import logo from "./logo.png";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	Redirect,
} from "react-router-dom";
import BookComponent from "../../components/Book";
import DueComponent from "../../components/Dues";
import { AuthContext, userAuth } from "../../AuthContext";
import RequestAndDonate from "../../components/RequestAndDonate";
import { Borrowal } from "../../components/Borrowal";
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

export const Dashboard = () => {
	const theme = useTheme();
	const [open, setOpen] = useState(true);
	const [user, setUser] = useState(null);
	const history = useHistory();
	const { isLoggedIn, userLoggedIn } = useContext(AuthContext);
	useEffect(() => {
		if (!isLoggedIn) {
			history.push("/error");
			console.log("no user");
		} else {
			console.log("user logged in");
			setUser(userLoggedIn);
		}
	}, []);

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
						<ListItem component={Link} to='/books' button key={"inbox"}>
							<ListItemIcon>
								<LibraryBooksIcon />
							</ListItemIcon>
							<ListItemText primary={"Books"} />
						</ListItem>
						<ListItem component={Link} to='/borrowal' button key={"inbox"}>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary={"Borrowal"} />
						</ListItem>
						<ListItem component={Link} to='/donate' button key={"inbox"}>
							<ListItemIcon>
								<CollectionsBookmarkIcon />
							</ListItemIcon>
							<ListItemText primary={"Donate/Request"} />
						</ListItem>
						<ListItem component={Link} to='/dues' button key={"inbox"}>
							<ListItemIcon>
								<AccountBalanceIcon />
							</ListItemIcon>
							<ListItemText primary={"Library Dues"} />
						</ListItem>
					</List>
				</Drawer>
				<Main open={open}>
					<DrawerHeader />
					<Switch>
						<Route path='/books'>
							<BookComponent />
						</Route>
						<Route path='/borrowal'>
							<Borrowal />
						</Route>
						<Route path='/dues'>
							<DueComponent />
						</Route>
						<Route path='/donate'>
							<RequestAndDonate />
						</Route>
						<Redirect to='/books' />
					</Switch>
				</Main>
			</Box>
		</Router>
	);
};
