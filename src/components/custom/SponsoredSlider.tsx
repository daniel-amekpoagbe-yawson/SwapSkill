export default function SponsoredSlider() {
  const sponsors = [
    {
      id: 1,
      name: "TechCorp",
      logo: "https://i.scdn.co/image/ab67616d00001e02ad24c5e36ddcd1957ad35677",
    },
    {
      id: 2,
      name: "InnovateX",
      logo: "https://i.scdn.co/image/ab67616d00001e02af73f776b92d4614152fb141",
    },
    {
      id: 3,
      name: "CloudSphere",
      logo: "https://i.scdn.co/image/ab67616d00001e02ecdb8f824367a53468100faf",
    },
    {
      id: 4,
      name: "DataFlow",
      logo: "https://i.scdn.co/image/ab67616d00001e021624590458126fc8b8c64c2f",
    },
    {
      id: 5,
      name: "SecureNet",
      logo: "https://i.scdn.co/image/ab67616d00001e020dcf0f3680cff56fe5ff2288",
    },
    {
      id: 6,
      name: "NextGen",
      logo: "https://i.scdn.co/image/ab67616d00001e02bc1028b7e9cd2b17c770a520",
    },
  ];

  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <div className="relative w-full py-6 sm:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 belleza">
            Trusted by forward-thinking communities
          </p>
          <p className="text-xs text-gray-500 hidden sm:block belleza">
            Swipe to pause
          </p>
        </div>

        <div className="relative">
          <div
            className="flex gap-4 sm:gap-6 animate-scroll items-center"
            role="list"
          >
            {duplicatedSponsors.map((sponsor, index) => (
              <div
                key={`${sponsor.id}-${index}`}
                role="listitem"
                className="flex-shrink-0"
              >
                <div className="w-32 sm:w-40 h-20 sm:h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl transition-all duration-300 hover:border-[#10B981]/40 hover:shadow-lg hover:shadow-[#10B981]/10">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="w-16 h-16 object-cover rounded-xl opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="mt-2 text-center text-xs text-gray-400 belleza">
                  {sponsor.name}
                </p>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute top-0 left-0 w-16 sm:w-24 h-full bg-gradient-to-r from-[#101822] to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 w-16 sm:w-24 h-full bg-gradient-to-l from-[#101822] to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
