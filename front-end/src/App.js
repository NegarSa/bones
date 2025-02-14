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
		<>
			<div className="Main">
				<div className="header row">
					welcome to bones i'll fix this later
				</div>
				<div className="body row scroll-y">
					<div className="App">
						<div className="left-col">
							<div className="day-type-box">
								<h4>Today is a...</h4>
							</div>
						</div>

						<div className="right-col">
							<h1>Hi! Sample UI</h1>

							{tasks.map((task) => (
								<>
									<input
										type="checkbox"
										id={task._id}
									/>
									<label for={task._id}>{task.action}</label>
									<br></br>
								</>
							))}
						</div>
					</div>
				</div>
				<div className="footer row">
					bye from bones i'll fix this later
				</div>
			</div>
		</>
	);
}

export default App;
