import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./login.js";

function TaskList(token, setToken) {
	const [tasks, setTasks] = useState([]);
	const [type, setType] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:8181/api/tasks")
			.then((response) => setTasks(response.data))
			.catch((error) => console.error(error));
	}, []);

	if (token) {
		return <Login setToken={setToken} />;
	}

	return (
		<>
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
		</>
	);
}

export default TaskList;
