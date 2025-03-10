import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

// TODO: Switch to form actions
export default function SignUp() {
	const navigate = useNavigate();
	const [input, setInput] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleSubmitEvent = async (e) => {
		e.preventDefault();
		if (input.username !== "" && input.password !== "") {
			await axios
				.post("/api/users/newuser", input)
				.then((response) => {
					alert("User created!");
					navigate("/login");
				})
				.catch((error) => console.error("Error creating user"));
		}
	};

	const handleInput = (e) => {
		const { name, value } = e.target;

		setInput((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="wrapper">
			<h1 className="title-text">Register!</h1>
			<form onSubmit={handleSubmitEvent}>
				<div className="form_control">
					<label htmlFor="user-email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="example@yahoo.com"
						aria-describedby="user-email"
						aria-invalid="false"
						onChange={handleInput}
					/>
					<div
						id="user-email"
						className="sr-only"
					>
						Please enter a valid username. It must contain at least
						6 characters.
					</div>
				</div>
				<div className="form_control">
					<label htmlFor="username">Username:</label>
					<input
						type="username"
						id="username"
						name="username"
						aria-describedby="user-name"
						aria-invalid="false"
						onChange={handleInput}
					/>
					<div
						id="user-name"
						className="sr-only"
					>
						your username should be more than 6 character
					</div>
				</div>
				<div className="form_control">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						aria-describedby="user-password"
						aria-invalid="false"
						onChange={handleInput}
					/>
					<div
						id="user-password"
						className="sr-only"
					>
						your password should be more than 6 character
					</div>
				</div>
				<button className="btn-submit">Submit</button>
			</form>
			<Link to="/login">Have an account? Sign in!</Link>
		</div>
	);
}
