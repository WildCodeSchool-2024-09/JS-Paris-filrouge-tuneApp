import userRepository from "../user/userRepository";
import argon from "argon2";
import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { Secret } from "jsonwebtoken";
import type { User } from "../../types/user.type";

const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	try {
		const [[user]] = await userRepository.readUserByEmail(email);
		if (!user) res.sendStatus(404);
		else {
			const passwordMatch = await argon.verify(user.password, password);
			if (!passwordMatch) res.sendStatus(422);
			else {
				const token = jwt.sign(
					{ id: user.id },
					process.env.APP_SECRET as Secret,
					{ expiresIn: "1h" },
				);
				const refreshToken = jwt.sign(
					{ id: user.id },
					process.env.APP_SECRET as Secret,
					{
						expiresIn: "1m",
					},
				);
				user.token = token;
				res
					.cookie("refreshToken", refreshToken, {
						httpOnly: true,
						sameSite: "lax",
            secure: process.env.ENVIRONMENT === "prod"
					})
					.status(200)
					.json(user);
			}
		}
	} catch (error) {
		next(error);
	}
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			res.status(401).send("Access Denied. No refresh token provided.");
      return;
		}
		const decoded = <Partial<User>>(jwt.verify(refreshToken, process.env.APP_SECRET as Secret));
		const accessToken = jwt.sign(
			{ id: decoded.id},
			process.env.APP_SECRET as Secret,
			{
				expiresIn: "1h",
			},
		);
    const [[user]] = await userRepository.read(decoded.id as number);
    res.header("Authorization", accessToken).json(user);
	} catch (error) {
		next(error);
	}
};

const logout = async (req: Request, res: Response) => {
	res.clearCookie("refreshToken").sendStatus(200);
};

export default { login, refresh, logout };
