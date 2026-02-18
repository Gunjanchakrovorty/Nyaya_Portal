export interface Case {
  caseId: string;
  caseNumber: string;
  caseType: "Criminal" | "Civil" | "Family" | "Commercial" | "Labour";
  district: string;
  filingDate: string;
  disposalDate: string | null;
  severityLevel: number;
  publicImpactScore: number;
  priorityScore: number;
  urgencyLabel: "Normal" | "Time Sensitive" | "Urgent" | "Critical";
  adjournmentCount: number;
  adjournmentReasons: string[];
  lawyerAssigned: string;
  judgeAssigned: string;
  currentStage: string;
  estimatedResolutionTime: string;
  riskIndex: "Low" | "Medium" | "High" | "Critical";
  vulnerabilityFlag: boolean;
  caseAgeDays: number;
  isEscalated: boolean;
  petitioner: string;
  respondent: string;
}

export interface Judge {
  judgeId: string;
  name: string;
  district: string;
  specialization: string;
  experienceYears: number;
  casesAssigned: number;
  disposalRate: number;
  avgAdjournmentsPerCase: number;
  workloadScore: number;
}

export interface Lawyer {
  lawyerId: string;
  name: string;
  specialization: string;
  district: string;
  experienceYears: number;
  feeRangeMin: number;
  feeRangeMax: number;
  delayIndex: number;
  totalAdjournmentsRequested: number;
  avgDelayDays: number;
  rating: number;
}

export interface AnalyticsData {
  monthlyFilings: number[];
  monthlyDisposals: number[];
  adjournmentReasons: Record<string, number>;
  districtBacklog: Record<string, number>;
  months: string[];
}

const districts = ["Mumbai Suburban", "Delhi", "Bangalore Urban", "Pune", "Chennai", "Kolkata", "Hyderabad", "Jaipur", "Kochi", "Lucknow"];
const caseTypes: Case["caseType"][] = ["Criminal", "Civil", "Family", "Commercial", "Labour"];
const stages = ["Filed", "Verification Pending", "Verified", "Hearing Scheduled", "In Hearing", "Arguments", "Reserved for Judgment", "Judgment Delivered"];
const petitioners = ["Ramesh Kumar", "Sita Devi", "Arjun Singh", "Lakshmi Narayan", "Pradeep Verma", "Sunita Gupta", "Mohan Das", "Fatima Begum", "Rajesh Patel", "Anita Sharma"];
const respondents = ["State of Maharashtra", "Municipal Corp.", "Central Govt.", "State of Delhi", "Insurance Co.", "Bank of India", "Private Ltd.", "State of Karnataka", "Telecom Corp.", "Housing Board"];

function generateCases(count: number): Case[] {
  const cases: Case[] = [];
  for (let i = 1; i <= count; i++) {
    const caseType = caseTypes[Math.floor(Math.random() * caseTypes.length)];
    const prefix = caseType === "Criminal" ? "CR" : caseType === "Civil" ? "CV" : caseType === "Family" ? "FM" : caseType === "Commercial" ? "CM" : "LB";
    const priorityScore = Math.floor(Math.random() * 100);
    const urgencyLabel: Case["urgencyLabel"] = priorityScore > 85 ? "Critical" : priorityScore > 70 ? "Urgent" : priorityScore > 50 ? "Time Sensitive" : "Normal";
    const adjCount = Math.floor(Math.random() * 8);
    const caseAge = Math.floor(Math.random() * 400) + 30;
    const riskOptions: Case["riskIndex"][] = ["Low", "Medium", "High", "Critical"];
    
    cases.push({
      caseId: `C-2024-${String(i).padStart(3, "0")}`,
      caseNumber: `${prefix}/${1000 + i}/2024`,
      caseType,
      district: districts[Math.floor(Math.random() * districts.length)],
      filingDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      disposalDate: Math.random() > 0.7 ? "2024-11-15" : null,
      severityLevel: Math.floor(Math.random() * 5) + 1,
      publicImpactScore: Math.floor(Math.random() * 10) + 1,
      priorityScore,
      urgencyLabel,
      adjournmentCount: adjCount,
      adjournmentReasons: ["Lawyer unavailable", "Evidence pending", "Judge on leave", "Administrative"].slice(0, Math.floor(Math.random() * 3) + 1),
      lawyerAssigned: `L-${String(Math.floor(Math.random() * 25) + 1).padStart(3, "0")}`,
      judgeAssigned: `J-${String(Math.floor(Math.random() * 15) + 1).padStart(2, "0")}`,
      currentStage: stages[Math.floor(Math.random() * stages.length)],
      estimatedResolutionTime: "2024-12-30",
      riskIndex: riskOptions[Math.floor(Math.random() * riskOptions.length)],
      vulnerabilityFlag: Math.random() > 0.7,
      caseAgeDays: caseAge,
      isEscalated: caseAge > 180,
      petitioner: petitioners[Math.floor(Math.random() * petitioners.length)],
      respondent: respondents[Math.floor(Math.random() * respondents.length)],
    });
  }
  return cases;
}

const judgeNames = ["Justice A. Mehta", "Justice S. Raghavan", "Justice P. Deshmukh", "Justice K. Iyer", "Justice R. Banerjee", "Justice M. Reddy", "Justice N. Kapoor", "Justice D. Sharma", "Justice V. Nair", "Justice T. Gupta", "Justice B. Joshi", "Justice L. Choudhary", "Justice G. Pillai", "Justice H. Saxena", "Justice F. Khan"];

function generateJudges(): Judge[] {
  return judgeNames.map((name, i) => ({
    judgeId: `J-${String(i + 1).padStart(2, "0")}`,
    name,
    district: districts[i % districts.length],
    specialization: caseTypes[i % caseTypes.length],
    experienceYears: Math.floor(Math.random() * 25) + 5,
    casesAssigned: Math.floor(Math.random() * 40) + 20,
    disposalRate: Math.floor(Math.random() * 30) + 60,
    avgAdjournmentsPerCase: +(Math.random() * 3 + 0.5).toFixed(1),
    workloadScore: Math.floor(Math.random() * 40) + 60,
  }));
}

const lawyerNames = ["Adv. Priya Sharma", "Adv. Rajesh Mehta", "Adv. Kavita Desai", "Adv. Anil Gupta", "Adv. Sneha Reddy", "Adv. Vikram Singh", "Adv. Meera Iyer", "Adv. Amit Patel", "Adv. Pooja Nair", "Adv. Rahul Verma", "Adv. Deepa Joshi", "Adv. Sanjay Kumar", "Adv. Nisha Kapoor", "Adv. Ravi Shankar", "Adv. Anjali Das", "Adv. Suresh Pillai", "Adv. Rekha Choudhary", "Adv. Manish Tiwari", "Adv. Divya Saxena", "Adv. Karan Malhotra", "Adv. Sunita Rao", "Adv. Prakash Hegde", "Adv. Anita Banerjee", "Adv. Mohit Agarwal", "Adv. Lata Menon"];
const lawyerSpecs = ["Criminal Law", "Civil Law", "Family Law", "Corporate Law", "Labour Law", "Property Law", "Tax Law", "Constitutional Law"];

function generateLawyers(): Lawyer[] {
  return lawyerNames.map((name, i) => ({
    lawyerId: `L-${String(i + 1).padStart(3, "0")}`,
    name,
    specialization: lawyerSpecs[i % lawyerSpecs.length],
    district: districts[i % districts.length],
    experienceYears: Math.floor(Math.random() * 20) + 3,
    feeRangeMin: (Math.floor(Math.random() * 4) + 1) * 5000,
    feeRangeMax: (Math.floor(Math.random() * 6) + 5) * 10000,
    delayIndex: Math.floor(Math.random() * 80) + 10,
    totalAdjournmentsRequested: Math.floor(Math.random() * 50) + 5,
    avgDelayDays: +(Math.random() * 25 + 3).toFixed(1),
    rating: +(Math.random() * 2 + 3).toFixed(1),
  }));
}

export const mockCases = generateCases(150);
export const mockJudges = generateJudges();
export const mockLawyers = generateLawyers();

export const analyticsData: AnalyticsData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  monthlyFilings: [85, 92, 78, 110, 95, 102, 88, 97, 105, 112, 99, 108],
  monthlyDisposals: [60, 65, 58, 72, 68, 75, 62, 70, 78, 85, 73, 80],
  adjournmentReasons: {
    "Lawyer unavailable": 45,
    "Evidence pending": 32,
    "Judge on leave": 18,
    "Administrative": 5,
  },
  districtBacklog: {
    "Mumbai": 1200,
    "Delhi": 980,
    "Bangalore": 750,
    "Pune": 620,
    "Chennai": 540,
    "Kolkata": 480,
    "Hyderabad": 420,
    "Jaipur": 380,
    "Kochi": 310,
    "Lucknow": 290,
  },
};
