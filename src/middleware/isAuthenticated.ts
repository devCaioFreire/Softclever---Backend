import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get Token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [, token] = authToken.split(" ");

  try {
    // Validate the token
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    // Recovery ID from the token and getting variable
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
