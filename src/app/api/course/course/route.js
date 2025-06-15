"use server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { courseGenPrompt } from "@/utils/aiPrompt";
import Course from "@/models/courseModel";
import { connectDB } from "@/db/connectDB";
import { imageGen } from "@/utils/imageGen";

connectDB();

export async function GET(request) {
  try {
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    const data = await Course.findById({ _id: courseId });

    return NextResponse.json(
      { message: "Successfully get course", data: data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const userId = await getDataFromToken(request);

    const {
      course_title,
      course_desc,
      category,
      no_of_chapters,
      include_video,
      defficulty_lvl,
    } = await request.json();

    const userPrompt = courseGenPrompt(
      course_title,
      course_desc,
      category,
      no_of_chapters,
      include_video,
      defficulty_lvl
    );

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const config = {
      responseMimeType: "text/plain",
    };
    const model = "gemini-2.0-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: userPrompt,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const responseText = JSON.parse(
      response?.text?.replace("```json", "")?.replace("```", "")
    );

    if (!responseText) {
      return NextResponse.json(
        {
          message: "Not Avl generate Ai response",
        },
        {
          status: 400,
        }
      );
    }

    const GeneratedImage = await imageGen({
      imageGenInput: `${responseText?.course?.bannerImagePrompt}, aspect ratio 16:9, wide horizontal layout`,
    });

    const newCourse = await Course.create({
      course_title,
      course_desc,
      category,
      no_of_chapters,
      include_video,
      defficulty_lvl,
      courseImage: GeneratedImage,
      coursejson: responseText,
      creatorId: userId,
    });

    return NextResponse.json({
      message: "Course created Successfully",
      response: newCourse,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
