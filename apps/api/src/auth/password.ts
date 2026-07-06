import bcrypt from "bcryptjs";

export async function verifyPassword(plain: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) throw new Error("ADMIN_PASSWORD_HASH não configurado.");
  return bcrypt.compare(plain, hash);
}
