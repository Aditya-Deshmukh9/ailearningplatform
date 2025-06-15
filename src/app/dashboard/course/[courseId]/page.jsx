"use client";
import {
  Gift,
  Clock,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Play,
  Loader2,
  Loader,
} from "lucide-react";

import React, { useState, useEffect, use, useCallback } from "react";
import CourseDetailsHero from "./_components/Course-details-Hero";
import axios from "axios";

function CoursePage({ params }) {
  const { courseId } = use(params);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  // console.log(courseData);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/course/course?courseId=${courseId}`
      );
      setCourseData(res.data);
      setChapterData(res?.data?.data?.coursejson?.course?.chapters);
    } catch (error) {
      console.error("Failed to fetch course data", error);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleTopicCompletion = (chapterIndex, topicIndex) => {
    const topicId = `${chapterIndex}-${topicIndex}`;
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    setCompletedTopics(newCompleted);
  };
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader className="animate-spin size-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100  p-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}

        <CourseDetailsHero
          loading={loading}
          courseData={courseData}
          chapterData={chapterData}
          completedTopics={completedTopics}
          courseId={courseId}
        />

        {/* Course Timeline */}
        <div className="bg-white  rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Course Timeline
          </h2>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 to-gray-300 h-full rounded-full"></div>

            {!loading &&
              chapterData?.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className="relative mb-16">
                  {/* Chapter Header */}
                  <div className="flex justify-center mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg max-w-md w-full mx-4 relative z-10">
                      <div className="text-center">
                        <div className="text-sm opacity-90 mb-1">
                          Chapter {chapterIndex + 1}
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {chapter.chapterName}
                        </h3>
                        <div className="flex justify-between text-sm opacity-90">
                          <span>Duration: {chapter.duration}</span>
                          <span>{chapter.topics.length} Topics</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="space-y-6">
                    {chapter?.topics?.map((topic, topicIndex) => {
                      const topicId = `${chapterIndex}-${topicIndex}`;
                      const isCompleted = completedTopics.has(topicId);
                      const isEven = topicIndex % 2 === 0;

                      return (
                        <div
                          key={topicIndex}
                          className="relative flex items-center justify-center"
                        >
                          {/* Topic Card */}
                          <div
                            className={`flex items-center w-full max-w-4xl ${
                              isEven ? "flex-row" : "flex-row-reverse"
                            }`}
                          >
                            {/* Topic Content */}
                            <div
                              className={`w-5/12 ${
                                isEven ? "text-right pr-8" : "text-left pl-8"
                              }`}
                            >
                              <div
                                className={`bg-gradient-to-r ${
                                  isCompleted
                                    ? "from-green-50 to-green-100 border-green-300"
                                    : "from-gray-50 to-gray-100 border-gray-300"
                                } p-4 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}
                                onClick={() =>
                                  toggleTopicCompletion(
                                    chapterIndex,
                                    topicIndex
                                  )
                                }
                              >
                                <h4 className="font-semibold text-gray-900 mb-1">
                                  {topic}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {isCompleted
                                    ? "Completed"
                                    : "Click to mark as complete"}
                                </p>
                              </div>
                            </div>

                            {/* Topic Number/Status */}
                            <div className="w-2/12 flex justify-center relative z-10">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                                  isCompleted ? "bg-green-500" : "bg-gray-400"
                                } hover:scale-110 transition-transform duration-200 cursor-pointer`}
                                onClick={() =>
                                  toggleTopicCompletion(
                                    chapterIndex,
                                    topicIndex
                                  )
                                }
                              >
                                {isCompleted ? (
                                  <CheckCircle className="h-6 w-6" />
                                ) : (
                                  topicIndex + 1
                                )}
                              </div>
                            </div>

                            {/* Empty space for alternating layout */}
                            <div className="w-5/12"></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

            {/* Completion Reward */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 rounded-2xl shadow-lg text-center relative z-10">
                <Gift className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                <p className="text-green-100">You've completed the course!</p>
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                    🎓 Certificate Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
