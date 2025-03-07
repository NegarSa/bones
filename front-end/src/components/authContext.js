import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [loggedin, setLoggedin] = useState(0);
	const [typeOfDay, setTypeOfDay] = useState(0);
	const [trig, setTrig] = useState(0);
	const navigate = useNavigate();
	let tokenTimeOut;

	useEffect(() => {
		try {
			console.log("hi!");
			getUser();
			tokenTimeOut = setTimeout(
				handleTimeOut,
				Date.now() - Number(response.data["exp"]) * 1000
			);
		} catch {
			setLoggedin(0);
		}
	}, [trig, loggedin]);

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
					navigate("/");
				})
				.catch((error) => console.error(error));
		}
	};

	async function handleTimeOut() {
		await logoutUser();
		navigate("/login");
	}

	async function getUser() {
		try {
			const response = await axios.get(
				"http://localhost:8181/api/users/read",
				{
					withCredentials: true,
				}
			);
			if (response.status === 401) {
				setLoggedin(0);
				return 0;
			}
			setUser(response.data["user"]);
			setLoggedin(1);
			getTypeOfDay();

			return response;
		} catch {
			(err) => {
				setLoggedin(0);
				console.error(err);
			};
		}
	}

	function getTypeOfDay() {
		axios
			.get("http://localhost:8181/api/users/day", {
				withCredentials: true,
			})
			.then((response) => {
				if (response.status === 200) {
					setTypeOfDay(response.data);
				}
			})
			.catch((error) => {
				if (error.status === 401) {
					setLoggedin(0);
					console.log("not logged in");
				} else {
					console.error(error);
				}
			});
	}
	async function logoutUser() {
		try {
			console.log("here");
			const response = await axios.get(
				"http://localhost:8181/api/users/clear",
				{
					withCredentials: true,
				}
			);
			setLoggedin(0);
		} catch {
			(err) => {
				console.error(err);
			};
		}
	}
	return (
		<AuthContext.Provider
			value={{
				user,
				loggedin,
				typeOfDay,
				loginUser,
				logoutUser,
				setTrig,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};
