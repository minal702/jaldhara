import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/GlassCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Droplets, User, Truck, ShieldCheck } from "lucide-react";
import { UserRole } from "@/lib/mock-data";
import { toast } from "sonner";

const roles: { value: UserRole; label: string; icon: React.ComponentType<any>; desc: string }[] = [
  { value: "user", label: "User", icon: User, desc: "Book water tankers" },
  { value: "driver", label: "Driver", icon: Truck, desc: "Deliver water" },
  { value: "admin", label: "Admin", icon: ShieldCheck, desc: "Manage system" },
];

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success(isLogin ? "Logged in successfully!" : "Account created!");
    const routes: Record<UserRole, string> = { user: "/dashboard", driver: "/driver", admin: "/admin" };
    navigate(routes[role]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 water-gradient opacity-20" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <GlassCard variant="strong" className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Droplets className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-2xl text-primary">Jal Dhara</span>
          </Link>
          <p className="text-muted-foreground text-sm">{isLogin ? "Welcome back!" : "Create your account"}</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all duration-200 ${
                role === r.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 text-muted-foreground"
              }`}
            >
              <r.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{r.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full liquid-btn water-gradient-dark text-primary-foreground h-11">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
