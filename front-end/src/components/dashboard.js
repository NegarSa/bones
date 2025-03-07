import { useState, useEffect } from "react";
import axios from "axios";
import { useFormStatus } from "react-dom";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "./authContext";

export default function Dashboard() {
	const navigate = useNavigate();
	const auth = useAuth();
	const { user, loggedin } = useAuth();
	useEffect(() => {
		axios
			.get("http://localhost:8181/api/users/read")
			.then((response) => {
				if (response.data.email !== user.email) {
					return <>Log in to see your dashboard!</>;
				}
			})
			.catch((error) => {
				console.error(error);
				navigate("/");
			});
	}, []);

	async function updateUser(formData) {
		await axios
			.put(`http://localhost:8181/api/users/${user._id}`, {
				username: formData.get("username"),
				frequency: formData.get("frequency"),
			})
			.then((response) => {
				console.log(response);
				auth.setTrig(1);
				navigate("/");
			})
			.catch((error) => console.log(error));
	}

	async function deleteUser() {
		try {
			const r = await axios.delete(
				`http://localhost:8181/api/users/${id}`
			);
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

	if (!loggedin) {
		return <>Log in to see your dashboard!</>;
	}
	return (
		<div className="wrapperdash">
			<form action={updateUser}>
				<label>
					Username:
					<input
						name="username"
						type="text"
						defaultValue={user.username}
					/>
				</label>
				<label>
					Email:
					<input
						name="email"
						type="text"
						defaultValue={user.email}
						disabled={true}
					/>
				</label>

				<label>
					Frequency of no bones days, in a week:
					<select
						className="selector"
						name="frequency"
						defaultValue={2}
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="6">6</option>
					</select>
				</label>
				<Submit />
			</form>
			<button
				className="deletebtn"
				onClick={deleteUser}
			>
				DELETE
			</button>
		</div>
	);
}
