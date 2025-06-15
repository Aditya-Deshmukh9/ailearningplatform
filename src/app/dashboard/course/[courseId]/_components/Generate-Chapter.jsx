"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader, Play } from "lucide-react";
import React, { useState, useTransition } from "react";

function GenerateChapter({ courseId, courseData }) {
  const [loading, setLoading] = useState(false);
  console.log(courseData, courseId);

  const CreateCourseContent = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/course/chapter", {
        coursejson: courseData?.data?.coursejson,
        courseId,
      });
      console.log("Chapter creation response:", res.data);
    } catch (error) {
      console.error("Error generating chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={CreateCourseContent}
      disabled={loading}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
    >
      <Play className="h-5 w-5" />
      {loading ? <Loader className="animate-spin" /> : "Generate Chapters"}
    </Button>
  );
}

export default GenerateChapter;
