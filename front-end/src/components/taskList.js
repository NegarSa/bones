import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from "./login.js";
import Task from "./task.js";
import "../styles/tasklist.css";

export default function TaskList(token, setToken) {
	const [tasks, setTasks] = useState([]);
	const [type, setType] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:8181/api/tasks")
			.then((response) => setTasks(response.data))
			.catch((error) => console.error(error));
	}, []);

	if (!token) {
		return <Login setToken={setToken} />;
	}

	return (
		<div className="tasklist">
			{tasks.map((task) => (
				<Task
					className="task"
					task={task}
					key={task._id}
				/>
			))}
		</div>
	);
}
