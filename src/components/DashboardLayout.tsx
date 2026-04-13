import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/mock-data";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  title: string;
}

export function DashboardLayout({ children, role, title }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar role={role} />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 glass-strong">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="font-heading font-semibold text-lg">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-destructive rounded-full text-[8px] text-destructive-foreground flex items-center justify-center">3</span>
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
