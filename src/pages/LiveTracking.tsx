import { useEffect, useState, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { mockBookings } from "@/lib/mock-data";
import { MapPin, Clock, Truck, Phone, Droplets, Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const activeBooking = mockBookings.find((b) => b.status === "on_the_way")!;

// Bangalore MG Road area coordinates
const DESTINATION: [number, number] = [12.9716, 77.5946];
const ROUTE_POINTS: [number, number][] = [
  [12.9550, 77.5750],
  [12.9580, 77.5780],
  [12.9610, 77.5810],
  [12.9635, 77.5840],
  [12.9660, 77.5870],
  [12.9680, 77.5895],
  [12.9695, 77.5920],
  [12.9710, 77.5935],
  [12.9716, 77.5946],
];

const tankerIcon = new L.DivIcon({
  html: `<div style="background:#2e6b8a;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.684-.949V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v12"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
  </div>`,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const destinationIcon = new L.DivIcon({
  html: `<div style="background:#dc2626;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="#dc2626"/></svg>
  </div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.panTo(center, { animate: true, duration: 0.5 });
  }, [center, map]);
  return null;
}

export default function LiveTracking() {
  const [routeIndex, setRouteIndex] = useState(0);
  const [etaMinutes, setEtaMinutes] = useState(15);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const tankerPos = ROUTE_POINTS[routeIndex];
  const traveledPath = ROUTE_POINTS.slice(0, routeIndex + 1);
  const remainingPath = ROUTE_POINTS.slice(routeIndex);
  const progress = ((routeIndex + 1) / ROUTE_POINTS.length) * 100;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRouteIndex((prev) => {
        if (prev >= ROUTE_POINTS.length - 1) {
          clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
      setEtaMinutes((prev) => Math.max(0, prev - 2));
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const isDelivered = routeIndex >= ROUTE_POINTS.length - 1;

  return (
    <DashboardLayout role="user" title="Live Tracking">
      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
        {/* Live Map */}
        <div className="lg:col-span-2">
          <GlassCard className="h-full relative overflow-hidden p-0">
            <MapContainer
              center={tankerPos}
              zoom={14}
              className="h-full w-full z-0 rounded-xl"
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapUpdater center={tankerPos} />

              {/* Traveled path */}
              <Polyline positions={traveledPath} color="#2e6b8a" weight={4} opacity={0.8} />
              {/* Remaining path */}
              <Polyline positions={remainingPath} color="#b8d4e8" weight={4} dashArray="8 8" opacity={0.6} />

              {/* Tanker marker */}
              <Marker position={tankerPos} icon={tankerIcon}>
                <Popup>
                  <strong>🚛 {activeBooking.driverName}</strong><br />
                  {activeBooking.tankerSize} Tanker<br />
                  {isDelivered ? "✅ Delivered!" : `ETA: ${etaMinutes} min`}
                </Popup>
              </Marker>

              {/* Destination marker */}
              <Marker position={DESTINATION} icon={destinationIcon}>
                <Popup>
                  <strong>📍 Delivery Location</strong><br />
                  {activeBooking.location}
                </Popup>
              </Marker>
            </MapContainer>

            {/* Map overlay legend */}
            <div className="absolute bottom-4 left-4 z-[1000] glass rounded-lg px-3 py-2 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#2e6b8a] animate-pulse" />
                <span className="text-foreground/80">{isDelivered ? "Delivered" : "Tanker Moving"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span className="text-foreground/80">Your Location</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Navigation className="h-3 w-3 text-primary" />
                <span className="text-foreground/80">Speed: ~40 km/h</span>
              </div>
            </div>

            {/* Status overlay */}
            {isDelivered && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] glass rounded-xl px-6 py-3 text-center">
                <p className="font-heading font-bold text-lg text-green-600">🎉 Tanker Arrived!</p>
                <p className="text-xs text-muted-foreground">Your water delivery is here</p>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Booking Details Sidebar */}
        <div className="space-y-4 overflow-y-auto">
          <GlassCard className="p-5">
            <h3 className="font-heading font-semibold mb-3">Delivery Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Booking ID</span>
                <span className="font-medium">{activeBooking.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge status={isDelivered ? "delivered" : activeBooking.status} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Priority</span>
                <StatusBadge status={activeBooking.priority} />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> ETA
            </h3>
            <div className="text-center py-4">
              <p className="text-4xl font-heading font-bold text-primary">
                {isDelivered ? "Arrived" : `${etaMinutes} min`}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isDelivered ? "Delivery complete" : "Estimated arrival"}
              </p>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-primary rounded-full h-2 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-right">{Math.round(progress)}% complete</p>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="font-heading font-semibold mb-3">Delivery Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{activeBooking.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                <span>{activeBooking.tankerSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <span>{activeBooking.driverName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 98765 43211</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="font-heading font-semibold mb-3">Amount</h3>
            <p className="text-3xl font-heading font-bold text-primary">₹{activeBooking.amount}</p>
            <p className="text-xs text-muted-foreground mt-1">Payment on delivery</p>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
