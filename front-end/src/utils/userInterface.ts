export default interface User {
	_id: string;
	username: string;
	email: string;
	frequency?: number;
	seed?: number;
}
