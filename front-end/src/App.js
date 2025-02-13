import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [tasks, setTasks] = useState([]);
	const [type, setType] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:8181/api/tasks")
			.then((response) => setTasks(response.data))
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="App">
			<div class="w3-container w3-content">
				<div class="w3-row">
					<div class="w3-col m3">
						<div class="w3-card w3-round w3-white">
							<div class="w3-container">
								<h4 class="w3-center">Today is a...</h4>
							</div>
						</div>
					</div>

					<div class="w3-col m7">
						<div class="w3-container w3-card w3-white w3-round w3-margin">
							<h1>Hi! Sample UI</h1>
							<ul>
								{tasks.map((task) => (
									<li key={task._id}> {task.action} </li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
