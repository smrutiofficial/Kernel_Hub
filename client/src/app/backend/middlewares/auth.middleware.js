import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function authenticate(handler) {
  return async (req) => {
    const token = req.headers.get("x-auth-token");
    if (!token) {
      return NextResponse.json({ msg: "No token, authorization denied" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretToken");
      req.user = decoded.user; // Attach user to request
      return handler(req);     // Call actual route handler
    } catch (err) {
      console.error("Auth error:", err);
      return NextResponse.json({ msg: "Token is not valid" }, { status: 401 });
    }
  };
}
