import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TaskPage() {
	const [tasks, setTasks] = useState([]);
	const [type, setType] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:5000/tasks")
			.then((response) => setTasks(response.data))
			.catch((error) => console.error(error));
	}, []);

	return <div className="task">This is supposed to be obe task info</div>;
}
