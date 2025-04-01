import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { request, handleError } from "../utils/request";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [loggedin, setLoggedin] = useState(0);
	const [trig, setTrig] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		try {
			console.log("hi!");
			getUser();
		} catch {
			setLoggedin(0);
		}
	}, [trig, loggedin]);

	const loginUser = async (email: string, password: string) => {
		if (email !== "" && password !== "") {
			try {
				const res = await request("/api/users/login", "POST", true);
				if (res.status !== 200) {
					handleError(res.status.toString());
					return;
				}
			} catch (error) {
				handleError(error);
				return -1;
			}
		}
	};
}
// 	async function getUser() {
// 		try {
// 			const response = await axios.get("/api/users/read", {
// 				withCredentials: true,
// 			});
// 			if (response.status === 401) {
// 				setLoggedin(0);
// 				return 0;
// 			}
// 			setUser(response.data["user"]);
// 			setLoggedin(1);
// 			getTypeOfDay();

// 			return response;
// 		} catch {
// 			(err) => {
// 				setLoggedin(0);
// 				console.error(err);
// 			};
// 		}
// 	}

// 	async function logoutUser() {
// 		try {
// 			console.log("here");
// 			const response = await axios.get("/api/users/clear", {
// 				withCredentials: true,
// 			});
// 			setLoggedin(false);
// 		} catch {
// 			(err) => {
// 				console.error(err);
// 			};
// 		}
// 	}
// 	return ()
// 	// 	<AuthContext.Provider
// 	// 		value={{
// 	// 			user,
// 	// 			loggedin,
// 	// 			typeOfDay,
// 	// 			loginUser,
// 	// 			logoutUser,
// 	// 			setTrig,
// 	// 		}}
// 	// 	>
// 	// 		{children}
// 	// 	</AuthContext.Provider>)
// 	// );
// }

// // export const useAuth = () => {
// // 	return useContext(AuthContext);
// // };
