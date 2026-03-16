import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

// Hardcoded demo credentials — replace with a real DB lookup in production
const DEMO_USER = {
  userId:   "demo-001",
  email:    "student@example.com",
  password: "password123", // NEVER store plain-text passwords in production
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ userId: DEMO_USER.userId, email: DEMO_USER.email });

  const res = NextResponse.json({ success: true });
  res.cookies.set("auth_token", token, {
    httpOnly: true,       // Not accessible from JavaScript — prevents XSS theft
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60,   // 1 hour
    path:     "/",
  });
  return res;
}
