import AIChatbot from "@/components/AIChatbot";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";

import CitizenLogin from "./pages/CitizenLogin";
import AdminLogin from "./pages/AdminLogin";
import LawyerLogin from "./pages/LawyerLogin";
import JudgeLogin from "./pages/JudgeLogin";

import CitizenPortal from "./pages/CitizenPortal";
import AdminDashboard from "./pages/AdminDashboard";
import LawyerPortal from "./pages/LawyerPortal";
import JudgePortal from "./pages/JudgePortal";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Login Pages */}
          <Route path="/citizen-login" element={<CitizenLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/lawyer-login" element={<LawyerLogin />} />
          <Route path="/judge-login" element={<JudgeLogin />} />

          {/* Actual Portals */}
          <Route path="/citizen" element={<CitizenPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/lawyer" element={<LawyerPortal />} />
          <Route path="/judge" element={<JudgePortal />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
