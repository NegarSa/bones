import { useState, ReactNode } from "react";
import User from "../utils/userInterface";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "../utils/request";
import { userCheck } from "../utils/apiEndpoints";
import { AuthContext } from "./authContext";

interface props {
	children: ReactNode;
}
export function AuthProvider({ children }: props) {
	const [user, setUser] = useState<User | null>(null);
	const [trig, setTrig] = useState<boolean>(false);

	const userQuery = useQuery({
		queryKey: ["getUser", trig],
		queryFn: userCheck,
	});
	if (userQuery.isError) {
		handleError(userQuery.error);
		setUser(null);
	}
	if (userQuery.isSuccess) {
		setUser(userQuery.data.data as User);
	}

	// const loginUser = async (email: string, password: string) => {
	// 	if (email !== "" && password !== "") {
	// 		try {
	// 			const res = await request("/api/users/login", "POST", true);
	// 			if (res.status !== 200) {
	// 				handleError(res.status.toString());
	// 				return;
	// 			}
	// 		} catch (error) {
	// 			handleError(error);
	// 			return -1;
	// 		}
	// 	}
	// };

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
	return <AuthContext value={{ user, setTrig }}>{children}</AuthContext>;
}
