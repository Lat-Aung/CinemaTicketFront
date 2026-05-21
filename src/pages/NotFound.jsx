import { Ghost, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mist-900 flex items-center justify-center px-6 relative overflow-hidden text-white">
      
      {/* Background Glows */}
      <div className="absolute w-72 h-72 bg-primary/20 blur-3xl rounded-full -top-10 -left-10" />
      <div className="absolute w-72 h-72 bg-primary/10 blur-3xl rounded-full bottom-0 right-0" />

      {/* Floating Decorations */}
      <div className="absolute top-24 left-10 text-primary/20 text-8xl font-bold rotate-12 hidden md:block">
        404
      </div>

      <div className="absolute bottom-24 right-10 text-primary/10 text-7xl font-bold -rotate-12 hidden md:block">
        ERROR
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 border border-primary/20 p-6 rounded-full animate-bounce">
            <Ghost className="w-14 h-14 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
          Lost in the Cinema?
        </h2>

        {/* Description */}
        <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
          Looks like this page disappeared behind the curtain.
          The movie you are looking for does not exist here.
        </p>

        {/* Actions */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dull rounded-full font-medium transition hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Decorative Mini Cards */}
        <div className="flex justify-center gap-4 mt-14 flex-wrap">
          {["Popcorn", "Tickets", "Trailers"].map((item) => (
            <div
              key={item}
              className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-primary/30 transition"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};