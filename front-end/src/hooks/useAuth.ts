import { use } from "react";
import { AuthContext } from "../contexts/authContext";

export function useAuth() {
	return use(AuthContext);
}
