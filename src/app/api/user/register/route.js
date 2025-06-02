import { NextResponse } from "next/server";
import { connectDB } from "@/db/connectDB";
import User from "@/models/userModel";

connectDB();

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Error registering user", error: error.message },
      { status: 500 }
    );
  }
}
