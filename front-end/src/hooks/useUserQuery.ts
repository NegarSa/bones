import { useQuery } from "@tanstack/react-query";
import { userCheck } from "../utils/apiEndpoints";

export function useUserQuery() {
	return useQuery({
		queryKey: ["getUser"],
		queryFn: userCheck,
		staleTime: 2,
	});
}
