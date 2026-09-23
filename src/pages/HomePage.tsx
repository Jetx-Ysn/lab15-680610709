import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentStudent } from "@/lib/mock-data";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 space-y-6">
      <Card className="w-full max-w-xl text-center bg-zinc-900 border-zinc-800 text-zinc-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Button 
            onClick={() => navigate("/enrollment")} 
            variant="secondary"
            className="cursor-pointer"
          >
            ไปหน้าลงทะเบียนเรียน
          </Button>
        </CardContent>
      </Card>

      <div className="text-sm text-zinc-400 mt-auto">
        จัดทำโดย {currentStudent.firstName} {currentStudent.lastName} รหัสนักศึกษา {currentStudent.studentId}
      </div>
    </div>
  );
}