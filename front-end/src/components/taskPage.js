//import "./App.css";
// import HeaderBar from "./headerbar.js";
//import Body from "./body.js";
// import Footer from "./footer.js";

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [tasks, setTasks] = useState([]);
	const [type, setType] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:5000/tasks")
			.then((response) => setTasks(response.data))
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="App">
			<h1>Hi! Sample UI</h1>
			<ul>
				{tasks.map((task) => (
					<li key={task._id}> {task.action} </li>
				))}
			</ul>
		</div>
	);
}

export default App;
