import React from "react";
import "./styles.css";
import { Dashboard } from "./pages/dashboard/dashboard";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login/login";

export default function App() {
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
				</Switch>
			</div>
		</Router>
	);
}
