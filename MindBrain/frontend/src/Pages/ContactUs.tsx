import React, { useState } from "react";
import { Home, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { apiPost, type ApiResponse, type ContactPayload } from "../api/api";

const limitPhoneDigits = (value: string) => value.replace(/\D/g, "").slice(0, 10);

const ContactUs = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: limitPhoneDigits(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (formData.phone && formData.phone.length !== 10) {
        throw new Error("Phone number must be exactly 10 digits.");
      }

      const result = await apiPost<ApiResponse<unknown>>(
        "/contacts",
        formData satisfies ContactPayload
      );

      setSubmitStatus({
        type: "success",
        message: result.message || "Thank you for your message!",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full font-['Poppins']">
      <section className="pt-36 pb-20 bg-[#171D26] text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4">
          CONTACT US
        </h1>
        <div className="flex justify-center items-center gap-2 text-sm text-gray-300">
          <Link
            to="/"
            className="flex items-center hover:text-white transition-colors"
          >
            <Home size={18} />
          </Link>
          <span className="opacity-60 text-lg">{">"}</span>
          <span className="opacity-90">Contact Us</span>
        </div>
      </section>

      <section className="pt-16 pb-12 text-center bg-white">
        <h2 className="text-3xl font-bold uppercase text-black mb-2 tracking-tight">
          CONTACT US
        </h2>
        <p className="text-gray-500 text-[11px] tracking-wide">
          Any question or remarks? Just write us a message!
        </p>
      </section>

      <section className="pb-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24 relative flex flex-col md:flex-row">
          <div className="flex-1 pr-0 md:pr-16">
            <p className="text-gray-500 mb-6 text-xs font-medium tracking-wide">
              Get Started
            </p>
            <h2 className="text-4xl md:text-[2.75rem] font-bold mb-20 text-black leading-[1.1] uppercase max-w-3xl tracking-tight">
              GET IN TOUCH WITH US. WE&apos;RE HERE TO ASSIST YOU.
            </h2>

            <form onSubmit={handleSubmit} className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border-b border-gray-300 outline-none pb-3 text-[13px] font-medium placeholder-gray-800 text-black focus:border-black transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border-b border-gray-300 outline-none pb-3 text-[13px] font-medium placeholder-gray-800 text-black focus:border-black transition-colors"
                />
                <input
                  type="text"
                  placeholder="Phone Number (optional)"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  className="w-full border-b border-gray-300 outline-none pb-3 text-[13px] font-medium placeholder-gray-800 text-black focus:border-black transition-colors"
                />
              </div>

              <input
                type="text"
                placeholder="Message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full border-b border-gray-300 outline-none pb-3 text-[13px] font-medium placeholder-gray-800 text-black focus:border-black transition-colors"
              />

              <div className="pt-6">
                {submitStatus && (
                  <p
                    className={`mb-4 text-sm font-medium ${
                      submitStatus.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0f1418] text-white px-8 py-3.5 rounded-full text-xs font-semibold hover:bg-black transition-colors flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Leave us a Message"}
                  <span className="text-base font-normal leading-none mt-[-2px]">
                    &rarr;
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div className="hidden md:flex flex-col gap-4 mt-20 pt-4 items-center pl-8">
            <a
              href="#"
              className="w-[34px] h-[34px] rounded-full bg-[#374147] text-white flex items-center justify-center hover:bg-black transition-colors shadow-sm"
            >
              <Facebook size={14} fill="currentColor" stroke="none" />
            </a>
            <a
              href="#"
              className="w-[34px] h-[34px] rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm text-gray-500"
            >
              <Instagram size={14} />
            </a>
            <a
              href="#"
              className="w-[34px] h-[34px] rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm text-gray-500"
            >
              <Twitter size={14} fill="currentColor" stroke="none" />
            </a>
          </div>
        </div>
      </section>

      <section className="w-full h-[400px] mt-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.81921315117!2d85.8077493!3d20.3490859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909525dd71d6b%3A0xcdfa48116cf16775!2sMindBrain%20Innovations%20Private%20Limited%20(Custom%20Software%20Development%2C%20IT%20Staffing%2C%20AI_IOT_Robotics%20Training%20and%20Research%20Hub)!5e0!3m2!1sen!2sin!4v1775551134347!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location Map"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactUs;
