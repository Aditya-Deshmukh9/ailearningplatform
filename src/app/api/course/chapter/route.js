"use server";

import { connectDB } from "@/db/connectDB";
import Course from "@/models/courseModel";
import { chapterGenPrompt } from "@/utils/aiPrompt";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { NextResponse } from "next/server";

// Connect to DB
connectDB();

export async function POST(request) {
  try {
    const { coursejson, courseId } = await request.json();
    console.log(coursejson);

    // ✅ FIX: remove `await` from map()
    const promises = coursejson?.course?.chapters?.map(async (chapter) => {
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
              text: `${chapterGenPrompt}${JSON.stringify(
                chapter
              )}\n\nReturn only valid JSON. Do not include text, comments, or markdown.`,
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      const RawRes = response?.candidates[0]?.content?.parts[0]?.text;

      const cleaned = RawRes?.replace(/```json|```/g, "").trim();
      console.log("📦 Raw Gemini JSON Response:\n", cleaned);

      const JSONRes = JSON.parse(cleaned);

      const ytData = await GetYoutubeVideo(chapter?.chapterName);

      return {
        youtubeVideo: ytData,
        courseData: JSONRes,
      };
    });
    console.log("promises", promises);

    // ✅ Ensure it's an array before using Promise.all
    if (!Array.isArray(promises)) {
      return NextResponse.json(
        { message: "No chapters found in coursejson" },
        { status: 400 }
      );
    }

    const CourseContent = await Promise.all(promises);

    console.log("CourseContent", CourseContent);

    // Save to DB if needed
    const addDataToDB = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: {
          course_content: { courseId, CourseContent },
        },
      },
      { new: true }
    );
    console.log(addDataToDB);

    return NextResponse.json(
      { message: "Successfully generated course", data: CourseContent },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/course/chapter error:", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}

const YT_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const GetYoutubeVideo = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    maxResults: 4,
    type: "video",
    key: process.env.YOUTUBE_API_KEY,
  };

  const resp = await axios.get(YT_BASE_URL, { params });

  const ytVideoList = resp.data.items.map((item) => ({
    videoId: item.id?.videoId,
    title: item.snippet?.title,
  }));

  console.log(ytVideoList);

  return ytVideoList;
};
