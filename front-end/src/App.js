import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/taskList";
import Header from "./components/navBar";
import Footer from "./components/footer";
import Login from "./components/login";
import DayType from "./components/sideBar";

function App() {
	const [tasks, setTasks] = useState([]);
	const [type, setType] = useState(false);
	const [token, setToken] = useState(0);

	return (
		<>
			<div className="Main">
				<Header />
				<div className="body row scroll-y">
					<div className="App">
						<div className="left-col">
							<DayType />
						</div>

						<div className="right-col">
							<TaskList
								token={token}
								setToken={setToken}
							/>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default App;
