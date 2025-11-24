import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  message: string;
  hasQuotes: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ankamah",
    avatar: "https://avatar.iran.liara.run/public/43",
    message:
      "I love how I can teach graphic design and learn photography without paying a pesewa. SwapSkill is the real deal.",
    hasQuotes: true,
  },
  {
    id: 2,
    name: "Ama Owusu",
    avatar: "https://avatar.iran.liara.run/public/28",
    message:
      "Who knew I’d be teaching hair braiding and getting Spanish lessons in return? SwapSkill's actually lit.",
    hasQuotes: true,
  },
  {
    id: 3,
    name: "Kwame",
    avatar: "https://avatar.iran.liara.run/public/25",
    message:
      "Bro, I literally traded guitar lessons for coding help — best decision ever. SwapSkill’s lowkey a game changer.",
    hasQuotes: true,
  },
];

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT SIDE - Enhanced Content */}
          <div
            className={`space-y-8 transition-all duration-2000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Decorative element */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-[#10B981] to-transparent" />
              <span className="text-[#10B981] uppercase tracking-wider text-sm font-semibold belleza">
                Testimonials
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white cinzel leading-tight">
              What Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-emerald-400">
                Learners Say
              </span>
            </h2>

            <p className="text-gray-300 text-lg belleza leading-relaxed">
              Behind every skill is a story. At SwapSkill, real people from all
              walks of life are connecting, sharing knowledge, and unlocking new
              opportunities without spending a dime.
            </p>

            <div className="flex items-center gap-4 pt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-[#10B981] scale-125"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - Enhanced Testimonials */}
          <div className="relative w-full">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative min-h-[360px] sm:min-h-[380px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                    aria-hidden={index !== activeIndex}
                  >
                    <div
                      className={`
                        bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-gray-800
                        transition-all duration-500 hover:border-[#10B981]/20
                        ${
                          hoveredCard === testimonial.id
                            ? "ring-1 ring-[#10B981]/20"
                            : ""
                        }
                      `}
                      onMouseEnter={() => setHoveredCard(testimonial.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-7 h-7 sm:w-8 sm:h-8 bg-[#10B981] rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="sm:w-4 sm:h-4"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      <div className="space-y-4 sm:space-y-6">
                        <p className="text-gray-200 text-base sm:text-lg leading-relaxed belleza px-1">
                          "{testimonial.message}"
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-4">
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-emerald-400 rounded-full blur-sm opacity-50" />
                            <img
                              src={testimonial.avatar}
                              alt={`${testimonial.name}'s profile`}
                              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white/20"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#10B981] text-lg sm:text-xl bellefair">
                              {testimonial.name}
                            </h3>
                            <p className="text-gray-400 text-xs sm:text-sm belleza">
                              SwapSkill Member
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`
                        absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10B981] to-transparent
                        transition-all duration-500 
                        ${
                          hoveredCard === testimonial.id
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      `}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
