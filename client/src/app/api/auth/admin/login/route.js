import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Admin from "../../../../backend/models/Admin.model";
import connectDB from "../../../../backend/lib/db/db";

export const POST = async (req) => {
  const { email, password } = req.body;
  try {
    await connectDB();
    const user = await Admin.findOne({ email });
    if (!user) return NextResponse.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, "secretToken", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      NextResponse.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    return new NextResponse('Server error', { status: 500 });
  }
};
