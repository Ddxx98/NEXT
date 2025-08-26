import { SignToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { email, password } = await req.json();

    if (email !== "deexith@gmail.com" && password !== "deexith123") {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await SignToken({ email, role: "user" });
    const res = NextResponse.json({ message: "Login successful" }, { status: 200 });
    res.cookies.set("token", token, { httpOnly: true, maxAge: 60 * 60, path: "/" });
    return res;
}