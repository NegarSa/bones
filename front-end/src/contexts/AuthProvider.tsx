import { ReactNode } from "react";
import { handleError } from "../utils/request";
import { AuthContext } from "./authContext";
import { useUserQuery } from "../hooks/useUserQuery";
import Login from "../pages/Login";
import Loading from "../components/Loading";

export function AuthProvider({ children }: { children: ReactNode }) {
	const currentUserQuery = useUserQuery();
	if (currentUserQuery.isPending) {
		return <Loading></Loading>;
	}
	if (currentUserQuery.isError) {
		handleError(currentUserQuery.error);
		return (
			<>
				error?
				<Login></Login>
			</>
		);
	}

	return <AuthContext value={currentUserQuery.data}>{children}</AuthContext>;
}
