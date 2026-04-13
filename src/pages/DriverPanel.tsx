import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockBookings } from "@/lib/mock-data";
import { Truck, MapPin, Clock, CheckCircle, Phone, Navigation } from "lucide-react";
import { toast } from "sonner";

const statusFlow = ["accepted", "on_the_way", "delivered"] as const;

export default function DriverPanel() {
  const [bookings, setBookings] = useState(
    mockBookings.filter((b) => b.driverId === "D2" || b.driverId === "D1").slice(0, 4)
  );

  const updateStatus = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const currentIdx = statusFlow.indexOf(b.status as any);
        if (currentIdx < statusFlow.length - 1) {
          const newStatus = statusFlow[currentIdx + 1];
          toast.success(`Status updated to ${newStatus.replace("_", " ")}`);
          return { ...b, status: newStatus };
        }
        return b;
      })
    );
  };

  const activeDeliveries = bookings.filter((b) => b.status !== "delivered");
  const completed = bookings.filter((b) => b.status === "delivered");

  const stats = [
    { label: "Active Jobs", value: activeDeliveries.length, icon: Truck, color: "text-warning" },
    { label: "Completed Today", value: completed.length, icon: CheckCircle, color: "text-success" },
    { label: "Total Deliveries", value: 189, icon: Truck, color: "text-primary" },
    { label: "Rating", value: "4.6 ★", icon: CheckCircle, color: "text-warning" },
  ];

  return (
    <DashboardLayout role="driver" title="Driver Panel">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="p-4">
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

      <h2 className="font-heading font-semibold text-lg mb-4">Assigned Deliveries</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {bookings.map((b) => (
          <GlassCard key={b.id} className="p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="font-heading font-semibold">{b.id}</span>
              <div className="flex gap-2">
                <StatusBadge status={b.priority} />
                <StatusBadge status={b.status} />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{b.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>{b.tankerSize} • ₹{b.amount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{b.userName}</span>
              </div>
              {b.eta && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Clock className="h-4 w-4" />
                  <span>ETA: {b.eta}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {b.status !== "delivered" && (
                <Button
                  size="sm"
                  className="flex-1 liquid-btn water-gradient-dark text-primary-foreground"
                  onClick={() => updateStatus(b.id)}
                >
                  {b.status === "accepted" && "Start Delivery"}
                  {b.status === "on_the_way" && "Mark Delivered"}
                  {b.status === "pending" && "Accept"}
                </Button>
              )}
              {b.status === "on_the_way" && (
                <Button size="sm" variant="outline">
                  <Navigation className="h-4 w-4 mr-1" /> Navigate
                </Button>
              )}
              {b.status === "delivered" && (
                <div className="flex items-center gap-2 text-sm text-success w-full justify-center">
                  <CheckCircle className="h-4 w-4" /> Delivered
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </DashboardLayout>
  );
}
