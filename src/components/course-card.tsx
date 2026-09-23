import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onUnenroll?: (courseId: string) => void;
};

export function CourseCard({ course, student, enrolledAt, onUnenroll }: CourseCardProps) {
  // เช็คว่าวิชานี้ลงทะเบียนแล้วหรือยัง (ถ้ามี enrolledAt แปลว่าลงทะเบียนแล้ว)
  const isEnrolled = Boolean(enrolledAt);

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base">{course.courseTitle}</CardTitle>
          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
          </CardDescription>
        </div>

        {/* 1. สถานะ Badge (ใช้ span แทน เพื่อเลี่ยงปัญหาไฟล์ badge.tsx หาย) */}
        {isEnrolled ? (
          <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-amber-200 text-amber-900 dark:bg-purple-900 dark:text-purple-100">
            ลงทะเบียนแล้ว
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-purple-200 text-purple-900 dark:bg-amber-900 dark:text-amber-100">
            เปิดรับ
          </span>
        )}
      </CardHeader>

      <CardContent className="flex items-end justify-between pt-2">
        {/* 2. แสดงข้อมูลนักศึกษาและเวลาเฉพาะตอนลงทะเบียนแล้วเท่านั้น */}
        <div className="text-xs text-muted-foreground space-y-1">
          {isEnrolled && (
            <>
              <p>
                ชื่อ นศ.: {student.firstName} {student.lastName}
              </p>
              <p>โปรแกรม: {student.program}</p>
              <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
            </>
          )}
        </div>

        {/* 3. ปุ่มยกเลิกการลงทะเบียน (ไอคอนถังขยะ) */}
        {isEnrolled && onUnenroll && (
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive/90"
            onClick={() => onUnenroll(course.courseId)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}