import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlassCard } from "@/components/GlassCard";
import { Droplets, Truck, MapPin, Shield, Clock, BarChart3, Phone, Mail, ArrowRight } from "lucide-react";

const features = [
  { icon: Truck, title: "Instant Booking", description: "Book a water tanker in just a few taps. Choose your size and get instant confirmation." },
  { icon: MapPin, title: "Live Tracking", description: "Track your tanker in real-time with GPS. Know exactly when your delivery arrives." },
  { icon: Shield, title: "Verified Drivers", description: "All drivers are background-verified and trained for safe water delivery." },
  { icon: Clock, title: "24/7 Availability", description: "Emergency water needs? We're available round the clock for urgent deliveries." },
  { icon: BarChart3, title: "Smart Analytics", description: "Admins get powerful insights on demand patterns, delivery efficiency and more." },
  { icon: Phone, title: "Easy Communication", description: "Direct communication with your assigned driver. Get updates at every step." },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-7 w-7 text-primary" />
            <span className="font-heading font-bold text-xl text-primary">Jal Dhara</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="outline" className="liquid-btn">Login</Button>
            </Link>
            <Link to="/login">
              <Button className="liquid-btn water-gradient-dark text-primary-foreground">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 water-gradient opacity-20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Droplets className="h-4 w-4" />
            Smart Water Management
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl mx-auto">
            Water Delivery,{" "}
            <span className="bg-gradient-to-r from-water-deep to-water-mid bg-clip-text text-transparent">
              Simplified
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Book water tankers instantly, track deliveries in real-time, and never worry about water scarcity again. Jal Dhara connects you with verified drivers 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="liquid-btn water-gradient-dark text-primary-foreground text-lg px-8 h-12">
                Book a Tanker <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="liquid-btn text-lg px-8 h-12">
                Driver Sign Up
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {[
              { label: "Deliveries", value: "10,000+" },
              { label: "Active Tankers", value: "150+" },
              { label: "Cities", value: "12" },
              { label: "Happy Users", value: "5,000+" },
            ].map((stat) => (
              <GlassCard key={stat.label} className="p-4 text-center hover:scale-105 transition-transform">
                <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Why Choose Jal Dhara?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete water tanker management platform for users, drivers, and administrators.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <GlassCard
                key={feature.title}
                className="p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <GlassCard variant="strong" className="p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 water-gradient opacity-10" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Join thousands of users who trust Jal Dhara for their water delivery needs. Sign up today and get your first delivery!
              </p>
              <Link to="/login">
                <Button size="lg" className="liquid-btn water-gradient-dark text-primary-foreground text-lg px-10 h-12">
                  Start Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="h-6 w-6 text-primary" />
                <span className="font-heading font-bold text-lg text-primary">Jal Dhara</span>
              </div>
              <p className="text-sm text-muted-foreground">Smart Water Tanker Management System. Delivering water where it matters.</p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/login" className="block hover:text-primary transition-colors">Book a Tanker</Link>
                <Link to="/login" className="block hover:text-primary transition-colors">Driver Registration</Link>
                <Link to="/login" className="block hover:text-primary transition-colors">Admin Portal</Link>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 1800-JAL-DHARA</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@jaldhara.in</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-6 text-center text-sm text-muted-foreground">
            © 2026 Jal Dhara. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
