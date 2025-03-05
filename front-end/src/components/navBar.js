import { useAuth } from "./authContext";
import "../styles/navBar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const auth = useAuth();
	async function logout() {
		await auth.logoutUser();
		navigate("/login");
	}
	function NavOptions() {
		if (user.username) {
			return (
				<div className="options">
					<button
						className="logg"
						onClick={logout}
					>
						Logout
					</button>
				</div>
			);
		} else {
			return (
				<div className="options">
					<Link to="/login">
						<button className="logg">Login</button>
					</Link>
				</div>
			);
		}
	}

	return (
		<header>
			<nav>
				<Link to="/">
					<div className="logo">
						<img
							src="https://i.ibb.co/4nTc7Td4/android-chrome-192x192.png"
							alt="bones app logo"
							border="0"
							width="50px"
						/>

						<span className="title">Bones?</span>
					</div>
				</Link>
				<div className="end-nav">
					<span className="username">
						Hi {user.username ? user.username : "please log in"}!
					</span>
					<NavOptions />
				</div>
			</nav>
		</header>
	);
}
