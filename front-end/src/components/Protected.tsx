import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Protected = () => {
	const auth = useAuth();
	if (!auth?.user) return <Navigate to="/login" />;
	return <Outlet />;
};

export default Protected;
