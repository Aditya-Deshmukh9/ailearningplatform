"use server";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connectDB } from "@/db/connectDB";

connectDB();

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Here you would typically check the database for the user
    const user = await User.findOne({
      $or: [
        {
          email,
        },
        { username },
      ],
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    };

    // and verify the password. For simplicity, we'll just return a success message.
    const response = NextResponse.json(
      { message: "User logged in successfully", user },
      { status: 200 }
    );
    response.cookies.set("accessToken", accessToken, options);
    response.cookies.set("refreshToken", refreshToken, options);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging in", error: error.message },
      { status: 500 }
    );
  }
}
