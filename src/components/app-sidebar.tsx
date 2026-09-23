import { BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { currentStudent } from "@/lib/mock-data";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">CPE & ISNE</div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ส่วนท้าย Sidebar (ใช้ HTML ปกติเลี่ยงปัญหาไฟล์คอมโพเนนต์หาย) */}
      <SidebarFooter className="p-3">
        {/* เส้นคั้น (แทน Separator) */}
        <hr className="mb-3 border-border" />
        
        <div className="flex items-center gap-3">
          {/* รูปโปรไฟล์ (แทน Avatar) */}
          <div className="h-9 w-9 overflow-hidden rounded-full bg-muted flex items-center justify-center">
            {currentStudent.avatar ? (
              <img
                src={currentStudent.avatar}
                alt={currentStudent.nickname}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-semibold">
                {currentStudent.nickname?.[0] || "U"}
              </span>
            )}
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-medium truncate">
              {currentStudent.nickname}
            </span>
            <span className="inline-flex items-center w-fit rounded-md px-1.5 py-0.2 text-[10px] font-semibold bg-primary/10 text-primary">
              {currentStudent.role || "STUDENT"}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}