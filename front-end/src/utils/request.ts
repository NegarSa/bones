import axios from "axios";

const axiosInstance = axios.create({
	timeout: 5000,
});

export async function request(url: string, method: string, creds: boolean) {
	try {
		const result = await axiosInstance({
			url: url,
			method: method,
			withCredentials: creds,
			signal: AbortSignal.timeout(5000),
		});
	} catch (error) {
		/* eslint-disable */
		if (axios.isAxiosError(error)) {
			if (error.response) {
			} else if (error.request) {
			} else {
			}
		} else {
			console.log("unexpected error: ", error);
			return "An unexpected error occurred";
		}
	}
	/* eslint-enable */
}
