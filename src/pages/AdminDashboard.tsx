import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBookings, mockDrivers, mockTankers, mockUsers, areaWiseDemand, monthlyBookings, tankerUsage } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Users, Truck, Droplets, IndianRupee, Search, Star } from "lucide-react";
import { toast } from "sonner";

const adminStats = [
  { label: "Total Bookings", value: mockBookings.length, icon: Droplets, color: "text-primary" },
  { label: "Active Drivers", value: mockDrivers.filter((d) => d.status !== "offline").length, icon: Users, color: "text-success" },
  { label: "Available Tankers", value: mockTankers.filter((t) => t.status === "available").length, icon: Truck, color: "text-warning" },
  { label: "Revenue", value: "₹5.2L", icon: IndianRupee, color: "text-primary" },
];

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("bookings");

  const filteredBookings = mockBookings.filter((b) =>
    b.userName.toLowerCase().includes(search.toLowerCase()) ||
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssignDriver = (bookingId: string) => {
    toast.success(`Driver assigned to booking ${bookingId}`);
  };

  return (
    <DashboardLayout role="admin" title="Admin Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {adminStats.map((stat) => (
          <GlassCard key={stat.label} className="p-4 hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <GlassCard className="p-6 md:col-span-2">
          <h3 className="font-heading font-semibold mb-4">Monthly Revenue & Bookings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyBookings}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(208,35%,86%)" />
              <XAxis dataKey="month" stroke="hsl(205,20%,50%)" fontSize={12} />
              <YAxis stroke="hsl(205,20%,50%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(210,33%,97%)", border: "1px solid hsl(208,35%,86%)", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(205,54%,36%)" fill="hsl(205,54%,36%)" fillOpacity={0.2} />
              <Area type="monotone" dataKey="bookings" stroke="hsl(208,45%,78%)" fill="hsl(208,45%,78%)" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-heading font-semibold mb-4">Tanker Usage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={tankerUsage} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                {tankerUsage.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {tankerUsage.map((t) => (
              <span key={t.name} className="text-xs flex items-center gap-1">
                <span className="h-2 w-2 rounded-full" style={{ background: t.fill }} />
                {t.name}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6 mb-6">
        <h3 className="font-heading font-semibold mb-4">Area-wise Demand</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={areaWiseDemand}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(208,35%,86%)" />
            <XAxis dataKey="area" stroke="hsl(205,20%,50%)" fontSize={12} />
            <YAxis stroke="hsl(205,20%,50%)" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(210,33%,97%)", border: "1px solid hsl(208,35%,86%)", borderRadius: "8px" }} />
            <Bar dataKey="bookings" fill="hsl(205,54%,36%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="delivered" fill="hsl(208,45%,78%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Management Tabs */}
      <GlassCard className="p-6">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <TabsList>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="drivers">Drivers</TabsTrigger>
              <TabsTrigger value="tankers">Tankers</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <TabsContent value="bookings">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">{b.id}</TableCell>
                      <TableCell>{b.userName}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{b.location}</TableCell>
                      <TableCell>{b.tankerSize}</TableCell>
                      <TableCell><StatusBadge status={b.priority} /></TableCell>
                      <TableCell><StatusBadge status={b.status} /></TableCell>
                      <TableCell>{b.driverName || "—"}</TableCell>
                      <TableCell>
                        {b.status === "pending" ? (
                          <Select onValueChange={() => handleAssignDriver(b.id)}>
                            <SelectTrigger className="w-32 h-8"><SelectValue placeholder="Assign" /></SelectTrigger>
                            <SelectContent>
                              {mockDrivers.filter((d) => d.status === "available").map((d) => (
                                <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="text-xs text-muted-foreground">Assigned</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="drivers">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deliveries</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDrivers.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">{d.name}</TableCell>
                      <TableCell>{d.phone}</TableCell>
                      <TableCell className="text-xs">{d.license}</TableCell>
                      <TableCell><StatusBadge status={d.status} /></TableCell>
                      <TableCell>{d.totalDeliveries}</TableCell>
                      <TableCell className="flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" /> {d.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="tankers">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reg No</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Driver</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTankers.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.registrationNo}</TableCell>
                      <TableCell>{t.capacity}</TableCell>
                      <TableCell><StatusBadge status={t.status} /></TableCell>
                      <TableCell>{mockDrivers.find((d) => d.id === t.driverId)?.name || "—"}</TableCell>
                      <TableCell>{t.lastMaintenance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.phone}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{u.address}</TableCell>
                      <TableCell>{u.joinedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </GlassCard>
    </DashboardLayout>
  );
}
