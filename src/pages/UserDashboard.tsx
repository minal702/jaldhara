import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockBookings } from "@/lib/mock-data";
import { Droplets, MapPin, Clock, CheckCircle, Truck, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const userBookings = mockBookings.filter((b) => b.userId === "U1" || b.userId === "U2");

const stats = [
  { label: "Total Bookings", value: userBookings.length, icon: Droplets, color: "text-primary" },
  { label: "Active", value: userBookings.filter((b) => ["pending", "accepted", "on_the_way"].includes(b.status)).length, icon: Truck, color: "text-warning" },
  { label: "Delivered", value: userBookings.filter((b) => b.status === "delivered").length, icon: CheckCircle, color: "text-success" },
  { label: "Avg ETA", value: "25 min", icon: Clock, color: "text-accent-foreground" },
];

export default function UserDashboard() {
  const [showBooking, setShowBooking] = useState(false);
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [priority, setPriority] = useState("normal");
  const navigate = useNavigate();

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !size) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Tanker booked successfully! You'll receive updates shortly.");
    setShowBooking(false);
    setLocation("");
    setSize("");
  };

  return (
    <DashboardLayout role="user" title="My Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Book / Booking Form */}
        <div className="lg:col-span-1">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-lg">Book a Tanker</h2>
              {!showBooking && (
                <Button size="sm" onClick={() => setShowBooking(true)}>
                  <Plus className="h-4 w-4 mr-1" /> New
                </Button>
              )}
            </div>
            {showBooking ? (
              <form onSubmit={handleBook} className="space-y-4">
                <div className="space-y-2">
                  <Label>Delivery Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter address" className="pl-9" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tanker Size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500L">500 Litres — ₹300</SelectItem>
                      <SelectItem value="1000L">1,000 Litres — ₹500</SelectItem>
                      <SelectItem value="2000L">2,000 Litres — ₹800</SelectItem>
                      <SelectItem value="5000L">5,000 Litres — ₹1,800</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="emergency">Emergency (₹200 extra)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 liquid-btn water-gradient-dark text-primary-foreground">
                    Confirm Booking
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowBooking(false)}>Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <Droplets className="h-12 w-12 text-primary/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">Need water? Book a tanker in seconds.</p>
                <Button onClick={() => setShowBooking(true)} className="liquid-btn water-gradient-dark text-primary-foreground">
                  <Plus className="h-4 w-4 mr-1" /> Book Now
                </Button>
              </div>
            )}
          </GlassCard>

          {/* Active Delivery */}
          {userBookings.filter((b) => b.status === "on_the_way").length > 0 && (
            <GlassCard className="p-6 mt-4">
              <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" /> Active Delivery
              </h3>
              {userBookings.filter((b) => b.status === "on_the_way").map((b) => (
                <div key={b.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{b.id}</span>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{b.location}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span className="font-medium text-primary">ETA: {b.eta}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Driver: {b.driverName}</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => navigate("/tracking")}>
                    Track <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </GlassCard>
          )}
        </div>

        {/* Booking History */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <h2 className="font-heading font-semibold text-lg mb-4">Booking History</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userBookings.map((b) => (
                    <TableRow key={b.id} className="hover:bg-accent/30 transition-colors">
                      <TableCell className="font-medium">{b.id}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{b.location}</TableCell>
                      <TableCell>{b.tankerSize}</TableCell>
                      <TableCell><StatusBadge status={b.priority} /></TableCell>
                      <TableCell><StatusBadge status={b.status} /></TableCell>
                      <TableCell>₹{b.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
