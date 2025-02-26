import { Link } from "react-router-dom";
import "../styles/navBar.css";
export default function Header() {
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
				<span>Option 1</span>
				<span>Option 2</span>
			</nav>
		</header>
	);
}
