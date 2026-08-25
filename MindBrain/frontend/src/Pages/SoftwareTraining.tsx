import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Globe,
  BrainCircuit,
  Database,
  Cloud,
  CheckCircle2,
  UserPlus,
  MonitorPlay,
  Terminal,
  Award,
  Briefcase,
  ChevronRight,
  ChevronDown,
  Users,
  FileText,
  Star,
  Cpu,
  Layers,
  TrendingUp,
  ShieldCheck,
  Search,
  ArrowRight,
} from "lucide-react";

// ─── Animated Counter Hook ─────────────────────────────────────────────────────
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  target,
  suffix,
  prefix,
  label,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const { count, ref } = useCounter(target);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl p-10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
    >
      <span className="text-5xl font-black text-black tracking-tight">
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-3 text-center">
        {label}
      </span>
    </div>
  );
}

// ─── Testimonial Slider ─────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      "I got placed within 2 months after completing the MERN Stack training! The hands-on projects made all the difference.",
    name: "Priya Sharma",
    role: "Software Developer, TCS",
    initials: "PS",
  },
  {
    quote:
      "The Python & AI course was incredibly structured. My mentor was always available, and the mock interviews boosted my confidence.",
    name: "Rahul Nair",
    role: "Data Analyst, Infosys",
    initials: "RN",
  },
  {
    quote:
      "From Day 1, the team focused on real-world skills. I landed a Cloud Engineer role at a top MNC within 3 months.",
    name: "Ananya Verma",
    role: "Cloud Engineer, Wipro",
    initials: "AV",
  },
];

// ─── FAQ Data ───────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Do you guarantee placement?",
    a: "We provide 100% placement assistance with guaranteed interview opportunities at our 100+ hiring partner companies.",
  },
  {
    q: "Is training conducted online or offline?",
    a: "Both modes are available. You can choose fully online, offline, or a hybrid model based on your preference and location.",
  },
  {
    q: "Do you provide certificates upon course completion?",
    a: "Yes, you receive an industry-recognized certification upon successfully completing your course and capstone project.",
  },
  {
    q: "What is the duration of each training program?",
    a: "Programs typically range from 8 to 16 weeks depending on the course. Intensive and weekend batches are also available.",
  },
  {
    q: "Can freshers enroll in these programs?",
    a: "Absolutely. Our programs are designed for both freshers and working professionals looking to upskill or pivot their careers.",
  },
];

// ─── Hiring Partner Logos ───────────────────────────────────────────────────────
const hiringPartners = [
  { name: "Google", short: "G" },
  { name: "Microsoft", short: "Ms" },
  { name: "Amazon", short: "AWS" },
  { name: "Infosys", short: "If" },
  { name: "TCS", short: "TCS" },
  { name: "Wipro", short: "Wi" },
  { name: "Accenture", short: "Acc" },
  { name: "Cognizant", short: "Cog" },
];

// ─── Animation Variants ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Main Component ─────────────────────────────────────────────────────────────
const SoftwareTraining: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const t = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % testimonials.length),
      4000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full bg-white font-['Poppins'] text-gray-900 overflow-hidden">

      {/* ════════════════════════════════════════════════════════════════
          1. BREADCRUMB / PAGE TITLE HERO
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#171D26] text-white pt-36 pb-20 text-center relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow blobs */}
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight uppercase"
          >
            Training &amp; Placement
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
            <span className="opacity-90">Services</span>
            <span className="opacity-60 text-lg">{">"}</span>
            <span className="opacity-90">Training &amp; Placement</span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. HERO SECTION — Bold Headline + CTAs
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0d0d0d] text-white py-32 px-6 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 50%, rgba(60,60,60,0.6) 0%, transparent 70%)",
              "radial-gradient(ellipse at 80% 50%, rgba(60,60,60,0.6) 0%, transparent 70%)",
              "radial-gradient(ellipse at 20% 50%, rgba(60,60,60,0.6) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase mb-6"
          >
            MindBrain Innovations
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-[1.05] mb-5 uppercase tracking-tight"
          >
            Build Skills.{" "}
            <span className="text-gray-400">Get Placed.</span>
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-black leading-tight mb-6 text-gray-300"
          >
            Shape Your Future.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-gray-400 mb-4 font-medium"
          >
            From Learning to Earning — We Guide You
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm text-gray-500 mb-12 max-w-xl mx-auto"
          >
            Industry-focused training with guaranteed placement assistance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#courses"
              className="group inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Explore Courses <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/careers"
              className="group inline-flex items-center gap-2 border border-white/30 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. TRAINING WE OFFER — 6 Course Cards
      ════════════════════════════════════════════════════════════════ */}
      <section id="courses" className="bg-gray-50 py-24 px-6 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.35em] text-gray-400 uppercase block mb-4"
            >
              What We Teach
            </motion.span>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black"
            >
              Training We Offer
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-black mx-auto mt-6"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {[
              {
                slug: "iot-robotics",
                icon: <Cpu size={28} />,
                title: "IoT & Robotics",
                desc: "Hands-on training designed with real-world projects and industry tools. Connect the physical and digital worlds.",
              },
              {
                slug: "python-ai",
                icon: <BrainCircuit size={28} />,
                title: "Python & AI",
                desc: "Hands-on training designed with real-world projects and industry tools. Build intelligent systems and automation pipelines.",
              },
              {
                slug: "data-science",
                icon: <Database size={28} />,
                title: "Data Science",
                desc: "Hands-on training designed with real-world projects and industry tools. Turn raw data into actionable business insights.",
              },
              {
                slug: "web-development",
                icon: <Globe size={28} />,
                title: "Web Development",
                desc: "Hands-on training designed with real-world projects and industry tools. Master MongoDB, Express, React & Node.js.",
              },
              {
                slug: "cloud-computing",
                icon: <Cloud size={28} />,
                title: "Cloud Computing",
                desc: "Hands-on training designed with real-world projects and industry tools. Design and deploy scalable cloud architectures.",
              },
              {
                slug: "ui-ux-design",
                icon: <Layers size={28} />,
                title: "UI/UX Design",
                desc: "Hands-on training designed with real-world projects and industry tools. Craft beautiful, user-centric digital experiences.",
              },
            ].map((course, idx) => (
              <motion.div key={idx} variants={itemFade}>
                <Link
                  to={`/services/software-training/${course.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-black mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    {course.icon}
                  </div>
                  <h3 className="text-lg font-black uppercase text-black mb-2">{course.title}</h3>
                  <div className="mb-4">
                    <span className="inline-block text-sm font-extrabold text-black bg-gray-100 border border-gray-200/80 px-3 py-1 rounded-lg tracking-wide shadow-sm">
                      Price - INR 2,999/- per month
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{course.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-black group-hover:text-gray-500 transition-colors mt-auto">
                    View Details <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. WHY CHOOSE US
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.35em] text-gray-400 uppercase block mb-4"
            >
              Our Advantage
            </motion.span>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black"
            >
              Why Choose Us
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-black mx-auto mt-6"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <Users size={26} />,
                title: "Industry Experts as Mentors",
                desc: "Learn directly from professionals with 10+ years of real-world industry experience.",
              },
              {
                icon: <Briefcase size={26} />,
                title: "Live Projects & Internships",
                desc: "Work on actual client projects and internships to build a job-ready portfolio.",
              },
              {
                icon: <TrendingUp size={26} />,
                title: "Placement Support",
                desc: "Dedicated placement team with connections to 100+ companies actively hiring.",
              },
              {
                icon: <FileText size={26} />,
                title: "Resume & Interview Prep",
                desc: "Personalized resume reviews and rigorous mock interview sessions with feedback.",
              },
              {
                icon: <Award size={26} />,
                title: "Certification Programs",
                desc: "Earn recognised industry certifications that strengthen your professional profile.",
              },
              {
                icon: <ShieldCheck size={26} />,
                title: "Structured Curriculum",
                desc: "Carefully curated syllabus aligned with the latest industry demands and trends.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemFade}
                className="flex items-start gap-5 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-black hover:bg-white transition-all group shadow-sm hover:shadow-lg"
              >
                <div className="w-12 h-12 shrink-0 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={15} className="text-gray-300 group-hover:text-black transition-colors" />
                    <h3 className="font-bold text-sm uppercase text-black tracking-wide">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. PLACEMENT HIGHLIGHTS — Animated Counters
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0d0d0d] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.35em] text-gray-500 uppercase block mb-4"
            >
              Our Impact
            </motion.span>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-white"
            >
              Placement Highlights
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-white mx-auto mt-6"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard target={500} suffix="+" label="Students Placed" />
            <StatCard target={100} suffix="+" label="Hiring Partners" />
            <StatCard target={12} prefix="₹" suffix=" LPA" label="Highest Package" />
            <StatCard target={90} suffix="%" label="Placement Rate" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          6. HIRING PARTNERS — Logo Grid
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.35em] text-gray-400 uppercase block mb-4"
            >
              Our Network
            </motion.span>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black"
            >
              Hiring Partners
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-black mx-auto mt-6"
            />
            <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto">
              Our graduates are placed in top global and local companies across industries.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
          >
            {hiringPartners.map((p, idx) => (
              <motion.div
                key={idx}
                variants={itemFade}
                className="group flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-default"
              >
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-black rounded-xl flex items-center justify-center font-black text-gray-400 group-hover:text-white text-sm transition-all duration-300">
                  {p.short}
                </div>
                <span className="mt-3 text-xs font-semibold text-gray-400 group-hover:text-black transition-colors">
                  {p.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          7. STUDENT SUCCESS STORIES — Testimonial Slider
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.35em] text-gray-400 uppercase block mb-4"
            >
              Real Stories
            </motion.span>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black"
            >
              Student Success Stories
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-black mx-auto mt-6"
            />
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 border border-gray-200 rounded-3xl p-10 md:p-14 shadow-md"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-black text-black" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-10 italic">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center font-bold text-base">
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div>
                    <div className="font-bold text-black">{testimonials[activeTestimonial].name}</div>
                    <div className="text-sm text-gray-500">{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeTestimonial ? "bg-black w-6" : "bg-gray-300 hover:bg-gray-500"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          8. TRAINING PROCESS — Hexagon Timeline
      ════════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-24 bg-gray-50 border-y border-gray-200 relative">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.35em] text-gray-400 uppercase block mb-4"
          >
            Step by Step
          </motion.span>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold uppercase text-black"
          >
            Training Process
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-black mx-auto mt-6"
          />
        </div>

        {/* Desktop Hexagon Timeline */}
        <div className="max-w-6xl mx-auto relative hidden md:block">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -translate-y-1/2 z-0" />
          <div className="flex justify-between items-center relative z-10">
            {[
              { id: "01", title: "ENROLLMENT", icon: <UserPlus size={32} />, pos: "bottom" },
              { id: "02", title: "SKILL\nASSESSMENT", icon: <Search size={32} />, pos: "top" },
              { id: "03", title: "TRAINING\n+ PROJECTS", icon: <MonitorPlay size={32} />, pos: "bottom" },
              { id: "04", title: "MOCK\nINTERVIEWS", icon: <Terminal size={32} />, pos: "top" },
              { id: "05", title: "PLACEMENT\nASSISTANCE", icon: <Briefcase size={32} />, pos: "bottom" },
            ].map((step, idx) => {
              const isTop = step.pos === "top";
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: isTop ? -10 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`flex flex-col items-center relative w-auto group ${isTop ? "-mt-[210px]" : ""}`}
                >
                  {isTop && (
                    <>
                      <h3 className="font-bold text-xs uppercase text-black text-center mb-2 max-w-[120px] leading-tight whitespace-pre-line group-hover:text-gray-500 transition-colors">
                        {step.title}
                      </h3>
                      <div
                        className="bg-gray-800 w-9 h-10 flex items-center justify-center text-white font-bold text-sm mb-2"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                      >
                        {step.id}
                      </div>
                      <div className="w-0.5 h-16 bg-gray-800" />
                    </>
                  )}
                  <div
                    className="w-28 h-32 bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center relative cursor-pointer shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                  >
                    <div
                      className="w-22 h-24 bg-white text-gray-800 flex items-center justify-center pointer-events-none m-1 group-hover:bg-gray-200 group-hover:text-black transition-colors duration-300"
                      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                    >
                      {step.icon}
                    </div>
                  </div>
                  {!isTop && (
                    <>
                      <div className="w-0.5 h-16 bg-gray-800" />
                      <div
                        className="bg-gray-800 w-9 h-10 flex items-center justify-center text-white font-bold text-sm"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                      >
                        {step.id}
                      </div>
                      <h3 className="font-bold text-xs uppercase text-black text-center mt-2 max-w-[120px] leading-tight whitespace-pre-line group-hover:text-gray-500 transition-colors">
                        {step.title}
                      </h3>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="md:hidden flex flex-col gap-4 max-w-sm mx-auto">
          {[
            { id: "01", title: "Enrollment", icon: <UserPlus size={22} /> },
            { id: "02", title: "Skill Assessment", icon: <Search size={22} /> },
            { id: "03", title: "Training + Projects", icon: <MonitorPlay size={22} /> },
            { id: "04", title: "Mock Interviews", icon: <Terminal size={22} /> },
            { id: "05", title: "Placement Assistance", icon: <Briefcase size={22} /> },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-center gap-4 border border-gray-200 p-4 rounded-2xl shadow-sm bg-white"
            >
              <div className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 mb-1">Step {step.id}</div>
                <div className="font-bold text-sm text-black uppercase">{step.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          9. TALENT DISCOVERY
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemFade}>
              <span className="text-xs font-bold tracking-[0.35em] text-gray-400 uppercase block mb-4">
                Talent Discovery
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-black leading-tight mb-6">
                We Find &amp; Nurture the Best
              </h2>
              <div className="h-px bg-gray-200 mb-8" />
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shrink-0">
                    <Search size={18} />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Proactive sourcing across elite global networks and curated talent pools.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shrink-0">
                    <Star size={18} />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We identify and nurture high-potential candidates for future-ready roles.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemFade} className="grid grid-cols-2 gap-4">
              {["Global Reach", "AI Screening", "Talent Pools", "Career Mapping"].map((label, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center hover:border-black hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="text-2xl font-black text-black mb-2">
                    {["🌐", "🤖", "👥", "🗺"][idx]}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-600">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          10. SKILL VALIDATION
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.35em] text-gray-500 uppercase block mb-4"
            >
              Skill Validation
            </motion.span>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-white"
            >
              We Validate What You Know
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-white mx-auto mt-6"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              {
                icon: <ShieldCheck size={26} />,
                text: "Comprehensive assessments to evaluate technical and practical expertise.",
              },
              {
                icon: <CheckCircle2 size={26} />,
                text: "Ensuring candidates meet industry standards before placement.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemFade}
                className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-8 flex items-start gap-5 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <p className="text-gray-300 text-base leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          11. FAQ SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.35em] text-gray-400 uppercase block mb-4"
            >
              Got Questions?
            </motion.span>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-black mx-auto mt-6"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  variants={itemFade}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className={`bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all shadow-sm hover:shadow-md ${isOpen ? "border-black" : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  <div className="flex justify-between items-center p-6">
                    <h3 className="font-bold text-sm uppercase text-black tracking-wide pr-4">
                      {faq.q}
                    </h3>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? "bg-black text-white rotate-180" : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <div className="h-px bg-gray-100 mb-4" />
                          <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          12. CALL-TO-ACTION
      ════════════════════════════════════════════════════════════════ */}
      <section id="cta" className="relative py-32 px-6 bg-[#0d0d0d] overflow-hidden">
        {/* Animated gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 30% 50%, rgba(80,80,80,0.4) 0%, transparent 65%)",
              "radial-gradient(ellipse at 70% 50%, rgba(80,80,80,0.4) 0%, transparent 65%)",
              "radial-gradient(ellipse at 30% 50%, rgba(80,80,80,0.4) 0%, transparent 65%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] text-gray-500 uppercase block mb-6"
          >
            Start Today
          </motion.span>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-white uppercase leading-tight mb-6"
          >
            Ready to Start Your<br />
            <span className="text-gray-400">Career Journey?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base mb-12 max-w-xl mx-auto"
          >
            Join thousands of students who transformed their futures with our industry-focused training and guaranteed placement support.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="https://mindbotics.in/courses"
              target="_blank"
              className="group inline-flex items-center gap-2 bg-white text-black font-bold px-10 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Apply Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contactus"
              className="group inline-flex items-center gap-2 border border-white/30 text-white font-bold px-10 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Contact Us <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default SoftwareTraining;
