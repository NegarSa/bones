import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./components/authContext";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/index.css";
import App from "./App";
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<React.StrictMode>
			<BrowserRouter>
				<AuthProvider>
					<App />
				</AuthProvider>
			</BrowserRouter>
		</React.StrictMode>
	</>
);
