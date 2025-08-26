import { NextResponse } from "next/server";

export const POST = async () => {
  const res = NextResponse.json({ message: "Logout successful" }, { status: 200 });

  // Option A: helper
  // res.cookies.delete("token");

  // Option B: explicit clear with matching attributes
  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
};
