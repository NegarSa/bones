import { Link } from "react-router-dom";
import { useAuth } from "./authContext";
import "../styles/navBar.css";

export default function Header() {
	const { user } = useAuth();
	const displayUser = () => {
		if (user !== "") {
			return user;
		} else {
			return "Please sign in ";
		}
	};
	return (
		<header>
			<nav>
				<img
					src="https://i.ibb.co/4nTc7Td4/android-chrome-192x192.png"
					alt="android-chrome-192x192"
					border="0"
					width="50px"
				/>
				<span className="title">Bones?</span>
				<span className="username">Hi {displayUser()}!</span>
			</nav>
		</header>
	);
}
