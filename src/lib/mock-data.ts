export type UserRole = "user" | "driver" | "admin";

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  location: string;
  area: string;
  tankerSize: "500L" | "1000L" | "2000L" | "5000L";
  priority: "normal" | "emergency";
  status: "pending" | "accepted" | "on_the_way" | "delivered" | "cancelled";
  driverId?: string;
  driverName?: string;
  tankerId?: string;
  eta?: string;
  createdAt: string;
  deliveredAt?: string;
  amount: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  license: string;
  status: "available" | "on_delivery" | "offline";
  assignedTanker?: string;
  totalDeliveries: number;
  rating: number;
}

export interface Tanker {
  id: string;
  registrationNo: string;
  capacity: "500L" | "1000L" | "2000L" | "5000L";
  status: "available" | "in_use" | "maintenance";
  driverId?: string;
  lastMaintenance: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  address: string;
  joinedAt: string;
}

export const mockBookings: Booking[] = [
  { id: "BK001", userId: "U1", userName: "Rahul Sharma", location: "Sector 15, Gurugram", area: "Gurugram", tankerSize: "2000L", priority: "normal", status: "delivered", driverId: "D1", driverName: "Amit Kumar", tankerId: "T1", createdAt: "2026-04-12T09:00:00", deliveredAt: "2026-04-12T10:30:00", amount: 800 },
  { id: "BK002", userId: "U2", userName: "Priya Patel", location: "MG Road, Bangalore", area: "Bangalore", tankerSize: "5000L", priority: "emergency", status: "on_the_way", driverId: "D2", driverName: "Ravi Singh", tankerId: "T2", eta: "15 min", createdAt: "2026-04-13T08:00:00", amount: 2000 },
  { id: "BK003", userId: "U3", userName: "Anita Desai", location: "Bandra West, Mumbai", area: "Mumbai", tankerSize: "1000L", priority: "normal", status: "accepted", driverId: "D3", driverName: "Suresh Yadav", tankerId: "T3", eta: "30 min", createdAt: "2026-04-13T08:30:00", amount: 500 },
  { id: "BK004", userId: "U4", userName: "Vikram Joshi", location: "Connaught Place, Delhi", area: "Delhi", tankerSize: "2000L", priority: "emergency", status: "pending", createdAt: "2026-04-13T09:00:00", amount: 900 },
  { id: "BK005", userId: "U1", userName: "Rahul Sharma", location: "Sector 22, Gurugram", area: "Gurugram", tankerSize: "500L", priority: "normal", status: "pending", createdAt: "2026-04-13T09:15:00", amount: 300 },
  { id: "BK006", userId: "U5", userName: "Meera Nair", location: "Jubilee Hills, Hyderabad", area: "Hyderabad", tankerSize: "5000L", priority: "normal", status: "delivered", driverId: "D1", driverName: "Amit Kumar", tankerId: "T4", createdAt: "2026-04-11T14:00:00", deliveredAt: "2026-04-11T16:00:00", amount: 1800 },
];

export const mockDrivers: Driver[] = [
  { id: "D1", name: "Amit Kumar", phone: "+91 98765 43210", license: "DL-0123456789", status: "available", assignedTanker: "T1", totalDeliveries: 234, rating: 4.8 },
  { id: "D2", name: "Ravi Singh", phone: "+91 98765 43211", license: "DL-0123456790", status: "on_delivery", assignedTanker: "T2", totalDeliveries: 189, rating: 4.6 },
  { id: "D3", name: "Suresh Yadav", phone: "+91 98765 43212", license: "DL-0123456791", status: "on_delivery", assignedTanker: "T3", totalDeliveries: 156, rating: 4.5 },
  { id: "D4", name: "Manoj Tiwari", phone: "+91 98765 43213", license: "DL-0123456792", status: "offline", totalDeliveries: 98, rating: 4.3 },
];

export const mockTankers: Tanker[] = [
  { id: "T1", registrationNo: "DL-01-AB-1234", capacity: "2000L", status: "available", driverId: "D1", lastMaintenance: "2026-04-01" },
  { id: "T2", registrationNo: "DL-01-CD-5678", capacity: "5000L", status: "in_use", driverId: "D2", lastMaintenance: "2026-03-25" },
  { id: "T3", registrationNo: "KA-01-EF-9012", capacity: "1000L", status: "in_use", driverId: "D3", lastMaintenance: "2026-04-05" },
  { id: "T4", registrationNo: "MH-01-GH-3456", capacity: "5000L", status: "available", lastMaintenance: "2026-04-10" },
  { id: "T5", registrationNo: "TN-01-IJ-7890", capacity: "500L", status: "maintenance", lastMaintenance: "2026-03-15" },
];

export const mockUsers: UserProfile[] = [
  { id: "U1", name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 00001", role: "user", address: "Sector 15, Gurugram", joinedAt: "2026-01-15" },
  { id: "U2", name: "Priya Patel", email: "priya@example.com", phone: "+91 98765 00002", role: "user", address: "MG Road, Bangalore", joinedAt: "2026-02-10" },
  { id: "U3", name: "Anita Desai", email: "anita@example.com", phone: "+91 98765 00003", role: "user", address: "Bandra West, Mumbai", joinedAt: "2026-03-01" },
  { id: "U4", name: "Vikram Joshi", email: "vikram@example.com", phone: "+91 98765 00004", role: "user", address: "CP, Delhi", joinedAt: "2026-03-20" },
  { id: "U5", name: "Meera Nair", email: "meera@example.com", phone: "+91 98765 00005", role: "user", address: "Jubilee Hills, Hyderabad", joinedAt: "2026-04-01" },
];

export const areaWiseDemand = [
  { area: "Delhi", bookings: 45, delivered: 40 },
  { area: "Mumbai", bookings: 38, delivered: 35 },
  { area: "Bangalore", bookings: 32, delivered: 28 },
  { area: "Gurugram", bookings: 28, delivered: 26 },
  { area: "Hyderabad", bookings: 22, delivered: 20 },
  { area: "Chennai", bookings: 18, delivered: 16 },
];

export const monthlyBookings = [
  { month: "Jan", bookings: 120, revenue: 96000 },
  { month: "Feb", bookings: 145, revenue: 116000 },
  { month: "Mar", bookings: 168, revenue: 134400 },
  { month: "Apr", bookings: 92, revenue: 73600 },
];

export const tankerUsage = [
  { name: "500L", value: 15, fill: "hsl(208, 50%, 94%)" },
  { name: "1000L", value: 25, fill: "hsl(208, 45%, 78%)" },
  { name: "2000L", value: 35, fill: "hsl(205, 54%, 36%)" },
  { name: "5000L", value: 25, fill: "hsl(205, 60%, 27%)" },
];
