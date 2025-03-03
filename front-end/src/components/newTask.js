import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useFormStatus } from "react-dom";
import "../styles/login.css";

export default function NewTask() {
	const navigate = useNavigate();
	const [task, setTask] = useState({});

	function postTask(formData) {
		axios
			.post("http://localhost:8181/api/tasks/tasks/", {
				action: formData.get("action"),
				description: formData.get("description"),
				deadline: formData.get("deadline"),
				type_of_day: formData.get("type_of_day"),
			})
			.then((response) => {
				console.log(response);
				navigate("/");
			})
			.catch((error) => console.log(error));
	}
	function Submit() {
		const { pending } = useFormStatus();
		return (
			<button
				type="submit"
				disabled={pending}
			>
				{pending ? "Submitting..." : "Submit"}
			</button>
		);
	}

	return (
		<>
			<form action={postTask}>
				<label>
					Action:
					<input
						name="action"
						type="text"
					/>
				</label>
				<label>
					Description:
					<input
						name="description"
						type="textbox"
					/>
				</label>

				<label>
					Type of day:
					<select name="type_of_day">
						<option value="bones">bones</option>
						<option value="no-bones">no bones</option>
					</select>
				</label>
				<label>
					Deadline:
					<input
						name="deadline"
						type="date"
					/>
				</label>
				<Submit />
			</form>
		</>
	);
}
