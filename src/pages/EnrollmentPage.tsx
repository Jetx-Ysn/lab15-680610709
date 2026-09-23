import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments as initialEnrollments } from "@/lib/mock-data";

export default function EnrollmentPage() {
  // สร้าง State สำหรับเก็บข้อมูลการลงทะเบียน เพื่อให้หน้าจออัปเดตแบบ Real-time
  const [enrollmentsList, setEnrollmentsList] = useState(initialEnrollments);

  // ฟังก์ชันเพิ่มการลงทะเบียน (รับค่าจาก RegisterDialog)
  const handleRegister = (courseId: string, time: string) => {
    const newEnrollment = {
      studentId: currentStudent.studentId,
      courseId: courseId,
      enrolledAt: time,
    };
    setEnrollmentsList((prev) => [...prev, newEnrollment]);
  };

  // ฟังก์ชันยกเลิกการลงทะเบียน (รับ courseId จาก CourseCard)
  const handleUnenroll = (courseId: string) => {
    setEnrollmentsList((prev) =>
      prev.filter(
        (e) => !(e.studentId === currentStudent.studentId && e.courseId === courseId)
      )
    );
  };

  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
        </div>
        {/* ส่งฟังก์ชัน handleRegister เข้าไปใน Dialog */}
        <RegisterDialog onRegister={handleRegister} />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          // ค้นหาข้อมูลการลงทะเบียนจาก State ปัจจุบัน
          const enrollment = enrollmentsList.find(
            (e) => e.studentId === currentStudent.studentId && e.courseId === course.courseId
          );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              enrolledAt={enrollment?.enrolledAt} // ส่งวันที่ลงทะเบียน (ถ้ามี)
              onUnenroll={handleUnenroll} // ส่งฟังก์ชันยกเลิกการลงทะเบียน
            />
          );
        })}
      </div>

      {/* Footer แสดงข้อมูลนักศึกษาตามข้อกำหนดของโจทย์ */}
      <footer className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
        {currentStudent.studentId} {currentStudent.firstName} {currentStudent.lastName} — {currentStudent.program}
      </footer>
    </div>
  );
}