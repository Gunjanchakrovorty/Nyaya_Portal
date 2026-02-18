import React from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1c2d] to-[#091521] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-10"></div>

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-400 text-center">
          {title}
        </h1>
        <p className="text-gray-300 text-center mb-6">{subtitle}</p>

        {children}
      </div>
    </div>
  );
}
