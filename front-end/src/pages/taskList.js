import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authContext.js";
import { Link, Navigate } from "react-router-dom";

import Login from "./login.js";
import Task from "./task.js";
import "../styles/tasklist.css";

export default function TaskList(token, setToken) {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(1);
	const { user, loggedin } = useAuth();
	useEffect(() => {
		axios
			.get("/api/tasks/tasks")
			.then((response) => {
				setTasks(response.data);
				setLoading(0);
			})
			.catch((error) => console.error(error));
	}, []);

	if (!loggedin && !loading) {
		return <Login />;
	}
	if (loading) {
		return <>Loading! Please wait! </>;
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
