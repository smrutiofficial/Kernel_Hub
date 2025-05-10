import { NextResponse } from 'next/server';
import UserModel from '../../../backend/models/User.model';
import bcrypt from 'bcryptjs';

export const PUT = async (req) => {
  const { name, email, password} = req.body;
  
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return NextResponse.status(404).json({ msg: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;

    // Handle image upload if a file is included
    if (req.file) {
      user.image = req.file.path; // Store the image URL from Cloudinary
    }

    // Update and hash password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    NextResponse.json({
      msg: "User updated successfully",
      user: { name: user.name, email: user.email, image: user.image }
    });
  } catch (err) {
    console.error(err);
    NextResponse.status(500).json({ msg: "Server error while updating user data" });
  }
};