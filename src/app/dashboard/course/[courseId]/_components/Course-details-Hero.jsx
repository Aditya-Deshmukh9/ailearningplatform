import React from "react";
import { Clock, BookOpen, TrendingUp } from "lucide-react";
import GenerateChapter from "./Generate-Chapter";

function CourseDetailsHero({
  loading,
  courseData,
  chapterData,
  completedTopics,
  courseId,
}) {
  const totalTopics = chapterData?.reduce(
    (sum, chapter) => sum + chapter.topics.length,
    0
  );
  const completedCount = completedTopics.size;
  const progressPercentage = (completedCount / totalTopics) * 100;

  const totalCourseDuration = chapterData
    ?.map((e) => parseFloat(e.duration))
    .reduce((acc, curr) => acc + curr, 0);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
      <div className="flex flex-col lg:flex-row">
        {/* Content */}
        <div className="flex-1 p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full mb-4">
              Programming Course
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {courseData?.data?.coursejson?.course.name}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {courseData?.data?.coursejson?.course.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-gray-900">
                  {totalCourseDuration || 0} Hours
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="p-2 bg-green-500 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Chapters</p>
                <p className="font-semibold text-gray-900">
                  {chapterData?.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="p-2 bg-orange-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Level</p>
                <p className="font-semibold text-gray-900">
                  {courseData?.data?.coursejson?.course.level}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Course Progress
              </span>
              <span className="text-sm text-gray-500">
                {completedCount || 0}/{totalTopics || 0} topics
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(progressPercentage)}% Complete
            </p>
          </div>

          {/* Action Button */}
          <GenerateChapter courseData={courseData} courseId={courseId} />
        </div>

        {/* Image */}
        <div className="lg:w-2/5 p-8 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl blur-lg opacity-30"></div>
            <img
              src={courseData?.data?.courseImage?.url}
              alt="Python Course"
              className="relative rounded-2xl shadow-xl object-cover w-full max-w-md h-72"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsHero;
