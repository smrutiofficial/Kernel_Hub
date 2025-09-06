import { NextResponse } from "next/server";
import UserModel from "../../../../backend/models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../../../backend/lib/db/db";

export const POST = async (req) => {
  await connectDB();
  const { name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user)
      return NextResponse.status(400).json({ msg: "User already exists" });

    user = new UserModel({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Send welcome email
    await sendWelcomeEmail(email, name);
    // Create and return JWT token
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
