import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/login.js";
import TaskPre from "./components/taskPage.js";
import SignUp from "./components/signup.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<BrowserRouter>
			<React.StrictMode>
				<Routes>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/"
						element={<App />}
					/>
					<Route
						path="/update/:id"
						element={<TaskPre />}
					/>
					<Route
						path="/signup"
						element={<SignUp />}
					/>
				</Routes>
			</React.StrictMode>
		</BrowserRouter>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
