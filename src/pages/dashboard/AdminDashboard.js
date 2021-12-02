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
import MoneyIcon from '@mui/icons-material/Money';
import TextField from "@mui/material/TextField";
import AddBook from "../../components/AddBook";

import logo from "./logo.png";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	Redirect,
} from "react-router-dom";
import Search from "../../components/SearchComponent";
import ViewRequests from "../../components/ViewRequests";
import DonateBook from "../../components/DonateBook";
import SuggestBook from "../../components/Suggestions";
import Fines from "../../components/Fines";

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

export const Admin = () => {
	const theme = useTheme();

	const [open, setOpen] = React.useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Router basename='/admin'>
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
						<ListItem component={Link} to='/addbook' button key={"inbox"}>
							<ListItemIcon>
								<AccountBoxIcon />
							</ListItemIcon>
							<ListItemText primary={"Add book"} />
						</ListItem>
						<ListItem component={Link} to='/viewrequests' button key={"inbox"}>
							<ListItemIcon>
								<LibraryBooksIcon />
							</ListItemIcon>
							<ListItemText primary={"View Request"} />
						</ListItem>
						<ListItem component={Link} to='/searchuser' button key={"inbox"}>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary={"Search"} />
						</ListItem>
						<ListItem component={Link} to='/donate' button key={"inbox"}>
							<ListItemIcon>
								<CollectionsBookmarkIcon />
							</ListItemIcon>
							<ListItemText primary={"Donate/Suggest"} />
						</ListItem>
						<ListItem component={Link} to='/fines' button key={"inbox"}>
							<ListItemIcon>
								<MoneyIcon />
							</ListItemIcon>
							<ListItemText primary={"Fines"} />
						</ListItem>
					</List>
				</Drawer>
				<Main open={open}>
					<DrawerHeader />
					<Switch>
						<Route path='/addbook'>
							<AddBook />
						</Route>
						<Route path='/viewrequests'>
							<ViewRequests />
						</Route>
						<Route path='/searchuser'>
							<Search />
						</Route>
						<Route path='/donate'>
							<DonateBook />
							<SuggestBook />
						</Route>
						<Route path='/fines'>
							<Fines />
						</Route>

						<Redirect to='/addbook' />
					</Switch>
				</Main>
			</Box>
		</Router>
	);
};
