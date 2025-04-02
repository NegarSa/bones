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

	return <AuthContext value={{ user, setTrig }}>{children}</AuthContext>;
}
