import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Monitor, Server, Cloud, Shield, Database, Code2, ChevronDown, Users2, Building2, SmilePlus, Zap, Bot, Settings2, BarChart3, UserCog } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  { title: "AI Engineer", desc: "Machine learning engineers, LLM specialists, and AI solution architects building intelligent systems for modern businesses.", icon: <Bot size={28} />, badge: "Hot Skills" },
  { title: "SAP Engineer", desc: "SAP S/4HANA consultants, ABAP developers, and SAP Basis administrators for enterprise-grade ERP implementations.", icon: <Settings2 size={28} />, badge: "High Demand" },
  { title: "Cloud Engineer", desc: "AWS, Azure, and GCP cloud architects, cloud migration specialists, and infrastructure engineers.", icon: <Cloud size={28} />, badge: "Trending" },
  { title: "Data Engineer", desc: "Big data pipeline builders, ETL specialists, and data warehouse architects for analytics-driven organizations.", icon: <Database size={28} />, badge: "Essential" },
  { title: "Salesforce Engineer", desc: "Salesforce CRM developers, administrators, and solution architects with deep platform expertise across Sales & Service Cloud.", icon: <BarChart3 size={28} />, badge: "In Demand" },
  { title: "DevOps Engineer", desc: "CI/CD pipeline engineers, Kubernetes experts, and site reliability engineers who accelerate software delivery.", icon: <Server size={28} />, badge: "Core" },
  { title: "Cybersecurity Expert", desc: "SOC analysts, penetration testers, and compliance security professionals safeguarding your digital infrastructure.", icon: <Shield size={28} />, badge: "Critical" },
  { title: "Consultant", desc: "IT strategy consultants, enterprise architects, and digital transformation advisors driving measurable business outcomes.", icon: <UserCog size={28} />, badge: "Strategic" },
  { title: "Full Stack Developer", desc: "End-to-end web developers proficient in frontend frameworks and backend services, delivering complete, production-ready applications.", icon: <Code2 size={28} />, badge: "High Demand" },
];

const faqs = [
  { question: "What is IT staffing?", answer: "IT staffing is the process of hiring skilled technology professionals for short-term, long-term, or permanent roles based on business needs." },
  { question: "What IT roles can you staff quickly?", answer: "We specialize in placing software engineers, cloud architects, data scientists, DevOps engineers, cybersecurity professionals, and QA specialists — typically within 48–72 hours of requirement submission." },
  { question: "Do you offer contract-to-hire or permanent staffing?", answer: "Yes. We offer flexible engagement models including contract, contract-to-hire, and direct permanent placement to suit your business needs and budget." },
  { question: "How do you handle compliance and payroll?", answer: "We manage payroll, legal compliance, and documentation, ensuring a hassle-free hiring experience." },
  { question: "Why choose your IT staffing services", answer: "We combine industry expertise, a vast talent pool, and efficient processes to deliver reliable and high-quality staffing solutions." },
  { question: "How do you ensure technical competency?", answer: "Every candidate undergoes a rigorous technical screening process including coding assessments, system design interviews, and peer-level technical reviews before being presented to you." },
];

const technologies = [
  ".NET", "Azure", "SQL", "PostgreSQL", "AI / ML", "PHP",
  "Laravel", "Salesforce", "SAP ABAP", "SAP MM", "SAP CRM", "SAP Ariba",
  "WebMethods", "SaaS", "Angular", "Node.js", "Vue.js", "Express.js",
  "MongoDB", "React Native", "Power BI", "Golang",
];



const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const ITStaffing: React.FC = () => {
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
            <Monitor size={14} /> IT Staffing Solutions
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight uppercase">
            IT STAFFING
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-normal tracking-wide flex-wrap text-gray-300">
            <Link to="/" className="hover:text-white transition"><Home size={20} className="text-white" /></Link>
            <span className="opacity-60 text-lg">{">"}</span>
            <span className="opacity-90">Services</span>
            <span className="opacity-60 text-lg">{">"}</span>
            <Link to="/services/manpower-outsourcing" className="opacity-90 hover:text-white transition">Manpower Outsourcing</Link>
            <span className="opacity-60 text-lg">{">"}</span>
            <span className="text-white">IT Staffing</span>
          </div>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <span className="text-gray-400 font-medium text-lg mb-4 block">Precision Technology Talent</span>
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-black leading-tight uppercase">
            BRIDGE YOUR TECHNOLOGY SKILL GAPS WITH TOP IT TALENT
          </h2>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] flex-grow bg-gray-200" />
            <div className="h-[2px] w-20 bg-black" />
          </div>
          <p className="text-gray-500 leading-relaxed text-sm md:text-base mb-4">
            In today's fast-evolving digital landscape, finding the right IT talent is the difference between innovation and stagnation. Our IT staffing solutions give you immediate access to a pre-vetted pool of technology professionals — from software engineers to cloud architects — ready to integrate seamlessly into your teams.
          </p>
          <p className="text-gray-500 leading-relaxed text-sm md:text-base">
            Whether you need a single specialist or an entire engineering squad, we match precisely the right skill set to your project requirements, saving you months of recruitment time and overhead costs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/services/software-training" className="inline-flex items-center gap-2 bg-[#171D26] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 text-sm uppercase tracking-wide">
              Get IT Talent Now
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="relative">
          <div className="bg-gradient-to-br from-[#171D26] to-[#0A111A] rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {[
                { label: "Avg. Time to Deploy", value: "48hrs" },
                { label: "IT Professionals", value: "300+" },
                { label: "Client Retention", value: "96%" },
                { label: "Tech Domains", value: "20+" },
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
            { icon: <Users2 size={40} className="text-white mb-4 group-hover:scale-110 transition-transform" />, value: "300+", label: "IT Professionals Placed" },
            { icon: <Building2 size={40} className="text-white mb-4 group-hover:scale-110 transition-transform" />, value: "80+", label: "Tech Companies Served" },
            { icon: <SmilePlus size={40} className="text-white mb-4 group-hover:scale-110 transition-transform" />, value: "96%", label: "Client Satisfaction" },
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
              IT Roles We Staff
            </motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-[#171D26] mx-auto mb-6" />
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">From individual contributors to entire engineering teams — we have the talent pipeline to meet your needs.</p>
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

      {/* TECH STACK — Single Infinite Marquee */}
      <style>{`
        @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-scroll { animation: marquee-scroll 40s linear infinite; }
        .marquee-track:hover .marquee-scroll { animation-play-state: paused; }
      `}</style>
      <section className="bg-gradient-to-b from-[#0A111A] to-[#171D26] py-24 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-bold uppercase text-white mb-4">
            Technologies Our Professionals Master
          </motion.h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: "60px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-white mx-auto mb-14 rounded-full" />

          <div className="marquee-track overflow-hidden">
            <div className="marquee-scroll flex gap-5 w-max">
              {[...technologies, ...technologies].map((name, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/8 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 cursor-default flex-shrink-0">
                  <Code2 size={15} className="text-white/60" />
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
            <Zap size={14} /> Ready to Scale?
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">Find Your Next IT Professional</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">Tell us your requirements. We'll match you with the right talent in under 48 hours.</p>
          <Link to="/contactus" className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-gray-300 transition-colors uppercase tracking-wide text-sm shadow-lg">
            Contact Us Today
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default ITStaffing;
