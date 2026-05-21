import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { SignIn } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RedirectUsers = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-mist-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-primary/20 blur-3xl rounded-full top-10 left-10" />
      <div className="absolute w-72 h-72 bg-primary/10 blur-3xl rounded-full bottom-10 right-10" />

      <div className="relative z-10 w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 text-center shadow-2xl overflow-hidden">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-primary/15 p-4 rounded-full border border-primary/30">
            <ShieldAlert className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Admin Access Required
        </h1>

        {/* Description */}
        <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
          This area is restricted to administrators only. Please sign in with an admin account or return to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border border-white/10 hover:border-white/20 rounded-full text-sm font-medium transition bg-white/5 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <button
            onClick={() => setShowLogin(!showLogin)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-dull rounded-full text-sm font-medium transition"
          >
            <LogIn className="w-4 h-4" />
            {showLogin ? "Hide Admin Login" : "Login as Admin"}
          </button>
        </div>

        {/* Animated Clerk Sign In */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showLogin
              ? "max-h-[1000px] opacity-100 mt-8 scale-100"
              : "max-h-0 opacity-0 mt-0 scale-95"
          }`}
        >
          <div className="flex justify-center scale-90 sm:scale-100">
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectUsers;