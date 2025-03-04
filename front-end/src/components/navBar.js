import { useAuth } from "./authContext";
import "../styles/navBar.css";
import { Link } from "react-router-dom";

export default function Header() {
	const { user } = useAuth();
	const auth = useAuth();
	const displayUser = () => {
		auth.getUser;
		if (user.username) {
			return user.username;
		} else {
			return "please sign in";
		}
	};
	return (
		<header>
			<nav>
				<div className="logo">
					<img
						src="https://i.ibb.co/4nTc7Td4/android-chrome-192x192.png"
						alt="bones app logo"
						border="0"
						width="50px"
					/>
					<Link to="/">
						<span className="title">Bones?</span>
					</Link>
				</div>
				<div className="end-nav">
					<span className="username">Hi {displayUser()}!</span>
					<a
						className="logg"
						href={!user.username ? "/login" : "/logout"}
					>
						{!user.username ? "Login" : "LogOut"}
					</a>
				</div>
			</nav>
		</header>
	);
}
