import { useAuth } from "./authContext";
import "../styles/navBar.css";

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
				<img
					src="https://i.ibb.co/4nTc7Td4/android-chrome-192x192.png"
					alt="android-chrome-192x192"
					border="0"
					width="50px"
				/>
				<span className="title">Bones?</span>
				<span className="username">Hi {displayUser()}!</span>
				<a
					className="logg"
					href={!user.username ? "/login" : "/"}
				>
					{!user.username ? "Login" : "LogOut"}
				</a>
			</nav>
		</header>
	);
}
