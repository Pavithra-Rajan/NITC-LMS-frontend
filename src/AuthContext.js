import React, { useEffect, useState, createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIN] = useState(false);
	const Logout = () => {
		setUser(null);
	};
	useEffect(() => {
		let loggedInUser = localStorage.getItem("user");
		console.log("from context");
		console.log(loggedInUser);
		if (loggedInUser) {
			setUser(JSON.parse(loggedInUser));
			setIsLoggedIN(true);
		}
	}, []);

	const LoginUser = () => {
		let loggedInUser = localStorage.getItem("user");
		console.log(loggedInUser);
		if (loggedInUser) {
			setUser(JSON.parse(loggedInUser));
			setIsLoggedIN(true);
		}
	};

	const authContextValues = { user, isLoggedIn, Logout, LoginUser };
	return (
		<AuthContext.Provider value={authContextValues}>
			{props.children}
		</AuthContext.Provider>
	);
};
