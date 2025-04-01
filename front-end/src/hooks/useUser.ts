import User from "../utils/userInterface";
import { userCheck } from "../utils/apiEndpoints";
("../utils/apiEndpoints");
import { useQuery } from "@tanstack/react-query";
import { request, handleError } from "../utils/request";

export function useUser() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["getUser"],
		queryFn: async () => request("/users/get", "GET", true),
	});
	if (isError) {
		handleError(error);
	}
}
