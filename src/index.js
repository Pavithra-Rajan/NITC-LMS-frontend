import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./AuthContext";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
	// <React.StrictMode>
	<AuthProvider>
		<App />
	</AuthProvider>,
	// </React.StrictMode>,
	rootElement
);
