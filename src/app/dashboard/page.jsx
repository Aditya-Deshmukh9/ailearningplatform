"use client";
import CreateCourseDailog from "@/components/dashboard/CreateCourse/CreateCourseDailog";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "http://localhost:3000/api/course/get_courses"
      );

      setCourses(res?.data?.data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="p-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-pink-500 rounded-xl">
        <h2 className="font-bold text-2xl text-white">
          Welcome to Online Learning Platform
        </h2>
        <p>Learn, Create and Explore Your Favorite Courses</p>
        <p className="text-white"></p>
      </div>
      <div>
        <p className="font-bold py-2 text-2xl">Courses List</p>
        {courses?.length === 0 ? (
          <div className="flex flex-col px-4 py-6 bg-muted/50">
            <div className="flex flex-col items-center gap-6">
              <div className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[360px] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBg5D4AWawzJdnNxij3zzgwjUfz47GibXOF-1fcOm1ZP0_u9Vg2dneF42FQFSNB1S0vqa3x-RCnepOPLfxC_WgPpvmsggpRs_AWrKa3bkHlvnFPhyifWyerc9DF3VGd2sN-oDT6GgHqkFZiFQYJZf-KB8iqXDBWiJiLRSj8fRWsEpurHqATMMWMwng2IcC7k52hUCpUBC6F-ATOSDbyJO1Xz4wNhO6TFEsCueGx8MVJJJptKz6Y5ZDemOqJFzMaXgYsu0U_pEuZDyI')]"></div>
              <div className="flex max-w-[480px] flex-col items-center gap-2">
                <p className="text-[#101719] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                  You haven't created any courses yet
                </p>
                <p className="text-[#101719] dark:text-white/75 text-sm font-normal leading-normal max-w-[480px] text-center">
                  Start sharing your knowledge with the world.
                </p>
              </div>
              <CreateCourseDailog btnText="Create New Course" />
            </div>
          </div>
        ) : (
          <div className="grid auto-rows-min gap-5 md:grid-cols-3">
            {courses?.map((course) => (
              <Link
                href={`/dashboard/course/${course?._id}`}
                key={course._id}
                className="p-1 gap-1 flex flex-col"
              >
                <div className="aspect-video w-full">
                  <Image
                    src={course?.courseImage?.url || "/design1.png"}
                    alt="desgin"
                    height={160}
                    width={284}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <div>
                  <p>{course.coursejson.course.name}</p>
                  <p className="font-light text-xs text-[#8cd3eb]">
                    {course.coursejson.course.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
