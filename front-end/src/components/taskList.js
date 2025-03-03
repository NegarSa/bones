import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authContext.js";
import { Link } from "react-router-dom";

import Login from "./login.js";
import Task from "./task.js";
import "../styles/tasklist.css";

export default function TaskList(token, setToken) {
	const [tasks, setTasks] = useState([]);
	const { user } = useAuth();
	useEffect(() => {
		axios
			.get("http://localhost:8181/api/tasks/tasks")
			.then((response) => setTasks(response.data))
			.catch((error) => console.error(error));
	}, []);

	if (!user.username) {
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
			<Link to="/task/new">
				<button className="add-task"></button>
			</Link>
		</div>
	);
}
