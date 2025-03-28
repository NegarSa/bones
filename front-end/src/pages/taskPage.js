import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormStatus } from "react-dom";
import "../styles/login.css";

export default function TaskPage() {
	const { id } = useParams();
	const [task, setTask] = useState({});
	const [deadline, setDeadline] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`/api/tasks/${id}`)
			.then((response) => {
				setTask(response.data[0]);
				try {
					setDeadline(
						response.data[0].deadline.toString().substring(0, 10)
					);
				} catch {
					setDeadline(new Date().toISOString().split("T")[0]);
				}
			})
			.catch((error) => console.error(error));
	}, [id]);

	function updateTask(formData) {
		axios
			.put(`/api/tasks/${id}`, {
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

	async function deleteTask() {
		try {
			const r = await axios.delete(`/api/tasks/${id}`);
			console.log(r);
			navigate("/");
		} catch {
			console.log("fail");
		}
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
		<div className="wrappertask">
			<form action={updateTask}>
				<label>
					Action:
					<input
						name="action"
						type="text"
						defaultValue={task.action}
					/>
				</label>
				<label>
					Description:
					<input
						name="description"
						type="textbox"
						defaultValue={task.description}
					/>
				</label>

				<label>
					Type of day:
					<select
						className="selector"
						name="type_of_day"
					>
						<option value="bones">bones</option>
						<option value="no-bones">no bones</option>
					</select>
				</label>
				<label>
					Deadline:
					<input
						name="deadline"
						type="date"
						defaultValue={deadline}
					/>
				</label>
				<Submit />
			</form>
			<button
				className="deletebtn"
				onClick={deleteTask}
			>
				DELETE
			</button>
		</div>
	);
}
