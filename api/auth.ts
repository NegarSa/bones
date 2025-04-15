import jwt, {
	JwtPayload,
	JsonWebTokenError,
	TokenExpiredError,
} from "jsonwebtoken";
import { Request } from "express";
import { User } from "../models/users";

interface userJWT extends JwtPayload {
	user: {
		_id: string;
		username: string;
		email: string;
		frequency: number;
		seed: number;
	};
	iat: number;
	exp: number;
}

export default function authenticate(req: Request): User | null {
	const token = req.signedCookies["jwt"];
	if (!token) return null;

	try {
		const upayload = jwt.verify(token, process.env.key!) as userJWT;
		return upayload.user as User;
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			console.error("Token has expired");
		} else if (error instanceof JsonWebTokenError) {
			console.error("Invalid token:", error.message);
		} else if (error instanceof Error) {
			console.error("Unexpected error:", error.message);
		} else {
			console.error("Unknown error occurred");
		}
		return null;
	}
}
