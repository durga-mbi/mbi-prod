import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Home, Users2, Building2, SmilePlus, BrainCircuit, Search, Filter, MessageSquare, CheckCircle, Rocket, RefreshCw, Zap, ChevronDown, Code2 } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import placeholderImage from "../assets/img_manpower.webp";

const steps = [
   { id: 1, title: 'Requirement Intelligence', desc: 'Precise analysis of business and technical needs to create an optimal candidate profile.', icon: <BrainCircuit size={28} />, stat: '95% Match' },
   { id: 2, title: 'Talent Discovery', desc: 'Targeted talent discovery leveraging global networks and smart screening methods.', icon: <Search size={28} />, stat: '500k+ Profiles' },
   { id: 3, title: 'Smart Screening', desc: 'Rigorous filtering and human behavioral analysis for perfect cultural fitness.', icon: <Filter size={28} />, stat: '24hr Turnaround' },
   { id: 4, title: 'Interview Sync', desc: 'Seamless scheduling and technical interview coordination driven by interactive tools.', icon: <MessageSquare size={28} />, stat: 'Zero Friction' },
   { id: 5, title: 'Skill Validation', desc: 'Comprehensive skill validation using advanced testing and performance analysis.', icon: <CheckCircle size={28} />, stat: 'Top 5% Selected' },
   { id: 6, title: 'Deployment', desc: 'Smooth onboarding and immediate integration into your active production teams.', icon: <Rocket size={28} />, stat: 'Instant Output' },
   { id: 7, title: 'Continuous Support', desc: 'Ongoing tracking, automated feedback loops, and HR administrative management.', icon: <RefreshCw size={28} />, stat: '24/7 Managed' },
];

const faqs = [
   { question: "How fast can you deploy a developer?", answer: "Our streamlined process and extensive talent networks allow us to deploy vetted, top-tier developers typically within 48 to 72 hours, depending on your exact tech stack requirements." },
   { question: "Who handles payroll and compliance?", answer: "We handle 100% of the HR administrative burden. This encompasses global payroll, local labor law compliance, benefits administration, and tax structuring, so you can focus entirely on your core product." },
   { question: "What if the candidate isn't a good fit?", answer: "We offer a zero-risk replacement guarantee. If a deployed candidate does not align with your technical or cultural expectations within the first 30 days, we will source a replacement immediately at no additional cost." },
   { question: "Can your process be customized for our needs?", answer: "Absolutely. Our sourcing, validation, and management processes are flexible and tailored to match your specific hiring requirements and business objectives." },
   { question: "What industries or roles do you specialize in?", answer: "We specialize in a wide range of domains including technology, engineering, and emerging fields, delivering talent that fits both technical and cultural needs." }
];

const techSkills = [
   "React", "Python", "AWS", "Docker", "Java", "Node.js",
   ".NET", "PHP", "MongoDB", "SAP", "Angular"
];

const ManpowerOutsourcing: React.FC = () => {
   const [openFaq, setOpenFaq] = useState<number | null>(null);
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const timelineRef = useRef<HTMLDivElement>(null);
   const { scrollXProgress } = useScroll({ container: timelineRef });

   // This animates the blue progress line horizontally as you scroll the container
   const scaleX = useTransform(scrollXProgress, [0, 1], [0.1, 1]);

   const fadeLeft = {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
   };

   const fadeRight = {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
   };

   const staggerContainer = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
   };

   const popIn = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
   };

   return (
      <div className="w-full bg-white font-['Poppins'] text-gray-900 overflow-hidden">

         {/* HERO SECTION */}
         <section className="bg-[#171D26] text-white pt-36 pb-20 text-center relative overflow-hidden">
            <motion.h1
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.8 }}
               className="text-5xl md:text-6xl font-bold mb-6 tracking-tight uppercase"
            >
               MANPOWER OUTSOURCING
            </motion.h1>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex items-center justify-center gap-2 text-sm md:text-base font-normal tracking-wide flex-wrap"
            >
               <Link to="/" className="flex flex-row gap-2 hover:text-white transition">
                  <Home size={20} className="text-white" />
               </Link>
               <span className="opacity-60 text-lg">{">"}</span>
               <span className="opacity-90 cursor-default">Services</span>
               <span className="opacity-60 text-lg">{">"}</span>
               <span className="opacity-90">Manpower Outsourcing</span>
            </motion.div>
         </section>

         {/* WE ALWAYS STRIVE TO BE BETTER SECTION */}
         <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeLeft}>
               <span className="text-gray-400 font-medium text-lg mb-4 block">
                  We always strive to be better
               </span>
               <h2 className="text-3xl md:text-4xl font-black mb-8 text-black leading-tight uppercase">
                  WE PROVIDE SKILLED WORKFORCE FOR YOUR BUSINESS NEEDS
               </h2>

               <div className="flex items-center gap-4 mb-8">
                  <div className="h-[2px] flex-grow bg-gray-200"></div>
                  <div className="h-[2px] w-20 bg-black"></div>
               </div>

               <p className="text-gray-500 leading-relaxed text-sm md:text-base font-normal">
                  Navigating today's highly dynamic market requires absolute agility and rapid access to specialized talent. Our comprehensive manpower outsourcing solutions empower you to scale your workforce on-demand without the tremendous overhead of traditional hiring processes.
               </p>
               <p className="text-gray-500 leading-relaxed text-sm md:text-base font-normal mt-4">
                  From temporary staffing solutions to fully managed dedicated remote teams, we rigorously vet and deploy top-tier professionals precisely matched to your business requirements, ensuring seamless integration and instant productivity impact. Let us handle recruitment, compliance, and administration while you focus exclusively on scaling your core operations.
               </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeRight} className="relative">
               <img
                  loading="lazy"
                  decoding="async"
                  src={placeholderImage}
                   alt="Corporate hiring and team collaboration"
                   className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3]"
               />
            </motion.div>
         </section>

         {/* ANIMATED STATS SECTION */}
         <section className="bg-gradient-to-b from-[#171D26] to-[#0A111A] text-white py-16 relative overflow-hidden">
            <motion.div
               initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
               className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center"
            >
               <motion.div variants={popIn} className="py-6 flex flex-col items-center group">
                  <Users2 size={40} className="text-white mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-5xl font-black mb-2 text-white">500+</h3>
                  <p className="text-gray-400 font-semibold uppercase tracking-widest text-sm">Employees Placed</p>
               </motion.div>

               <motion.div variants={popIn} className="py-6 flex flex-col items-center group">
                  <Building2 size={40} className="text-white mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-5xl font-black mb-2 text-white">100+</h3>
                  <p className="text-gray-400 font-semibold uppercase tracking-widest text-sm">Active Clients</p>
               </motion.div>

               <motion.div variants={popIn} className="py-6 flex flex-col items-center group">
                  <SmilePlus size={40} className="text-white mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-5xl font-black mb-2 text-white">95%</h3>
                  <p className="text-gray-400 font-semibold uppercase tracking-widest text-sm">Satisfaction Rate</p>
               </motion.div>
            </motion.div>
         </section>

         {/* HIRING JOURNEY - CLEAN HORIZONTAL MAPPING STYLE */}
         <section className="py-24 bg-[#f8fafc] text-[#171D26] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-16">
                  <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-extrabold uppercase mb-4 text-[#171D26]">
                     Our Hiring Roadmap
                  </motion.h2>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-[#171D26] mx-auto mb-6"></motion.div>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="text-gray-500 text-lg max-w-2xl mx-auto">
                     Swipe to follow our intelligent, 7-stage pathway that seamlessly connects your business with elite talent.
                  </motion.p>
               </div>
            </div>

            {/* The Horizontal Map Container */}
            <div
               ref={timelineRef}
               className="w-full overflow-x-auto pb-16 pt-8 px-6 md:px-12 hide-scrollbar snap-x cursor-grab active:cursor-grabbing"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
               {/* Webkit scrollbar hiding hack added via inline classes mostly, standard is fine */}

               <div className="inline-flex items-start gap-12 relative min-w-max px-4">

                  {/* Map Routing Lines */}
                  <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 z-0 rounded-full"></div>

                  {/* Interactive Scroll Line (Builds as you scroll the container) */}
                  <motion.div
                     className="absolute top-8 left-8 h-1 bg-black z-0 rounded-full origin-left hidden md:block"
                     style={{ scaleX, right: '2rem' }}
                  ></motion.div>

                  {/* Animated Map Line (Loads immediately for visual flair if not scrolling) */}
                  <motion.div
                     className="absolute top-8 left-8 h-1 bg-black z-0 rounded-full origin-left md:hidden"
                     initial={{ scaleX: 0 }}
                     whileInView={{ scaleX: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 2, ease: "easeOut" }}
                     style={{ right: '2rem' }}
                  ></motion.div>

                  {/* The 7 Map Nodes */}
                  {steps.map((step, index) => (
                     <motion.div
                        key={index}
                        className="relative z-10 w-[280px] sm:w-[320px] snap-center flex flex-col items-center group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                     >
                        {/* Map Waypoint Circle */}
                        <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-200 group-hover:border-black flex items-center justify-center text-[#171D26] shadow-sm transition-all duration-300 group-hover:scale-110 mb-8 overflow-hidden relative">
                           {/* Subtle color fill effect on hover */}
                           <div className="absolute inset-0 bg-black scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 ease-out z-0"></div>
                           <span className="relative z-10 font-black text-xl group-hover:text-white transition-colors duration-300">
                              {step.id}
                           </span>
                        </div>

                        {/* Step Content Card */}
                        <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 transition-all duration-300 relative text-center">
                           {/* Top Arrow Pointing to Circle */}
                           <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-l border-t border-gray-100 pointer-events-none group-hover:border-transparent transition-colors"></div>

                           <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#171D26] mb-4 mx-auto group-hover:bg-[#171D26] group-hover:text-white transition-colors duration-300">
                              {step.icon}
                           </div>

                           <h3 className="text-lg font-bold uppercase mb-3 text-[#171D26]">
                              {step.title}
                           </h3>

                           <p className="text-sm text-gray-500 leading-relaxed mb-6">
                              {step.desc}
                           </p>

                           <div className="inline-flex items-center gap-1.5 bg-[#f8fafc] border border-gray-100 text-black text-xs font-bold uppercase px-3 py-1.5 rounded-full tracking-wide group-hover:bg-[#171D26] transition-colors group-hover:text-white">
                              <Zap size={14} className="text-black group-hover:text-white" />
                              {step.stat}
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Scroll Helper Hint */}
            <div className="text-center mt-4">
               <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold animate-pulse hidden md:block">
                  ← Scroll to navigate the roadmap →
               </p>
               <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold animate-pulse md:hidden">
                  ← Swipe to navigate the roadmap →
               </p>
            </div>
         </section>

         {/* TECHNOLOGY STACK EXPERTISE - MARQUEE */}
         <section className="bg-gradient-to-b from-[#0A111A] to-[#171D26] py-24 text-center relative overflow-hidden">

            {/* Keyframes injected inline */}
            <style>{`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .marquee-left {
            animation: marquee-left 28s linear infinite;
          }
          .marquee-right {
            animation: marquee-right 32s linear infinite;
          }
          .marquee-left:hover,
          .marquee-right:hover {
            animation-play-state: paused;
          }
        `}</style>

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10">
               <motion.h2
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="text-2xl md:text-3xl font-bold uppercase text-white mb-4"
               >
                  EMPOWERED BY MODERN TECHNOLOGY
               </motion.h2>
               <motion.div
                  initial={{ width: 0 }} whileInView={{ width: "60px" }}
                  viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1 bg-white mx-auto mb-4 rounded-full"
               ></motion.div>

               {/* Row 1 — Tech Skills → scrolls LEFT */}
               <div className="mb-3">
                  <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">Technical Expertise</p>
                  <div className="relative w-full overflow-hidden flex">
                     {/* Left/Right fade masks */}
                     <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0A111A] to-transparent z-10 pointer-events-none"></div>
                     <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#171D26] to-transparent z-10 pointer-events-none"></div>
                     <div className="flex w-max marquee-left">
                        {[...techSkills, ...techSkills].map((name, idx) => (
                           <div
                              key={idx}
                              className="flex items-center gap-2 px-5 py-3 mx-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md cursor-default hover:bg-white/20 hover:scale-105 transition-all duration-300 shrink-0"
                           >
                              <Code2 size={16} className="text-white opacity-70" />
                              <span className="text-sm font-bold tracking-wider uppercase text-white whitespace-nowrap">{name}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Divider */}
               {/* <div className="w-px h-8 bg-white/20 mx-auto my-6"></div> */}

               {/* Row 2 — HR & Soft Skills → scrolls RIGHT */}
               {/* <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">HR & Soft Skills</p>
            <div className="relative w-full overflow-hidden flex">
              <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#171D26] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#171D26] to-transparent z-10 pointer-events-none"></div>
              <div className="flex w-max marquee-right">
                {[...hrSkills, ...hrSkills].map((name, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-5 py-3 mx-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md cursor-default hover:bg-white/20 hover:scale-105 transition-all duration-300 shrink-0"
                  >
                    <span className="w-2 h-2 rounded-full bg-white/60 flex-shrink-0"></span>
                    <span className="text-sm font-bold tracking-wider uppercase text-white whitespace-nowrap">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

            </div>
         </section>


         {/* INTERACTIVE FAQ SECTION */}
         <section className="py-24 bg-white text-[#171D26] relative">
            <div className="max-w-4xl mx-auto px-6">
               <div className="text-center mb-16">
                  <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-extrabold uppercase mb-4 text-[#171D26]">
                     FREQUENTLY ASKED QUESTIONS
                  </motion.h2>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-[#171D26] mx-auto mb-6"></motion.div>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="text-gray-500 text-lg max-w-2xl mx-auto">
                     Everything you need to know about our sourcing, deployment, and management processes.
                  </motion.p>
               </div>

               <div className="space-y-4">
                  {faqs.map((faq, idx) => {
                     const isOpen = openFaq === idx;
                     return (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.5, delay: idx * 0.1 }}
                           className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-[#00c2ff] bg-[#f8fafc] shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                        >
                           <button
                              onClick={() => setOpenFaq(isOpen ? null : idx)}
                              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                           >
                              <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-black' : 'text-[#171D26]'}`}>
                                 {faq.question}
                              </span>
                              <motion.div
                                 animate={{ rotate: isOpen ? 180 : 0 }}
                                 transition={{ duration: 0.3 }}
                                 className={`flex-shrink-0 ml-4 rounded-full p-1 ${isOpen ? 'bg-black/10 text-black' : 'text-gray-400'}`}
                              >
                                 <ChevronDown size={24} />
                              </motion.div>
                           </button>

                           <AnimatePresence>
                              {isOpen && (
                                 <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                 >
                                    <div className="px-6 pb-6 pt-0 text-gray-500 leading-relaxed text-base border-t border-gray-100/0">
                                       <div className="pt-4 border-t border-gray-100">
                                          {faq.answer}
                                       </div>
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

      </div>
   );
};

export default ManpowerOutsourcing;
