import jwt from "jsonwebtoken";
import { Request, Response } from 'express';


function Alea(seed) {
	if (seed === undefined) {
		seed = +new Date() + Math.random();
	}
	function Mash() {
		var n = 4022871197;
		return function (r) {
			for (var f, t, s, u = 0, e = 0.02519603282416938; u < r.length; u++)
				(s = r.charCodeAt(u)),
					(f = e * (n += s) - ((n * e) | 0)),
					(n =
						4294967296 * ((t = f * ((e * n) | 0)) - (t | 0)) +
						(t | 0));
			return (n | 0) * 2.3283064365386963e-10;
		};
	}

	var m = Mash(),
		a = m(" "),
		b = m(" "),
		c = m(" "),
		x = 1,
		y;
	(seed = seed.toString()), (a -= m(seed)), (b -= m(seed)), (c -= m(seed));
	a < 0 && a++, b < 0 && b++, c < 0 && c++;
	return function () {
		var y = x * 2.3283064365386963e-10 + a * 2091639;
		(a = b), (b = c);
		return (c = y - (x = y | 0));
	};
}

export default function authenticate(req: Request){
    if (!req.signedCookies["jwt"]) return null;
    if (jwt.decode(req.signedCookies["jwt"])) {
		return jwt.decode(req.signedCookies["jwt"])
	} else {
		return null
	}
}