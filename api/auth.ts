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
	console.log(req.cookies);
	if (!req.signedCookies["jwt"]) return null;
	if (jwt.decode(req.signedCookies["jwt"])) {
		const upayload = jwt.decode(req.signedCookies["jwt"]) as userJWT;
		return upayload.user as User;
	} else {
		return null;
	}
}
