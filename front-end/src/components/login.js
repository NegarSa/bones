import { Link } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// TODO: Switch to form actions

const Login = () => {
	const navigate = useNavigate();

	const handleSubmitEvent = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");
		if (email !== "" && password !== "") {
			axios
				.post("http://localhost:8181/api/users/login", {
					email: email,
					password: password,
				})
				.then((response) => {
					console.log(response);
					if (response.status === 200) {
						alert("Logined!");
						navigate("/");
					}
				})
				.catch((error) => console.error(error));
		}
	};

	return (
		<div className="wrapper">
			<h1 className="title-text">Sign in!</h1>
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
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						aria-describedby="user-password"
						aria-invalid="false"
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
			<Link to="/signup">Don't have an accout? Sign Up!</Link>
		</div>
	);
};

export default Login;
