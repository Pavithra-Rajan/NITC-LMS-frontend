import React from "react";
import logo from './logoblack.png';

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: "none",
        backgroundColor: "#677eff",
      },
      logonitc: {
        maxWidth: 50,
      },
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
 logo: {
    flexGrow: "0.2",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "15px",
    marginLeft: theme.spacing(10),
    "&:hover": {
      color: "white",
      borderBottom: "1px solid white",
    },

  },
  linksign: {
    borderRadius: 5,
        backgroundColor: "white",
        padding: "4px 6px",
        
        fontSize: "15px",
        marginLeft: theme.spacing(20),
        
    "&:hover": {
      color: "#ced6ff",
      borderBottom: "0.5px solid black",
    },

  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    
    <AppBar position="static" className={classes.root} >
      <CssBaseline />
      <Toolbar>
       <img src={logo} alt="logo" className={classes.logonitc} />
        <Typography variant="h5" className={classes.logo}>
          NITC Library Management System
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/profile/checkout" className={classes.link}>
              Checkout
            </Link>
            <Link to="/profile/request" className={classes.link}>
              Request/Donate
              
            </Link>
            <Link to="/profile/search" className={classes.link}>
              Search
            </Link>
            <Link to="/profile/return" className={classes.link}>
              Return
            </Link>
            <Link to="/profile/viewhistory" className={classes.link}>
              View History
            </Link>
            <Link to="/" className={classes.linksign}  >
              Log Out
            </Link>
          </div>
      </Toolbar>
    </AppBar>
    
  );
}
export default Navbar;