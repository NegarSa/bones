import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/utils/apiEndpoints";

export function useLogin(email: string, password: string) {
	return useMutation({
		mutationFn: async () => await userLogin({ email, password }),
	});
}
