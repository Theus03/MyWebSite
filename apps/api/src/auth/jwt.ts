import jwt from "jsonwebtoken";

const SESSION_EXPIRY = "7d";

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não configurado.");
  return secret;
}

export function signToken(): string {
  return jwt.sign({ role: "admin" }, getSecret(), { expiresIn: SESSION_EXPIRY });
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}
