import React, { useEffect, useState, createContext, useContext } from "react";
import { Admin } from "./pages/Dashboard/AdminDashboard";
import { Dashboard } from "./pages/Dashboard/Dashboard";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIN] = useState(false);
	useEffect(() => {
		let loggedInUser = localStorage.getItem("user");
		// setUser(JSON.parse(loggedInUser));
		console.log(loggedInUser);
		if (loggedInUser) {
			setUser(JSON.parse(loggedInUser));
			setIsLoggedIN(true);
		} else {
			loggedInUser = localStorage.getItem("admin");
			if (loggedInUser) {
				setUser(JSON.parse(loggedInUser));
				setIsLoggedIN(true);
			}
		}
	}, []);
	const authContextValues = { user, isLoggedIn };
	return (
		<AuthContext.Provider value={authContextValues}>
			{props.children}
		</AuthContext.Provider>
	);
};
