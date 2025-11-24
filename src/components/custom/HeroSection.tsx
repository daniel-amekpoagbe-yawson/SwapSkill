import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { GridPattern } from "../magicui/grid-pattern";

// User Avatars + Stats
const UserBadges = () => {
  const [isVisible, setIsVisible] = useState(false);
  const userImages = [
    "https://avatar.iran.liara.run/public/6",
    "https://avatar.iran.liara.run/public/7",
    "https://avatar.iran.liara.run/public/26",
    "https://avatar.iran.liara.run/public/8",
    "https://avatar.iran.liara.run/public/14",
    "https://avatar.iran.liara.run/public/10",
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col items-center lg:items-start space-y-4">
      {/* Avatars with improved animation */}
      <div className="flex -space-x-4 hover:-space-x-2 transition-all duration-300">
        {userImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Community Member ${index + 1}`}
            className={`w-12 h-12 rounded-full border-2 border-white/30 bg-transparent transition-all duration-500 hover:scale-110 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
        ))}
      </div>

      {/* Stats with animation */}
      <div
        className={`flex items-center gap-3 text-sm text-gray-200 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#10B981]/20">
          <TrendingUp className="w-4 h-4 text-[#10B981]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-lg">5000+</span>
          <span className="bellefair text-gray-300">
            Ghanaians exchanging skills
          </span>
        </div>
      </div>
    </div>
  );
};

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section className="relative flex flex-col items-center min-h-[80vh] pt-20 pb-12 px-6 sm:px-10 lg:px-16 text-left overflow-hidden bg-gradient-to-b from-black to-gray-900">
        <GridPattern className="absolute inset-0 w-full h-full opacity-20 backdrop-opacity-20" />

        {/* Background Effects */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-[#10B981]/10 blur-[100px] rounded-full animate-pulse" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-20" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6 py-0.5">
          {/* Badge */}
          <div className="flex justify-center w-full">
            <div
              className={`inline-flex items-center gap-2 backdrop-blur-md bg-white/5 border border-white/10 
            text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transform transition-all duration-700
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
            >
              <div className="p-1 ml-0 bg-[#10B981]/20 rounded-full">
                <Sparkles className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="belleza tracking-wide">
                Ghana's Premier Skill Exchange Platform
              </span>
            </div>
          </div>
          {/* Headline with staggered animation */}
          <div className="space-y-3">
            <h1
              className={`text-5xl sm:text-7xl font-black text-white cinzel leading-tight transition-all duration-700
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Smart Learning
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#10B981] to-emerald-400">
                Made simple for all.
              </span>
            </h1>
          </div>

          {/* Subtext with animation */}
          <p
            className={`text-gray-300 max-w-2xl belleza text-lg sm:text-xl leading-relaxed transition-all duration-700
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
            style={{ transitionDelay: "400ms" }}
          >
            In a world where access often feels out of reach,{" "}
            <span className="text-[#10B981] font-semibold">swapSkill</span>{" "}
            connects Ghana's hardworking youth swapping skills, sharing
            experiences, and building real opportunities, without the barriers
            of expensive courses or hidden fees.
          </p>

          {/* CTA + User Badges */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8 transition-all duration-700
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
            style={{ transitionDelay: "600ms" }}
          >
            {/* Left - Button & Small Text */}
            <div className="space-y-6">
              <Button
                size="lg"
                className="group relative overflow-hidden backdrop-blur-md bg-[#10B981] hover:bg-[#0ea371] belleza
                text-white text-lg font-medium px-8 py-6 rounded-xl shadow-lg transition-all duration-300
                hover:shadow-emerald-500/25 hover:scale-[1.02]"
                onClick={() => console.log("Navigate to signup")}
              >
                Learn how it works
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                />
              </Button>
              <p className="text-gray-400 text-base belleza flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                200+ skills available for exchange
              </p>
            </div>

            {/* Right - User Badges */}
            <div className="flex justify-center lg:justify-end">
              <UserBadges />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
