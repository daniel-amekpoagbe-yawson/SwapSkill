import { useNavigate } from "react-router-dom";
import { ArrowLeft, Compass, Home, Mail } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#101822] text-white px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-[#10B981]/20 rounded-[2rem] flex items-center justify-center border border-[#10B981]/40">
            <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-[#10B981]" />
            <div className="absolute inset-0 blur-3xl bg-[#10B981]/30 -z-10" />
          </div>
          <p className="text-sm uppercase tracking-[0.4em] text-gray-400 belleza">
            404 error
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold cinzel leading-tight">
            This page swapped locations.
          </h1>
          <p className="text-gray-300 text-base sm:text-lg belleza max-w-2xl">
            The skill or story you’re searching for has moved or never existed.
            But don’t worry — thousands of others are waiting for you back on
            the marketplace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0ea371] text-white font-semibold px-6 sm:px-8 py-3 rounded-2xl shadow-lg hover:shadow-[#10B981]/30 transition-transform hover:scale-[1.01]"
          >
            <Home className="w-4 h-4" />
            Back to home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 sm:px-8 py-3 rounded-2xl hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous page
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-3 text-left">
          <h2 className="text-xl font-semibold cinzel">Need extra help?</h2>
          <p className="text-gray-300 text-sm sm:text-base belleza">
            If you think this page should exist, let our team know and we’ll fix
            it faster than a weekend skill swap.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hello@swapskill.africa"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 px-5 py-3 rounded-2xl text-sm sm:text-base hover:bg-white/15 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email support
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 text-[#10B981] font-semibold px-5 py-3 rounded-2xl border border-[#10B981]/30 hover:bg-[#10B981]/10 transition-colors"
            >
              Contact team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
