import { NextResponse } from "next/server";
import UserModel from "../../../backend/models/User.model";
import connectDB from "../../../backend/lib/db/db";
import { authenticate } from "../../../backend/middlewares/auth.middleware";

export const GET = authenticate(async (req) => {
  try {
    await connectDB();

    const foundUser = await UserModel.findById(req.user.id).select("-password");
    if (!foundUser) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    return NextResponse.json(foundUser);
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
});
