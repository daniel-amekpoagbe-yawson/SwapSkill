import { useState } from "react";
import { Mail, Phone, MapPin, Clock, SendHorizonal, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const contactChannels = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+233 (0) 55 123 4567",
    meta: "Mon - Fri, 9am - 6pm GMT",
  },
  {
    icon: Mail,
    title: "Email Support",
    detail: "hello@swapskill.africa",
    meta: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Visit Our Hub",
    detail: "Impact Hub, Accra",
    meta: "Book a tour in advance",
  },
];

const officeHours = [
  { label: "Monday - Friday", value: "9:00am - 6:00pm GMT" },
  { label: "Saturday", value: "10:00am - 2:00pm GMT" },
  { label: "Sunday & Holidays", value: "Community-only support" },
];

const initialForm = {
  name: "",
  email: "",
  topic: "General question",
  message: "",
};

const Contact = () => {
  const [formState, setFormState] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("success");
    setTimeout(() => setStatus("idle"), 4000);
    setFormState(initialForm);
  };

  return (
    <div className="w-full bg-[#101822] text-white px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
        {/* Intro */}
        <section className="space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.3em] text-gray-300 belleza">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            Contact
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold cinzel leading-tight">
              Let's make your skill exchange journey smooth.
            </h1>
            <p className="text-gray-300 text-base sm:text-lg belleza max-w-3xl">
              Whether you want to partner, report an issue, or simply say hi,
              we’re always ready to connect. Reach out through any channel or
              drop us a message — we typically respond within a day.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {contactChannels.map((channel) => (
            <div
              key={channel.title}
              className="bg-gray-900/60 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-xl hover:border-[#10B981]/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mb-4">
                <channel.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold cinzel mb-1">
                {channel.title}
              </h3>
              <p className="text-white text-base belleza">{channel.detail}</p>
              <p className="text-sm text-gray-400 mt-2">{channel.meta}</p>
            </div>
          ))}
        </section>

        {/* Form + Info */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 bg-gray-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-semibold cinzel">
                Send us a message
              </h2>
              <p className="text-gray-400 belleza">
                Tell us how we can help and we’ll get back within 24 hours.
              </p>
            </div>

            {status === "success" && (
              <Alert className="mb-6 border-[#10B981]/40 bg-[#10B981]/10">
                <AlertDescription className="text-[#10B981] belleza">
                  Message received! Our community team will reply shortly.
                </AlertDescription>
              </Alert>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm text-gray-300 belleza"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/30 transition-all belleza"
                    placeholder="Ama Owusu"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm text-gray-300 belleza"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/30 transition-all belleza"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="topic"
                  className="text-sm text-gray-300 belleza"
                >
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formState.topic}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/30 transition-all belleza"
                >
                  <option>General question</option>
                  <option>Partnership request</option>
                  <option>Report an issue</option>
                  <option>Media & press</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm text-gray-300 belleza"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/30 transition-all belleza resize-none"
                  placeholder="Let us know how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-semibold px-6 sm:px-8 py-3 rounded-2xl shadow-lg hover:shadow-[#10B981]/30 transition-transform hover:scale-[1.01]"
              >
                Send message
                <SendHorizonal className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-xl font-semibold mb-4 cinzel">
                Office hours
              </h3>
              <div className="space-y-4">
                {officeHours.map((slot) => (
                  <div
                    key={slot.label}
                    className="flex items-start justify-between text-sm text-gray-300 belleza"
                  >
                    <span>{slot.label}</span>
                    <span className="text-white font-medium">
                      {slot.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-[#10B981] text-sm pt-2">
                  <Clock className="w-4 h-4" />
                  <span>Workshops every last Saturday of the month</span>
                </div>
              </div>
            </div>

            <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-xl font-semibold mb-2 cinzel">
                Prefer email?
              </h3>
              <p className="text-gray-200 belleza">
                Just drop a note to{" "}
                <a
                  href="mailto:community@swapskill.africa"
                  className="text-[#10B981] font-medium"
                >
                  community@swapskill.africa
                </a>{" "}
                and we’ll take it from there.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
