import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale, Calendar, BarChart3, Star, Clock, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { mockLawyers, mockCases } from "@/data/mockData";

const COLORS = ["#D4AF37", "#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

const LawyerPortal = () => {
  const lawyer = mockLawyers[0];
  const assignedCases = mockCases.filter((c) => c.lawyerAssigned === lawyer.lawyerId).slice(0, 8);
  const specData = ["Criminal Law", "Civil Law", "Family Law", "Corporate Law", "Labour Law"].map((s, i) => ({
    name: s,
    value: mockCases.filter((c) => c.caseType === ["Criminal", "Civil", "Family", "Commercial", "Labour"][i]).length,
  }));

  const delayTrend = [
    { month: "Jul", index: 72 }, { month: "Aug", index: 68 }, { month: "Sep", index: 65 },
    { month: "Oct", index: 63 }, { month: "Nov", index: 60 }, { month: "Dec", index: 62 },
  ];

  return (
    <div className="min-h-screen gradient-navy">
      <nav className="fixed top-0 w-full z-50 glass-card-strong border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <Scale className="h-7 w-7 text-primary" />
            <span className="font-serif font-bold text-foreground">Lawyer Portal</span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 container mx-auto px-6 space-y-8">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-serif text-2xl font-bold">
            {lawyer.name.split(" ").pop()?.[0]}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-serif font-bold text-foreground">{lawyer.name}</h2>
            <p className="text-muted-foreground">{lawyer.specialization} • {lawyer.district} • {lawyer.experienceYears} years</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-primary"><Star className="h-4 w-4 fill-primary" /><span className="stat-counter text-xl">{lawyer.rating}</span></div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <p className="stat-counter text-xl text-warning">{lawyer.delayIndex}</p>
              <p className="text-xs text-muted-foreground">Delay Index</p>
            </div>
            <div className="text-center">
              <p className="stat-counter text-xl text-foreground">{assignedCases.length}</p>
              <p className="text-xs text-muted-foreground">Active Cases</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Assigned Cases */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-serif font-semibold text-foreground mb-4 flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Assigned Cases</h3>
            <div className="space-y-3">
              {assignedCases.map((c) => (
                <div key={c.caseId} className="p-3 rounded-lg bg-secondary/30 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{c.caseNumber}</p>
                    <p className="text-xs text-muted-foreground">{c.caseType} • {c.currentStage}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${c.urgencyLabel === "Critical" ? "bg-destructive/20 text-destructive" : c.urgencyLabel === "Urgent" ? "bg-warning/20 text-warning" : "bg-info/20 text-info"}`}>
                    {c.urgencyLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delay Trend */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-serif font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingDown className="h-5 w-5 text-primary" /> Delay Index Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={delayTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 30% 25%)" />
                <XAxis dataKey="month" stroke="hsl(216 15% 60%)" fontSize={12} />
                <YAxis stroke="hsl(216 15% 60%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(216 45% 14%)", border: "1px solid hsl(216 30% 25%)", borderRadius: "8px", color: "hsl(40 30% 95%)" }} />
                <Bar dataKey="index" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Specialization Pie */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-serif font-semibold text-foreground mb-4 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Case Specialization</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={specData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {specData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(216 45% 14%)", border: "1px solid hsl(216 30% 25%)", borderRadius: "8px", color: "hsl(40 30% 95%)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerPortal;
