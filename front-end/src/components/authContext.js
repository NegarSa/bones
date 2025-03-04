import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({});

	useEffect(() => {
		if (!user.username) {
			try {
				getUser();
			} catch {
				console.log("login!");
			}
		}
	});

	const loginUser = async (email, password) => {
		if (email !== "" && password !== "") {
			await axios
				.post(
					"http://localhost:8181/api/users/login",
					{
						email: email,
						password: password,
					},
					{
						withCredentials: true,
					}
				)
				.then((response) => {
					console.log(response);
					if (response.status !== 200) {
						console.error(response.status);
					}
					getUser();
				})
				.catch((error) => console.error(error));
		}
	};

	const getUser = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8181/api/users/read",
				{
					withCredentials: true,
				}
			);
			setUser(response.data);
			return response;
		} catch {
			(err) => {
				console.error(err);
			};
		}
	};

	async function logoutUser() {
		try {
			const response = await axios.get(
				"http://localhost:8181/api/users/clear",
				{
					withCredentials: true,
				}
			);
		} catch {
			(err) => {
				console.error(err);
			};
		}
	}
	return (
		<AuthContext.Provider value={{ user, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};
