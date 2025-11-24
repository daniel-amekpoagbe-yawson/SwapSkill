import {
  HeartHandshake,
  Leaf,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const pillars = [
  {
    title: "Access for Everyone",
    description:
      "We remove the financial barriers around education by creating a community where value is exchanged through time and skill, not money.",
    icon: HeartHandshake,
  },
  {
    title: "Community First",
    description:
      "Our platform is built with Ghanaian communities in mind — from local artisans to young tech talent, we celebrate diverse knowledge.",
    icon: Users,
  },
  {
    title: "Sustainable Growth",
    description:
      "Every exchange empowers two people simultaneously — someone learns, someone earns reputation. That's sustainable growth to us.",
    icon: Leaf,
  },
];

const milestones = [
  {
    year: "2023",
    title: "The spark",
    description:
      "SwapSkill started as a campus experiment to help students learn photography in exchange for coding lessons.",
  },
  {
    year: "2024",
    title: "Community beta",
    description:
      "We launched our first public beta with 500+ members across Accra, Kumasi, and Cape Coast.",
  },
  {
    year: "2025",
    title: "Nationwide rollout",
    description:
      "Today we are powering thousands of exchanges every month and partnering with hubs to reach even more people.",
  },
];

const values = [
  {
    icon: Target,
    title: "Impact-driven",
    detail: "We focus on results that unlock real opportunities.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & safety",
    detail: "Community guidelines keep everyone safe and respected.",
  },
  {
    icon: Rocket,
    title: "Built to grow",
    detail: "Tools that scale from solo learners to entire clubs.",
  },
];

const stats = [
  { value: "4K+", label: "Skills exchanged" },
  { value: "1.2K", label: "Verified mentors" },
  { value: "22", label: "Communities onboard" },
];

const OurMission = () => {
  return (
    <div className="w-full bg-[#101822] text-white px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-14 lg:py-20 space-y-16 sm:space-y-20">
      {/* Hero */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.3em] text-gray-300 belleza">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            Our mission
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold cinzel leading-tight">
              We believe knowledge should be swapped, not gated.
            </h1>
            <p className="text-gray-300 text-base sm:text-lg belleza">
              SwapSkill was born from a simple idea: Ghana's brightest minds are
              everywhere — not just in lecture halls. We exist to help you share
              what you know and learn what you need, through trust, culture, and
              community.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
              >
                <p className="text-2xl font-bold cinzel">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-400 belleza">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[#10B981]/10 blur-3xl rounded-full" />
          <img
            src="/faqs.svg"
            alt="SwapSkill mission illustration"
            className="relative w-full max-w-md mx-auto rounded-[2.5rem] border border-white/10 shadow-2xl"
          />
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 belleza">
            Why we show up
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold cinzel">
            Our pillars of trust
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-gray-900/60 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-4 backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center">
                <pillar.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold cinzel">{pillar.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base belleza">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 belleza">
            Journey so far
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold cinzel">
            Milestones that shaped us
          </h2>
        </div>
        <div className="relative pl-6 sm:pl-10">
          <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#10B981] via-white/20 to-transparent" />
          <div className="space-y-8">
            {milestones.map((item) => (
              <div
                key={item.year}
                className="relative bg-gray-900/60 border border-white/10 rounded-3xl p-5 sm:p-7 backdrop-blur-xl"
              >
                <div className="absolute -left-6 sm:-left-8 top-6 w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center font-semibold">
                  {item.year}
                </div>
                <h3 className="text-xl font-semibold cinzel mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base belleza">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {values.map((value) => (
          <div
            key={value.title}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-3"
          >
            <value.icon className="w-6 h-6 text-[#10B981]" />
            <h4 className="text-lg font-semibold cinzel">{value.title}</h4>
            <p className="text-gray-300 text-sm sm:text-base belleza">
              {value.detail}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OurMission;
