// app/lib/auth.js
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

export async function SignToken(user) {
  const payload = {
    email: user.email,
    role: user.role || "user",
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

export async function VerifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
      clockTolerance: 5,
    });
    return payload;
  } catch (error) {
    return null;
  }
}
