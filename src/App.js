import React from "react";
import "./styles.css";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Admin } from "./pages/Dashboard/AdminDashboard";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Error from "./pages/Error";
import { AuthProvider } from "./AuthContext";

export default function App() {
	const env = "prod";
	let baseURL = "http://localhost:5000/api";
	axios.defaults.baseURL = baseURL;
	axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/dashboard'>
						<Dashboard />
					</Route>
					<Route path='/admin'>
						<Admin />
					</Route>
					<Route path='/error'>
						<Error />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
