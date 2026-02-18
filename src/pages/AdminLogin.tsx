import AuthLayout from "@/components/AuthLayout";
import { useNavigate } from "react-router-dom";

export default function CitizenLogin() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Admin Login"
      subtitle="Access your case tracking portal"
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/Admin");
        }}
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
}
