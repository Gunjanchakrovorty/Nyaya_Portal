import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale, BarChart3, TrendingUp, TrendingDown, AlertTriangle, Users, Clock, Target, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { mockCases, mockJudges, mockLawyers, analyticsData } from "@/data/mockData";

const GOLD = "#D4AF37";
const NAVY = "#1a2f4f";
const INFO = "#3b82f6";
const SUCCESS = "#22c55e";
const WARNING = "#f59e0b";
const DESTRUCTIVE = "#ef4444";

const AdminDashboard = () => {
  const [tab, setTab] = useState<"overview" | "backlog" | "lawyers" | "judges" | "efficiency">("overview");

  const totalPending = mockCases.filter((c) => !c.disposalDate).length;
  const totalDisposed = mockCases.filter((c) => c.disposalDate).length;
  const disposalRate = Math.round((totalDisposed / mockCases.length) * 100);
  const avgAge = Math.round(mockCases.reduce((a, c) => a + c.caseAgeDays, 0) / mockCases.length);
  const criticalCases = mockCases.filter((c) => c.urgencyLabel === "Critical").length;

  const filingVsDisposal = analyticsData.months.map((m, i) => ({
    month: m,
    filings: analyticsData.monthlyFilings[i],
    disposals: analyticsData.monthlyDisposals[i],
  }));

  const caseTypeData = ["Criminal", "Civil", "Family", "Commercial", "Labour"].map((type) => ({
    name: type,
    value: mockCases.filter((c) => c.caseType === type).length,
  }));
  const PIE_COLORS = [DESTRUCTIVE, INFO, SUCCESS, WARNING, GOLD];

  const adjReasonData = Object.entries(analyticsData.adjournmentReasons).map(([name, value]) => ({ name, value }));

  const backlogData = Object.entries(analyticsData.districtBacklog)
    .sort((a, b) => b[1] - a[1])
    .map(([district, cases]) => ({ district, cases, color: cases > 900 ? DESTRUCTIVE : cases > 600 ? WARNING : SUCCESS }));

  const topDelayLawyers = [...mockLawyers].sort((a, b) => b.delayIndex - a.delayIndex).slice(0, 10);

  const judgeWorkload = mockJudges.map((j) => ({
    name: j.name.replace("Justice ", ""),
    cases: j.casesAssigned,
    disposal: j.disposalRate,
    workload: j.workloadScore,
  }));

  const radarData = mockJudges.slice(0, 5).map((j) => ({
    subject: j.name.replace("Justice ", ""),
    disposalRate: j.disposalRate,
    workload: j.workloadScore,
    efficiency: 100 - j.avgAdjournmentsPerCase * 20,
  }));

  const efficiencyScore = 74;

  const tabs = [
    { label: "Overview", value: "overview" as const, icon: BarChart3 },
    { label: "Backlog Map", value: "backlog" as const, icon: MapPin },
    { label: "Lawyer Delay", value: "lawyers" as const, icon: Users },
    { label: "Judge Workload", value: "judges" as const, icon: Scale },
    { label: "Efficiency", value: "efficiency" as const, icon: Target },
  ];

  return (
    <div className="min-h-screen gradient-navy">
      <nav className="fixed top-0 w-full z-50 glass-card-strong border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <Scale className="h-7 w-7 text-primary" />
            <span className="font-serif font-bold text-foreground">Admin Dashboard</span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 container mx-auto px-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.value ? "gradient-gold text-primary-foreground" : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Total Pending", value: totalPending, icon: Clock, trend: "↑12%", trendColor: "text-destructive" },
                { label: "Disposed", value: totalDisposed, icon: TrendingUp, trend: "↑8%", trendColor: "text-success" },
                { label: "Disposal Rate", value: `${disposalRate}%`, icon: Target, trend: "Target: 85%", trendColor: "text-muted-foreground" },
                { label: "Avg Case Age", value: `${avgAge}d`, icon: Clock, trend: "", trendColor: "" },
                { label: "Critical Cases", value: criticalCases, icon: AlertTriangle, trend: "Need attention", trendColor: "text-warning" },
              ].map((kpi) => (
                <div key={kpi.label} className="glass-card rounded-xl p-4">
                  <kpi.icon className="h-5 w-5 text-primary mb-2" />
                  <p className="stat-counter text-2xl text-foreground">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  {kpi.trend && <p className={`text-[10px] mt-1 ${kpi.trendColor}`}>{kpi.trend}</p>}
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-serif font-semibold text-foreground mb-4">Filings vs Disposals (Monthly)</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={filingVsDisposal}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 30% 25%)" />
                    <XAxis dataKey="month" stroke="hsl(216 15% 60%)" fontSize={12} />
                    <YAxis stroke="hsl(216 15% 60%)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "hsl(216 45% 14%)", border: "1px solid hsl(216 30% 25%)", borderRadius: "8px", color: "hsl(40 30% 95%)" }} />
                    <Bar dataKey="filings" fill={GOLD} radius={[4, 4, 0, 0]} name="Filings" />
                    <Bar dataKey="disposals" fill={INFO} radius={[4, 4, 0, 0]} name="Disposals" />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="font-serif font-semibold text-foreground mb-4">Case Type Distribution</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={caseTypeData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {caseTypeData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(216 45% 14%)", border: "1px solid hsl(216 30% 25%)", borderRadius: "8px", color: "hsl(40 30% 95%)" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Adjournment Reasons */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-serif font-semibold text-foreground mb-4">Adjournment Reasons Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={adjReasonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 30% 25%)" />
                  <XAxis type="number" stroke="hsl(216 15% 60%)" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="hsl(216 15% 60%)" fontSize={11} width={130} />
                  <Tooltip contentStyle={{ background: "hsl(216 45% 14%)", border: "1px solid hsl(216 30% 25%)", borderRadius: "8px", color: "hsl(40 30% 95%)" }} />
                  <Bar dataKey="value" fill={WARNING} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {tab === "backlog" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-2xl font-serif font-bold text-foreground">District Backlog Heatmap</h2>
            <div className="glass-card rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {backlogData.map((d) => (
                  <div key={d.district} className="rounded-xl p-4 border transition-all hover:scale-105" style={{ borderColor: d.color, background: `${d.color}10` }}>
                    <MapPin className="h-5 w-5 mb-2" style={{ color: d.color }} />
                    <p className="font-serif font-semibold text-foreground text-sm">{d.district}</p>
                    <p className="stat-counter text-xl" style={{ color: d.color }}>{d.cases.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">pending cases</p>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={backlogData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 30% 25%)" />
                  <XAxis dataKey="district" stroke="hsl(216 15% 60%)" fontSize={11} />
                  <YAxis stroke="hsl(216 15% 60%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(216 45% 14%)", border: "1px solid hsl(216 30% 25%)", borderRadius: "8px", color: "hsl(40 30% 95%)" }} />
                  <Bar dataKey="cases" radius={[4, 4, 0, 0]}>
                    {backlogData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {tab === "lawyers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-2xl font-serif font-bold text-foreground">Lawyer Delay Accountability</h2>
            <div className="glass-card rounded-xl p-6">
              <div className="space-y-3">
                {topDelayLawyers.map((l, i) => (
                  <div key={l.lawyerId} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <span className="text-sm font-mono text-muted-foreground w-6">#{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{l.name}</p>
                      <p className="text-xs text-muted-foreground">{l.specialization} • {l.district}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Delay Index:</span>
                        <div className="w-20 h-2.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${l.delayIndex}%`, background: l.delayIndex > 70 ? DESTRUCTIVE : l.delayIndex > 40 ? WARNING : SUCCESS }} />
                        </div>
                        <span className="text-sm font-mono font-bold" style={{ color: l.delayIndex > 70 ? DESTRUCTIVE : l.delayIndex > 40 ? WARNING : SUCCESS }}>{l.delayIndex}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{l.totalAdjournmentsRequested} adjournments • Avg {l.avgDelayDays}d delay</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === "judges" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-2xl font-serif font-bold text-foreground">Judge Workload Analytics</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-serif font-semibold text-foreground mb-4">Cases per Judge</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={judgeWorkload} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 30% 25%)" />
                    <XAxis type="number" stroke="hsl(216 15% 60%)" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="hsl(216 15% 60%)" fontSize={10} width={100} />
                    <Tooltip contentStyle={{ background: "hsl(216 45% 14%)", border: "1px solid hsl(216 30% 25%)", borderRadius: "8px", color: "hsl(40 30% 95%)" }} />
                    <Bar dataKey="cases" fill={GOLD} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="font-serif font-semibold text-foreground mb-4">Disposal Rate Radar</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(216 30% 25%)" />
                    <PolarAngleAxis dataKey="subject" stroke="hsl(216 15% 60%)" fontSize={10} />
                    <PolarRadiusAxis stroke="hsl(216 15% 60%)" fontSize={10} />
                    <Radar name="Disposal Rate" dataKey="disposalRate" stroke={GOLD} fill={GOLD} fillOpacity={0.3} />
                    <Radar name="Efficiency" dataKey="efficiency" stroke={INFO} fill={INFO} fillOpacity={0.2} />
                    <Legend />
                    <Tooltip contentStyle={{ background: "hsl(216 45% 14%)", border: "1px solid hsl(216 30% 25%)", borderRadius: "8px", color: "hsl(40 30% 95%)" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "efficiency" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-2xl font-serif font-bold text-foreground">Justice Efficiency Score</h2>
            <div className="flex justify-center">
              <div className="glass-card rounded-xl p-10 text-center max-w-md">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(216 30% 25%)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke={GOLD} strokeWidth="8" strokeDasharray={`${efficiencyScore * 2.64} 264`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="stat-counter text-5xl text-primary">{efficiencyScore}</p>
                    <p className="text-sm text-muted-foreground">/100</p>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">System Efficiency</h3>
                <p className="text-sm text-muted-foreground">Composite score based on disposal rate, adjournment frequency, backlog growth, and workload balance.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "Disposal Rate", weight: "40%", score: disposalRate, color: SUCCESS },
                { label: "Adjournment Control", weight: "30%", score: 68, color: WARNING },
                { label: "Backlog Growth", weight: "20%", score: 72, color: INFO },
                { label: "Workload Balance", weight: "10%", score: 81, color: GOLD },
              ].map((m) => (
                <div key={m.label} className="glass-card rounded-xl p-5">
                  <p className="text-xs text-muted-foreground mb-1">Weight: {m.weight}</p>
                  <p className="font-serif font-semibold text-foreground mb-3">{m.label}</p>
                  <div className="w-full h-3 rounded-full bg-secondary overflow-hidden mb-2">
                    <div className="h-full rounded-full transition-all" style={{ width: `${m.score}%`, background: m.color }} />
                  </div>
                  <p className="stat-counter text-xl" style={{ color: m.color }}>{m.score}%</p>
                </div>
              ))}
            </div>

            {/* 6-month forecast */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-serif font-semibold text-foreground mb-4">6-Month Backlog Forecast</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={[
                  { month: "Jan", actual: 1100, forecast: null },
                  { month: "Feb", actual: 1150, forecast: null },
                  { month: "Mar", actual: 1180, forecast: null },
                  { month: "Apr", actual: 1200, forecast: null },
                  { month: "May", actual: 1230, forecast: null },
                  { month: "Jun", actual: 1247, forecast: 1247 },
                  { month: "Jul", actual: null, forecast: 1320 },
                  { month: "Aug", actual: null, forecast: 1450 },
                  { month: "Sep", actual: null, forecast: 1580 },
                  { month: "Oct", actual: null, forecast: 1690 },
                  { month: "Nov", actual: null, forecast: 1800 },
                  { month: "Dec", actual: null, forecast: 1892 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 30% 25%)" />
                  <XAxis dataKey="month" stroke="hsl(216 15% 60%)" fontSize={12} />
                  <YAxis stroke="hsl(216 15% 60%)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(216 45% 14%)", border: "1px solid hsl(216 30% 25%)", borderRadius: "8px", color: "hsl(40 30% 95%)" }} />
                  <Line type="monotone" dataKey="actual" stroke={GOLD} strokeWidth={2} dot={{ r: 4, fill: GOLD }} name="Actual" />
                  <Line type="monotone" dataKey="forecast" stroke={DESTRUCTIVE} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: DESTRUCTIVE }} name="Forecast" />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
