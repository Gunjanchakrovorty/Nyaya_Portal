import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, FileText, Users, Scale, ArrowLeft, ChevronRight, Clock, AlertTriangle, Star, Filter, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockCases, mockLawyers } from "@/data/mockData";
import type { Case } from "@/data/mockData";

const urgencyColors: Record<string, string> = {
  Critical: "bg-destructive/20 text-destructive",
  Urgent: "bg-warning/20 text-warning",
  "Time Sensitive": "bg-info/20 text-info",
  Normal: "bg-success/20 text-success",
};

const stageOrder = ["Filed", "Verification Pending", "Verified", "Hearing Scheduled", "In Hearing", "Arguments", "Reserved for Judgment", "Judgment Delivered"];

const CitizenPortal = () => {
const [view, setView] = useState<"home" | "track" | "lawyers" | "dashboard" | "file">("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [trackedCase, setTrackedCase] = useState<Case | null>(null);
  const [specFilter, setSpecFilter] = useState("");

  const handleSearch = () => {
    const found = mockCases.find(
      (c) => c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) || c.caseId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTrackedCase(found || null);
    setView("track");
  };

  const filteredLawyers = specFilter
    ? mockLawyers.filter((l) => l.specialization.toLowerCase().includes(specFilter.toLowerCase()))
    : mockLawyers;

  const myCases = mockCases.slice(0, 5);

  return (
    <div className="min-h-screen gradient-navy">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-card-strong border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <Scale className="h-7 w-7 text-primary" />
            <span className="font-serif font-bold text-foreground">Citizen Portal</span>
          </Link>
          <div className="hidden md:flex gap-4">
            {[
              { label: "Home", v: "home" as const },
              { label: "Track Case", v: "track" as const },
              { label: "Find Lawyer", v: "lawyers" as const },
              { label: "My Cases", v: "dashboard" as const },
            ].map((item) => (
              <button
                key={item.v}
                onClick={() => setView(item.v)}
                className={`text-sm px-3 py-1 rounded-md transition-colors ${view === item.v ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 container mx-auto px-6">
        {view === "home" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-serif font-bold text-foreground mb-3">Welcome, Citizen</h1>
              <p className="text-muted-foreground">Access justice transparently. Track, file, and find the help you need.</p>
            </div>

            {/* Search */}
            <div className="max-w-xl mx-auto glass-card rounded-xl p-6 mb-12">
              <p className="text-sm text-muted-foreground mb-3">Track your case instantly</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Case Number (e.g., CR/1001/2024)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-secondary border-border"
                />
                <Button onClick={handleSearch} className="gradient-gold text-primary-foreground">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <button onClick={() => setView("track")} className="glass-card rounded-xl p-6 text-left hover:gold-glow transition-all group">
                <Search className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-serif font-semibold text-foreground mb-1">Track Case</h3>
                <p className="text-sm text-muted-foreground">Search and monitor your case status</p>
              </button>
              <div className="glass-card rounded-xl p-6 text-left opacity-80">
                <FileText className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-serif font-semibold text-foreground mb-1">File Complaint</h3>
                <p className="text-sm text-muted-foreground">Smart 5-step filing with AI analysis</p>
              </div>
 <button
  onClick={() => setView("file")}
  className="glass-card rounded-xl p-6 text-left hover:gold-glow transition-all group"
>
  <FileText className="h-8 w-8 text-primary mb-3" />
  <h3 className="font-serif font-semibold text-foreground mb-1">File Complaint</h3>
  <p className="text-sm text-muted-foreground">Smart 5-step filing with AI analysis</p>
</button>

            </div>

            {/* Public Stats */}
            <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="stat-counter text-2xl text-foreground">1,247</p>
                <p className="text-xs text-muted-foreground">Pending Cases</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="stat-counter text-2xl text-primary">74%</p>
                <p className="text-xs text-muted-foreground">System Efficiency</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="stat-counter text-2xl text-foreground">78%</p>
                <p className="text-xs text-muted-foreground">Disposal Rate</p>
              </div>
            </div>
          </motion.div>
        )}

        {view === "track" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Track Your Case</h2>
            <div className="max-w-xl glass-card rounded-xl p-6 mb-8">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Case Number or ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-secondary border-border"
                />
                <Button onClick={handleSearch} className="gradient-gold text-primary-foreground">
                  <Search className="h-4 w-4 mr-2" /> Search
                </Button>
              </div>
            </div>

            {trackedCase ? (
              <div className="glass-card rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-foreground">{trackedCase.caseNumber}</h3>
                    <p className="text-muted-foreground">{trackedCase.caseType} • {trackedCase.district}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${urgencyColors[trackedCase.urgencyLabel]}`}>
                    {trackedCase.urgencyLabel}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Petitioner</span><span className="text-foreground">{trackedCase.petitioner}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Respondent</span><span className="text-foreground">{trackedCase.respondent}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Filed</span><span className="text-foreground">{trackedCase.filingDate}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Case Age</span><span className="text-foreground">{trackedCase.caseAgeDays} days</span></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Priority Score</span><span className="text-primary font-bold">{trackedCase.priorityScore}/100</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Adjournments</span><span className="text-foreground">{trackedCase.adjournmentCount}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Risk Index</span><span className="text-foreground">{trackedCase.riskIndex}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Est. Resolution</span><span className="text-foreground">{trackedCase.estimatedResolutionTime}</span></div>
                  </div>
                </div>

                {/* Stage Timeline */}
                <h4 className="font-serif font-semibold text-foreground mb-4">Case Progress</h4>
                <div className="flex items-center gap-1 overflow-x-auto pb-2">
                  {stageOrder.map((stage, i) => {
                    const currentIdx = stageOrder.indexOf(trackedCase.currentStage);
                    const isActive = i === currentIdx;
                    const isDone = i < currentIdx;
                    return (
                      <div key={stage} className="flex items-center">
                        <div className={`flex flex-col items-center min-w-[80px]`}>
                          <div className={`w-4 h-4 rounded-full border-2 ${isActive ? "border-primary bg-primary animate-pulse-gold" : isDone ? "border-success bg-success" : "border-border bg-secondary"}`} />
                          <p className={`text-[10px] mt-1 text-center ${isActive ? "text-primary font-semibold" : isDone ? "text-success" : "text-muted-foreground"}`}>{stage}</p>
                        </div>
                        {i < stageOrder.length - 1 && <div className={`h-0.5 w-6 ${isDone ? "bg-success" : "bg-border"}`} />}
                      </div>
                    );
                  })}
                </div>

                {trackedCase.adjournmentCount > 0 && (
                  <div className="mt-6 p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <p className="text-sm font-semibold text-warning">Delay Transparency</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This case has been adjourned {trackedCase.adjournmentCount} time(s). Reasons: {trackedCase.adjournmentReasons.join(", ")}.
                    </p>
                  </div>
                )}

                {trackedCase.caseAgeDays > 180 && (
                  <div className="mt-4">
                    <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                      <AlertTriangle className="h-4 w-4 mr-2" /> Request Escalation
                    </Button>
                  </div>
                )}
              </div>
            ) : searchQuery && (
              <div className="glass-card rounded-xl p-8 text-center">
                <p className="text-muted-foreground">No case found. Try a different case number or ID.</p>
              </div>
            )}
          </motion.div>
        )}

        {view === "lawyers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Find a Lawyer</h2>
            <div className="flex gap-3 mb-8">
              <div className="relative flex-1 max-w-sm">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by specialization..."
                  value={specFilter}
                  onChange={(e) => setSpecFilter(e.target.value)}
                  className="bg-secondary border-border pl-10"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLawyers.slice(0, 12).map((lawyer) => (
                <div key={lawyer.lawyerId} className="glass-card rounded-xl p-5 hover:gold-glow transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-serif font-semibold text-foreground">{lawyer.name}</h3>
                      <p className="text-xs text-muted-foreground">{lawyer.specialization} • {lawyer.district}</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="h-3.5 w-3.5 fill-primary" />
                      <span className="text-sm font-semibold">{lawyer.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Experience</span><span className="text-foreground">{lawyer.experienceYears} years</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Fee Range</span><span className="text-foreground flex items-center"><IndianRupee className="h-3 w-3" />{(lawyer.feeRangeMin / 1000).toFixed(0)}K – {(lawyer.feeRangeMax / 1000).toFixed(0)}K</span></div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Delay Index</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${lawyer.delayIndex}%`,
                              background: lawyer.delayIndex > 70 ? "hsl(0 72% 51%)" : lawyer.delayIndex > 40 ? "hsl(35 90% 55%)" : "hsl(152 60% 45%)",
                            }}
                          />
                        </div>
                        <span className="text-foreground font-mono text-xs">{lawyer.delayIndex}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">My Cases</h2>
            <div className="space-y-4">
              {myCases.map((c) => {
                const currentIdx = stageOrder.indexOf(c.currentStage);
                const progress = ((currentIdx + 1) / stageOrder.length) * 100;
                return (
                  <div key={c.caseId} className="glass-card rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-serif font-semibold text-foreground">{c.caseNumber}</h3>
                        <p className="text-xs text-muted-foreground">{c.caseType} • {c.district}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${urgencyColors[c.urgencyLabel]}`}>{c.urgencyLabel}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full gradient-gold transition-all" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Current: <span className="text-primary">{c.currentStage}</span> • Filed: {c.filingDate}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
        
      </div>
    </div>
  );
};

export default CitizenPortal;
