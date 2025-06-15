import axios from "axios";

export async function CourseCreateAction(prvState, formData) {
  const course_title = formData.get("course_title");
  const course_desc = formData.get("course_desc");
  const no_of_chapters = formData.get("no_of_chapters");
  const include_video = formData.get("include_video") === "on";
  const defficulty_lvl = formData.get("defficulty_lvl");
  const category = formData.get("category");

  if (!course_title || !course_desc || !category) {
    return { success: false, message: "Please fill details having *" };
  }
  console.log(include_video);

  try {
    const res = await axios.post("http://localhost:3000/api/course/course", {
      course_title,
      course_desc,
      category,
      no_of_chapters,
      include_video,
      defficulty_lvl,
    });

    return { success: true, message: res?.data?.message, data: res };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went Wrong",
    };
  }
}
