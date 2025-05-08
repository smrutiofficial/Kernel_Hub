import { NextResponse } from "next/server";
import UserModel from "../../../backend/models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../../backend/lib/db/db";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json(); // read body
    const { email, password } = body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 400 });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secretToken", {
      expiresIn: "1h",
    });

    return NextResponse.json({ token });
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
