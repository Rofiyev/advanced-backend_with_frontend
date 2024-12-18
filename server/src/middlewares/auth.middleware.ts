import { NextFunction, Request, Response } from "express";
import tokenService from "../services/token.service";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) res.status(500).json({ message: "Unauthorized" });

    const accessToken = authorization?.startsWith("Bearer ")
      ? authorization.split(" ").slice(-1)[0]
      : null;
    if (!accessToken) res.status(500).json({ message: "Invalid Token" });

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) res.status(500).json({ message: "Unauthorized" });

    req.user = userData;
    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    res.status(500).json({ message: errorMessage });
  }
};
