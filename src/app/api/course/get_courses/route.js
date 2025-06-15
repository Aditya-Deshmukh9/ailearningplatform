"use server";
import { connectDB } from "@/db/connectDB";
import { getDataFromToken } from "@/helper/getDataFromToken";
import Course from "@/models/courseModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);

    const courses = await Course.find(
      { creatorId: userId },
      "coursejson course_title courseImage"
    );

    console.log(userId, courses);

    return NextResponse.json(
      { message: "Successfully get course", data: courses },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
