import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://127.0.0.1:8181",
	timeout: 5000,
});

export async function request(
	url: string,
	method: string,
	creds: boolean,
	data?: object
) {
	return await axiosInstance({
		url: url,
		method: method,
		withCredentials: creds,
		signal: AbortSignal.timeout(5000),
		data: data,
	});
}

export function handleError(error: unknown): void {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			window.console.error(error.response);
		} else if (error.request) {
			window.console.error(error.request);
		} else {
			window.console.error("unexpected error: ", error);
		}
	} else {
		if (typeof error === "string") {
			window.console.error(error);
		} else if (error instanceof Error) {
			window.console.error(error.message);
		} else {
			window.console.error("unexpected error: ", error);
		}
	}
}
