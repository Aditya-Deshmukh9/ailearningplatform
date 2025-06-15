import { connectDB } from "@/db/connectDB";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const id = await request();
    console.log(id);
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging in", error: error.message },
      { status: 500 }
    );
  }
}
