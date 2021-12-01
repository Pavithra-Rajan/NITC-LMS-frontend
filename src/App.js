import React from "react";
import "./styles.css";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Admin } from "./pages/admin/admindash";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login/login";
import Loader from "./components/Loader"
export default function App() {
	const env = "prod";
	// const db_url =
	// 	"heroku pg:psql postgresql-opaque-59198 --app nitc-lms-backend";
	// let baseURL =
	// 	env === "prod"
	// 		? "https://nitc-lms-backend.herokuapp.com/api"
	// 		: "http://localhost:5000/api";
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
					<Route path='/loader'>
						<Loader />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
