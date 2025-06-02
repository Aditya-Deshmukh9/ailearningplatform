import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);
    console.log(userId);

    const user = await User.findById({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "User Found",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user data", error: error.message },
      { status: 500 }
    );
  }
}
