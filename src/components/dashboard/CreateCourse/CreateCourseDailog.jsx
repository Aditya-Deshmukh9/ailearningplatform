"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect } from "react";
import { CourseCreateAction } from "./CourseCreateAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function CreateCourseDialog({ btnText = "Create New Course" }) {
  const [message, handleAction, isPending] = useActionState(
    CourseCreateAction,
    {
      success: false,
      message: "",
      data: null,
    }
  );
  const router = useRouter();

  useEffect(() => {
    if (message.success) {
      toast(message?.message);
      router.push(`/dashboard/course/${message?.data?.data?.response?._id}`);
    }
  }, [message]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex min-w-[90px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">{btnText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form action={handleAction}>
          <DialogHeader>
            <DialogTitle className="text-[#0d181c] tracking-light text-2xl font-bold leading-tight">
              Create a New Course
            </DialogTitle>
            <DialogDescription className="text-[#0d181c] text-base font-normal leading-normal">
              Fill in the details below to create a new course. Ensure all
              fields are completed.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course_title" className="text-right">
                Course Title*
              </Label>
              <Input
                id="course_title"
                name="course_title"
                type="text"
                required
                placeholder="Enter course title"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="course_des" className="text-right pt-2">
                Description*
              </Label>
              <Textarea
                id="course_des"
                name="course_desc"
                required
                placeholder="Provide a brief description of the course"
                className="col-span-3"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chapters" className="text-right">
                Chapters
              </Label>
              <Input
                id="chapters"
                type="number"
                name="no_of_chapters"
                placeholder="Enter the number of chapters"
                className="col-span-3"
                min="1"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="include_video" className="text-right">
                Include Videos
              </Label>
              <div className="col-span-3">
                <Switch id="include_video" name="include_video" />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="difficulty" className="text-right">
                Difficulty Level
              </Label>
              <Select name="defficulty_lvl" id="difficulty">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category*
              </Label>
              <Input
                name="category"
                type="text"
                id="category"
                placeholder="e.g., Technology, Business"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              className="bg-[#34c3f3] text-[#0d181c] hover:bg-[#2ab5e6]"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Course"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCourseDialog;
