import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TaskList from "./components/taskList";
import Header from "./components/navBar";
import Footer from "./components/footer";
import Login from "./components/login";
import DayType from "./components/sideBar";
import TaskPage from "./components/taskPage";
import SignUp from "./components/signup";
import "./styles/App.css";

function App() {
	const [token, setToken] = useState(0);

	return (
		<div className="Main">
			<Header />

			<div className="body row scroll-y">
				<div className="App">
					<div className="left-col">
						<DayType />
					</div>

					<div className="right-col">
						<BrowserRouter>
							<Routes>
								<Route
									path="/"
									element={<TaskList />}
								/>
								<Route
									path="/login"
									element={<Login />}
								/>
								<Route
									path="/signup"
									element={<SignUp />}
								/>
								<Route
									path="/task/:id"
									element={<TaskPage />}
								/>
							</Routes>
						</BrowserRouter>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
