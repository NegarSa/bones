import axios from "axios";
import { createContext, useState } from "react";
import { useContext } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState("");

	const loginUser = async (email, password) => {
		console.log(email);
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
						console.log(response.status);
					}
					setUser(getUser(response));
				})
				.catch((error) => console.error(error));
		}
	};

	const getUser = async (response) => {
		try {
			const response = await axios.get(
				"http://localhost:8181/api/users/read",
				{
					withCredentials: true,
				}
			);
			return response.data;
		} catch {
			(err) => {
				console.log(err);
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
				console.log(err);
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
