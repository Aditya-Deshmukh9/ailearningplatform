import mongoose, { model } from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    course_title: {
      type: String,
      required: [true, "Course Title must required"],
    },
    course_desc: {
      type: String,
      required: [true, "Course Description must required"],
    },
    no_of_chapters: {
      type: Number,
    },
    defficulty_lvl: {
      type: String,
      enum: ["beginner", "moderate", "advanced"],
      default: "moderate",
    },
    courseImage: {
      type: {
        url: { type: String, required: true, trim: true },
        public_id: { type: String, required: true },
      },
      default: {
        url: "https://res.cloudinary.com/dz8p6pcha/image/upload/v1749472119/ailearning-images/dqndugem1h9trek71pk4.png",
        public_id: "ailearning-images/dqndugem1h9trek71pk4",
      },
    },
    course_content: {
      type: Object,
    },
    include_video: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
    },
    coursejson: {
      type: Object,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.models.courses || new model("courses", courseSchema);

export default Course;
