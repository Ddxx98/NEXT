export const POST = async (req) => {
    const res = NextResponse.json({ message: "Logout successful" }, { status: 200 });
    res.cookies.set("token", "", { httpOnly: true, maxAge: 0, path: "/" });
    return res;
}
