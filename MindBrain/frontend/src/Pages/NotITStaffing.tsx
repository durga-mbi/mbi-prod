import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home, Briefcase, ChevronDown, Users2, Building2, SmilePlus, Zap, Megaphone, UserCheck, HandshakeIcon, Wrench, PackageCheck, TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  { title: "Marketing", desc: "Digital marketers, brand strategists, SEO specialists, content creators, and campaign managers who drive growth and visibility.", icon: <Megaphone size={28} />, badge: "Growth Role" },
  { title: "HR", desc: "Human resources managers, talent acquisition specialists, and HR business partners who attract, retain, and develop top talent.", icon: <UserCheck size={28} />, badge: "Core Function" },
  { title: "Account Manager", desc: "Client relationship managers, key account executives, and business development managers who nurture and grow client portfolios.", icon: <HandshakeIcon size={28} />, badge: "Revenue Driver" },
  { title: "Field Operator", desc: "On-site technicians, field service engineers, and operations specialists who execute ground-level tasks with precision.", icon: <Wrench size={28} />, badge: "Ops Critical" },
  { title: "Delivery Agent", desc: "Last-mile delivery professionals, logistics coordinators, and courier agents ensuring timely and accurate order fulfilment.", icon: <PackageCheck size={28} />, badge: "High Volume" },
  { title: "Sales Executive", desc: "B2B and B2C sales professionals, inside sales reps, and enterprise sales executives who consistently hit targets and expand market reach.", icon: <TrendingUp size={28} />, badge: "Fast-Fill" },
];

const faqs = [
  { question: "What is non-IT staffing?", answer: "We serve industries like manufacturing, retail, healthcare, hospitality, education, logistics, and corporate sectors." },
  { question: "What non-IT sectors do you primarily serve?", answer: "We serve a wide range of non-IT industries including manufacturing, healthcare, retail, FMCG, logistics, hospitality, and administrative services. Our talent pool spans blue-collar to white-collar non-technology roles." },
  { question: "Can you handle large-scale bulk hiring?", answer: "Absolutely. We are equipped to handle bulk hiring requirements ranging from 10 to 10,000+ candidates simultaneously. Our dedicated recruitment teams ensure speed and quality at every scale." },
  { question: "Do you manage on-site labour compliance and payroll?", answer: "Yes. We offer end-to-end payroll processing, statutory compliance (PF, ESI, Labour Laws), and on-site HR support for our non-IT staffing engagements, giving you complete peace of mind." },
  { question: "Why choose your non-IT staffing services?", answer: "We offer a wide talent pool, fast hiring processes, and reliable workforce solutions tailored to business needs." },
];

const nonItSkills = [
  "Recruitment", "Employee Relations", "Payroll", "Compensation", "Management",
  "Labour Laws", "Onboarding", "Offboarding", "Training", "HR Operations",
  "Time Management", "Communication", "Negotiation", "Networking", "Team Management",
  "Leadership", "Team Collaboration", "Stakeholder Management",
  "Market Research", "Business Development", "Problem Solving",
];



const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const NotITStaffing: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="w-full bg-white font-['Poppins'] text-gray-900 overflow-hidden">

      {/* HERO */}
      <section className="bg-[#171D26] text-white pt-36 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-white/10 rounded-full blur-[120px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Briefcase size={14} /> Non-IT Staffing Solutions
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight uppercase">
            NOT IT STAFFING
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-normal tracking-wide flex-wrap text-gray-300">
            <Link to="/" className="hover:text-white transition"><Home size={20} className="text-white" /></Link>
            <span className="opacity-60 text-lg">{">"}</span>
            <span className="opacity-90">Services</span>
            <span className="opacity-60 text-lg">{">"}</span>
            <Link to="/services/manpower-outsourcing" className="opacity-90 hover:text-white transition">Manpower Outsourcing</Link>
            <span className="opacity-60 text-lg">{">"}</span>
            <span className="text-white">Not IT Staffing</span>
          </div>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <span className="text-gray-400 font-medium text-lg mb-4 block">Beyond Technology — Real World Workforce</span>
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-black leading-tight uppercase">
            POWERING YOUR BUSINESS WITH THE RIGHT NON-TECH TALENT
          </h2>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] flex-grow bg-gray-200" />
            <div className="h-[2px] w-20 bg-black" />
          </div>
          <p className="text-gray-500 leading-relaxed text-sm md:text-base mb-4">
            Great businesses aren't built on technology alone. From the factory floor to the hospital ward, from the retail counter to the logistics hub — every industry depends on reliable, skilled non-IT professionals who form the backbone of operations.
          </p>
          <p className="text-gray-500 leading-relaxed text-sm md:text-base">
            MindBrain's non-IT staffing division specializes in sourcing, screening, and deploying the right human talent across a wide spectrum of industries — ensuring your operations never skip a beat no matter the scale or speed of your growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contactus" className="inline-flex items-center gap-2 bg-[#171D26] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 text-sm uppercase tracking-wide">
              Hire Non-IT Talent
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="relative">
          <div className="bg-gradient-to-br from-[#171D26] to-[#0A111A] rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {[
                { label: "Avg. Deployment Time", value: "24hrs" },
                { label: "Non-IT Roles Filled", value: "200+" },
                { label: "Industries Served", value: "15+" },
                { label: "Retention Rate", value: "91%" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-colors">
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="bg-gradient-to-b from-[#171D26] to-[#0A111A] text-white py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center"
        >
          {[
            { icon: <Users2 size={40} className="text-white mb-4 group-hover:scale-110 transition-transform" />, value: "200+", label: "Non-IT Placements" },
            { icon: <Building2 size={40} className="text-white mb-4 group-hover:scale-110 transition-transform" />, value: "15+", label: "Industries Covered" },
            { icon: <SmilePlus size={40} className="text-white mb-4 group-hover:scale-110 transition-transform" />, value: "91%", label: "Retention Rate" },
          ].map((stat, i) => (
            <motion.div key={i} variants={popIn} className="py-6 flex flex-col items-center group">
              {stat.icon}
              <h3 className="text-5xl font-black mb-2 text-white">{stat.value}</h3>
              <p className="text-gray-400 font-semibold uppercase tracking-widest text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ROLES WE STAFF */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-extrabold uppercase mb-4 text-[#171D26]">
              Non-IT Roles We Staff
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-[#171D26] mx-auto mb-6" />
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Skilled, semi-skilled, and management-level professionals across every major non-technology industry.</p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, i) => (
              <motion.div key={i} variants={popIn} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#171D26]/5 flex items-center justify-center text-[#171D26] group-hover:bg-[#171D26] group-hover:text-white transition-colors duration-300">
                    {role.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-900 bg-gray-200 px-3 py-1 rounded-full border border-gray-300">
                    {role.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold uppercase mb-2 text-[#171D26]">{role.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{role.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NON-IT SKILLS — Single Infinite Marquee */}
      <style>{`
        @keyframes skill-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .skill-scroll { animation: skill-scroll 44s linear infinite; }
        .skill-track:hover .skill-scroll { animation-play-state: paused; }
      `}</style>
      <section className="bg-gradient-to-b from-[#0A111A] to-[#171D26] py-24 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-white/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-bold uppercase text-white mb-4">
            Skills &amp; Competencies We Staff
          </motion.h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: "60px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-white mx-auto mb-14 rounded-full" />

          <div className="skill-track overflow-hidden">
            <div className="skill-scroll flex gap-5 w-max">
              {[...nonItSkills, ...nonItSkills].map((name, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/8 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 cursor-default flex-shrink-0">
                  <Briefcase size={15} className="text-white/60" />
                  <span className="text-sm font-bold tracking-widest uppercase text-white whitespace-nowrap">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* <p className="text-gray-500 text-xs mt-6 uppercase tracking-widest">Hover to pause</p> */}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold uppercase mb-4 text-[#171D26]">
              Frequently Asked Questions
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-[#171D26] mx-auto mb-6" />
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-gray-500 bg-gray-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <button onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                    <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-black' : 'text-[#171D26]'}`}>{faq.question}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 ml-4 rounded-full p-1 ${isOpen ? 'bg-gray-200 text-black' : 'text-gray-400'}`}
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                        <div className="px-6 pb-6 pt-0 text-gray-500 leading-relaxed text-base">
                          <div className="pt-4 border-t border-gray-100">{faq.answer}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#171D26] py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Zap size={14} /> Ready to Build Your Team?
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">Power Up Your Non-IT Workforce</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">Tell us your staffing requirements and we'll have the right people placed and ready to work — fast.</p>
          <Link to="/contactus" className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-gray-300 transition-colors uppercase tracking-wide text-sm shadow-lg">
            Contact Us Today
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default NotITStaffing;
