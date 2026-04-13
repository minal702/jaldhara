import {
  Droplets, LayoutDashboard, Truck, MapPin, Users, ClipboardList,
  BarChart3, Settings, LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { UserRole } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const menuItems: Record<UserRole, { title: string; url: string; icon: React.ComponentType<any> }[]> = {
  user: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Book Tanker", url: "/dashboard/book", icon: Truck },
    { title: "My Bookings", url: "/dashboard/bookings", icon: ClipboardList },
    { title: "Track Delivery", url: "/tracking", icon: MapPin },
  ],
  driver: [
    { title: "My Deliveries", url: "/driver", icon: Truck },
    { title: "Live Tracking", url: "/tracking", icon: MapPin },
  ],
  admin: [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Bookings", url: "/admin/bookings", icon: ClipboardList },
    { title: "Drivers", url: "/admin/drivers", icon: Users },
    { title: "Tankers", url: "/admin/tankers", icon: Truck },
    { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    { title: "Live Map", url: "/tracking", icon: MapPin },
  ],
};

export function AppSidebar({ role }: { role: UserRole }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const items = menuItems[role];

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-3">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                <span className="font-heading font-bold text-lg text-primary">Jal Dhara</span>
              </div>
            )}
            {collapsed && <Droplets className="h-5 w-5 text-primary mx-auto" />}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-accent/50 transition-colors"
                      activeClassName="bg-accent text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate("/login")}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
