import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TaskList from "./components/taskList";
import Header from "./components/navBar";
import Footer from "./components/footer";
import Login from "./components/login";
import DayType from "./components/sideBar";
import TaskPage from "./components/taskPage";
import NewTask from "./components/newTask";
import SignUp from "./components/signup";
import Dashboard from "./components/dashboard";

import "./styles/App.css";

function App() {
	return (
		<div className="Main">
			<Header />

			<div className="body row scroll-y">
				<div className="App">
					<div className="left-col">
						<DayType />
					</div>

					<div className="right-col">
						<Routes>
							<Route
								path="/dashboard"
								element={<Dashboard />}
							/>
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
								path="/task/new"
								element={<NewTask />}
							/>
							<Route
								path="/task/:id"
								element={<TaskPage />}
							/>
						</Routes>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
