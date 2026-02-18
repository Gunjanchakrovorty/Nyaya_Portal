import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale, AlertTriangle, Clock, CheckCircle, Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockCases, mockJudges } from "@/data/mockData";

const JudgePortal = () => {
  const judge = mockJudges[0];
  const priorityQueue = [...mockCases]
    .filter((c) => !c.disposalDate)
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 12);

  const urgencyColors: Record<string, string> = {
    Critical: "bg-destructive/20 text-destructive border-destructive/30",
    Urgent: "bg-warning/20 text-warning border-warning/30",
    "Time Sensitive": "bg-info/20 text-info border-info/30",
    Normal: "bg-success/20 text-success border-success/30",
  };

  return (
    <div className="min-h-screen gradient-navy">
      <nav className="fixed top-0 w-full z-50 glass-card-strong border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <Scale className="h-7 w-7 text-primary" />
            <span className="font-serif font-bold text-foreground">Judge Portal</span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 container mx-auto px-6 space-y-8">
        {/* Judge Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-serif text-2xl font-bold">
            {judge.name.split(" ").pop()?.[0]}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-serif font-bold text-foreground">{judge.name}</h2>
            <p className="text-muted-foreground">{judge.specialization} • {judge.district} • {judge.experienceYears} years</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="stat-counter text-xl text-foreground">{judge.casesAssigned}</p>
              <p className="text-xs text-muted-foreground">Assigned</p>
            </div>
            <div className="text-center">
              <p className="stat-counter text-xl text-success">{judge.disposalRate}%</p>
              <p className="text-xs text-muted-foreground">Disposal</p>
            </div>
            <div className="text-center">
              <div className="relative w-12 h-12 mx-auto">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(216 30% 25%)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#D4AF37" strokeWidth="3" strokeDasharray={`${judge.workloadScore * 0.88} 88`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">{judge.workloadScore}</span>
              </div>
              <p className="text-xs text-muted-foreground">Workload</p>
            </div>
          </div>
        </motion.div>

        {/* AI Priority Queue */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-serif font-bold text-foreground">AI Priority Queue</h2>
          </div>
          <div className="space-y-3">
            {priorityQueue.map((c, i) => (
              <motion.div
                key={c.caseId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass-card rounded-xl p-5 border ${urgencyColors[c.urgencyLabel]} flex flex-col md:flex-row md:items-center gap-4`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="stat-counter text-2xl text-primary w-12">{c.priorityScore}</div>
                  <div>
                    <p className="font-serif font-semibold text-foreground">{c.caseNumber}</p>
                    <p className="text-xs text-muted-foreground">{c.caseType} • {c.district} • {c.petitioner} vs {c.respondent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {c.caseAgeDays}d</div>
                  {c.adjournmentCount >= 3 && (
                    <div className="flex items-center gap-1 text-destructive"><AlertTriangle className="h-3.5 w-3.5" /> {c.adjournmentCount} adj.</div>
                  )}
                  {c.isEscalated && <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-destructive/20 text-destructive">⚠ CRITICAL</span>}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${urgencyColors[c.urgencyLabel]}`}>{c.urgencyLabel}</span>
                </div>
                <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 text-xs">
                  <Calendar className="h-3 w-3 mr-1" /> Schedule
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgePortal;
