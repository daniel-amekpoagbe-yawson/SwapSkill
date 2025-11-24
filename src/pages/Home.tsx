import { HeroSection } from "@/components/custom/HeroSection";
import Testimonials from "@/components/custom/Testimonial";
import Faqs from "@/components/custom/Faqs";
import SponsoredSlider from "@/components/custom/SponsoredSlider";

export const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-full text-white overflow-x-hidden bg-[#101822]">
      <HeroSection />
      <section className="w-full border-y border-white/5 bg-[#0e1620]/80 backdrop-blur-xl">
        <SponsoredSlider />
      </section>

      <main className="flex flex-col gap-16 sm:gap-24 pt-10 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Testimonials />
        <Faqs />
      </main>
    </div>
  );
};
