import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({
			message: "Invalid Token",
		});
	}

	const [, token] = authToken.split(" ");

	try {
		(req as any).user = verify(token, "Mena");
		return next();
	} catch (error) {
		return res.status(401).json({
			message: "Token is invalid",
		});
	}
}
