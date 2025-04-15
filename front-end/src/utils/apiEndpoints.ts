import { request } from "./request";
import User from "./userInterface";
import Task from "./taskInterface";

export async function taskGetAll(): Promise<[Task]> {
	return await request("/api/tasks/get", "GET", true).then(
		(response) => response.data as [Task]
	);
}
export async function taskGetOne(id: string): Promise<Task> {
	return await request(`/api/tasks/${id}`, "GET", true).then(
		(response) => response.data as Task
	);
}
export async function taskGetAllToday() {
	return await request("/api/tasks/gettype", "GET", true);
}
export async function taskNew(data: Task): Promise<Task> {
	return await request("/api/tasks/new", "POST", true, data).then(
		(response) => response.data as Task
	);
}
export async function taskEdit(
	id: string,
	data: { status: boolean }
): Promise<Task> {
	return await request(`/api/tasks/${id}`, "PUT", true, data).then(
		(response) => response.data as Task
	);
}
export async function taskEditAll(id: string, data: Task): Promise<Task> {
	return await request(`/api/tasks/${id}`, "PUT", true, data).then(
		(response) => response.data as Task
	);
}
export async function taskRemove(id: string): Promise<Task> {
	return await request(`/api/tasks/${id}`, "DELETE", true).then(
		(response) => response.data as Task
	);
}
export async function userLogin(data: { email: string; password: string }) {
	return await request("/api/users/login", "POST", true, data);
}
export async function userSignup(data: User) {
	return await request("/api/users/new", "POST", true, data);
}
export async function userSignout() {
	return await request("/api/users/clear", "GET", true);
}
export async function userCheck(): Promise<User> {
	return await request("/api/users/read", "GET", true).then(
		(response) => response.data as User
	);
}
export async function userTypeOfDay() {
	return await request("/api/users/today", "GET", true).then((response) => {
		return response.data.type_of_day as number;
	});
}
export async function userEdit(id: string, data: User) {
	return await request(`/api/users/${id}`, "PUT", true, data).then(
		(response) => response.data as User
	);
}
export async function userRemove(id: string) {
	return await request(`/api/users/${id}`, "DELETE", true);
}
