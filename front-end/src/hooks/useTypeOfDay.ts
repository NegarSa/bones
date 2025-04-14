import { useQuery } from "@tanstack/react-query";
import { userTypeOfDay } from "@/utils/apiEndpoints";

export function useTypeOfDay() {
	return useQuery({
		queryKey: ["userTypeOfDay"],
		staleTime: 1000 * 60 * 60,
		queryFn: userTypeOfDay,
	});
}
