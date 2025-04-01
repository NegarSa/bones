import { request } from "./request";

export async function taskGetAll() {
	return await request("/api/tasks/get", "GET", true);
}
export async function taskGetAllToday() {
	return await request("/api/tasks/gettype", "GET", true);
}
export async function taskNew() {
	return await request("/api/tasks/new", "POST", true);
}
export async function taskEdit(id: string) {
	return await request(`/api/tasks/${id}`, "PUT", true);
}
export async function taskRemove(id: string) {
	return await request(`/api/tasks/${id}`, "DELETE", true);
}
export async function userLogin() {
	return await request("/api/users/login", "POST", true);
}
export async function userSignup() {
	return await request("/api/users/new", "POST", true);
}
export async function userSignout() {
	return await request("/api/users/clear", "GET", true);
}
export async function userCheck() {
	return await request("/api/users/read", "GET", true);
}
export async function userTypeOfDay() {
	return await request("/api/users/today", "GET", true);
}
export async function userEdit(id: string) {
	return await request(`/api/users/${id}`, "PUT", true);
}
export async function userRemove(id: string) {
	return await request(`/api/users/${id}`, "DELETE", true);
}
