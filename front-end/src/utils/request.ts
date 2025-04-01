import axios from "axios";

const axiosInstance = axios.create({
	timeout: 5000,
});

export async function request(url: string, method: string, creds: boolean) {
	return await axiosInstance({
		url: url,
		method: method,
		withCredentials: creds,
		signal: AbortSignal.timeout(5000),
	});
}

export function handleError(error: unknown): void {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			console.error(error.response);
		} else if (error.request) {
			console.error(error.request);
		} else {
			console.error("unexpected error: ", error);
		}
	} else {
		if (typeof error === "string") {
			console.error(error);
		} else if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error("unexpected error: ", error);
		}
	}
}
