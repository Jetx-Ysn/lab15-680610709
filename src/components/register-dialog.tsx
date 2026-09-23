import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses, currentStudent, enrollments } from "@/lib/mock-data";

type RegisterDialogProps = {
  onRegister: (courseId: string, time: string) => void;
};

export function RegisterDialog({ onRegister }: RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };
  const [registrationTime, setRegistrationTime] = useState(getCurrentTime());

  // กรองเฉพาะวิชาที่นักศึกษาปัจจุบันยังไม่ได้ลงทะเบียน
  const availableCourses = courses.filter(
    (course) =>
      !enrollments.some(
        (e) =>
          e.studentId === currentStudent.studentId &&
          e.courseId === course.courseId
      )
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    if (!courseId) return; // ถ้าไม่ได้เลือกวิชา ให้ไม่ทำอะไร

    onRegister(courseId, registrationTime); // เรียก callback บันทึกการลงทะเบียน
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger asChild>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="studentId">รหัสนักศึกษา</Label>
            <Input id="studentId" value={currentStudent.studentId} readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input
              id="fullName"
              value={`${currentStudent.firstName} ${currentStudent.lastName}`}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseId">รหัสวิชา</Label>
            {/* เพิ่ม bg-background text-foreground เพื่อให้รองรับ Dark Mode เต็มรูปแบบ */}
            <select
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled className="bg-background text-foreground">
                -- เลือกวิชา --
              </option>
              {availableCourses.map((course) => (
                <option
                  key={course.courseId}
                  value={course.courseId}
                  className="bg-background text-foreground"
                >
                  {course.courseId} – {course.courseTitle}
                </option>
              ))}
            </select>
          </div>

          {/* เลือกเวลา (Input type="time") */}
          <div className="space-y-2">
            <Label htmlFor="timeInput">เวลาลงทะเบียน</Label>
            <Input
              id="timeInput"
              type="time"
              value={registrationTime}
              onChange={(e) => setRegistrationTime(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>
              ยืนยัน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}