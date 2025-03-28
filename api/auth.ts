import jwt, { JwtPayload } from "jsonwebtoken";
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
	if (!req.signedCookies["token"]) return null;
	if (jwt.decode(req.signedCookies["token"])) {
		const upayload = jwt.decode(req.signedCookies["token"]) as userJWT;
		return upayload.user as User;
	} else {
		return null;
	}
}
