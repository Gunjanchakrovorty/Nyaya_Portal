import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Scale,
  Search,
  FileText,
  Users,
  BarChart3,
  Shield,
  ChevronRight,
  TrendingUp,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { label: "Pending Cases", value: "4.7Cr+", icon: AlertTriangle },
  { label: "Avg Disposal Time", value: "1,128", suffix: " days", icon: Clock },
  { label: "AI Efficiency Gain", value: "30", suffix: "%", icon: TrendingUp },
  { label: "Districts Connected", value: "10", suffix: "+", icon: BarChart3 },
];

const portals = [
  {
    title: "Citizen Portal",
    desc: "Track cases, file complaints, find lawyers",
    icon: Users,
    path: "/citizen-login",
    color: "from-primary to-gold-dark",
  },
  {
    title: "Admin Dashboard",
    desc: "Full analytics, heatmaps, reform dashboards",
    icon: BarChart3,
    path: "/admin-login",
    color: "from-info to-primary",
  },
  {
    title: "Lawyer Portal",
    desc: "Profile, calendar, delay analytics",
    icon: Scale,
    path: "/lawyer-login",
    color: "from-success to-info",
  },
  {
    title: "Judge Portal",
    desc: "AI priority queue, smart scheduling",
    icon: Shield,
    path: "/judge-login",
    color: "from-warning to-primary",
  },
];

const features = [
  {
    icon: Search,
    title: "AI Priority Scoring",
    desc: "Automatically ranks cases by urgency, severity, and public impact",
  },
  {
    icon: FileText,
    title: "Smart Scheduling",
    desc: "Cross-checks judge & lawyer calendars for optimal hearings",
  },
  {
    icon: AlertTriangle,
    title: "Adjournment Intelligence",
    desc: "Tracks delay accountability and flags chronic offenders",
  },
  {
    icon: TrendingUp,
    title: "Backlog Prediction",
    desc: "ML-powered 6-month forecasting for proactive resource allocation",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen gradient-navy">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-card-strong border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Scale className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-serif font-bold text-foreground leading-none">
                Nyaya Portal
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
                AI Judicial Intelligence
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {portals.map((p) => (
              <Link
                key={p.path}
                to={p.path}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
              Where Data Meets Justice
            </p>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
              AI Judicial Intelligence
              <br />
              <span className="gradient-gold-text">& Nyaya Portal</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              India's first AI-powered judicial reform platform — reducing backlog
              by 30%, eliminating adjournment abuse, and bringing transparency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/citizen-login">
                <Button
                  size="lg"
                  className="gradient-gold text-primary-foreground font-semibold px-8 py-6 text-base gold-glow hover:opacity-90 transition-opacity"
                >
                  Track Your Case{" "}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/admin-login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-base"
                >
                  View Analytics Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              Access Your Portal
            </h2>
            <p className="text-muted-foreground">
              Role-based secure access for every stakeholder
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portals.map((portal, i) => (
              <motion.div
                key={portal.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={portal.path}
                  className="block glass-card rounded-xl p-6 hover:gold-glow transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${portal.color} flex items-center justify-center mb-4`}
                  >
                    <portal.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {portal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {portal.desc}
                  </p>
                  <ChevronRight className="h-5 w-5 text-primary mt-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border/30 text-center">
        <Scale className="h-8 w-8 text-primary mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">
          AI Judicial Intelligence & Nyaya Portal
        </p>
      </footer>
    </div>
  );
};

export default Index;
