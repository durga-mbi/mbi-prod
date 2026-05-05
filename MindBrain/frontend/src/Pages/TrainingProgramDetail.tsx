import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronRight,
  ArrowRight,
  Globe,
  BrainCircuit,
  Database,
  Cloud,
  Cpu,
  Layers,
  Calendar,
  Clock,
  Monitor,
  GraduationCap,
  Briefcase,
  FileText,
  Award,
  Users,
  CheckCircle2,
  ChevronDown,
  Star,
  Zap,
  BookOpen,
  TrendingUp,
} from "lucide-react";

// ─── Course Data ───────────────────────────────────────────────────────────────
const courses: Record<string, {
  title: string;
  sub: string;
  level: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  schedule: string;
  mode: string;
  eligibility: string;
  curriculum: { topic: string; items: string[] }[];
}> = {
  "web-development": {
    title: "Web Development",
    sub: "MERN Stack",
    level: "Beginner → Advanced",
    tagline: "Master full-stack development using MongoDB, Express, React, and Node.js with real-world projects.",
    description: "Dive into the world of Web Development and build modern, dynamic websites from scratch. This program covers frontend and backend technologies including HTML, CSS, JavaScript, and the MERN stack. Gain hands-on experience through real-world projects, responsive design, and API integration. Learn to create fast, scalable, and user-friendly web applications. With industry-focused training, live projects, and expert mentorship, you’ll be prepared for high-demand roles in full-stack and frontend development.",
    icon: <Globe size={36} />,
    duration: "4–6 Months",
    schedule: "Weekday / Weekend",
    mode: "Online / Offline / Hybrid",
    eligibility: "Students, Graduates, Professionals",
    curriculum: [
      { topic: "Frontend Development", items: ["HTML5, CSS3, Tailwind CSS", "JavaScript (ES6+)", "React.js & Hooks", "State Management (Redux)"] },
      { topic: "Backend APIs", items: ["Node.js & Express.js", "REST API Design", "JWT Authentication", "Middleware & Error Handling"] },
      { topic: "Database Management", items: ["MongoDB & Mongoose", "Schema Design", "CRUD Operations", "Indexing & Aggregation"] },
      { topic: "Deployment & DevOps", items: ["Git & GitHub", "Docker Basics", "CI/CD Pipelines", "Cloud Deployment (AWS/Vercel)"] },
    ],
  },
  "python-ai": {
    title: "Python & AI",
    sub: "Machine Learning",
    level: "Intermediate",
    tagline: "Build intelligent systems with Python, ML algorithms, and modern AI tools for real-world automation.",
    description: "Step into the world of Python and Artificial Intelligence, where coding meets intelligent problem-solving. This program provides hands-on experience in Python programming, machine learning, and data-driven applications. Learn to build smart systems, automate tasks, and analyze real-world data using modern AI tools and frameworks. With industry-focused training, live projects, and expert guidance, you’ll develop the skills needed to excel in AI-driven careers and emerging technologies shaping the future.",
    icon: <BrainCircuit size={36} />,
    duration: "3–6 Months",
    schedule: "Weekday / Weekend",
    mode: "Online / Offline / Hybrid",
    eligibility: "Graduates, Professionals",
    curriculum: [
      { topic: "Python Foundations", items: ["Core Python Syntax", "OOP Concepts", "File Handling & Libraries", "NumPy & Pandas"] },
      { topic: "Machine Learning", items: ["Supervised Learning", "Unsupervised Learning", "SKLearn & Model Tuning", "Model Evaluation Metrics"] },
      { topic: "Deep Learning & AI", items: ["Neural Networks (Keras/TF)", "NLP Basics", "Computer Vision Intro", "Generative AI Overview"] },
      { topic: "Deployment", items: ["Flask / FastAPI", "Model Serving", "Docker for ML", "Cloud ML Platforms"] },
    ],
  },
  "data-science": {
    title: "Data Science",
    sub: "Analytics & Big Data",
    level: "Intermediate → Advanced",
    tagline: "Turn raw data into actionable insights through statistical analysis, visualization, and ML techniques.",
    description: "Explore the power of Data Science and turn raw data into meaningful insights. This program covers data analysis, visualization, statistics, and machine learning using modern tools like Python. Gain hands-on experience working with real-world datasets to uncover patterns and support data-driven decision-making. With industry-focused training, live projects, and expert mentorship, you’ll develop the skills needed to excel in analytics, business intelligence, and high-demand data-driven careers.",
    icon: <Database size={36} />,
    duration: "2–6 Months",
    schedule: "Weekend / Flexible",
    mode: "Online / Hybrid",
    eligibility: "Graduates, Professionals",
    curriculum: [
      { topic: "Data Analysis", items: ["Pandas & NumPy", "Exploratory Data Analysis", "Statistical Inference", "Hypothesis Testing"] },
      { topic: "Visualization", items: ["Matplotlib & Seaborn", "Power BI & Tableau", "Dashboard Design", "Storytelling with Data"] },
      { topic: "Machine Learning", items: ["Regression & Classification", "Clustering Algorithms", "Feature Engineering", "Model Pipelines"] },
      { topic: "Big Data & Cloud", items: ["SQL & NoSQL", "Apache Spark Basics", "BigQuery / AWS Athena", "Data Pipeline Design"] },
    ],
  },
  "iot-robotics": {
    title: "IoT & Robotics",
    sub: "Embedded Systems",
    level: "Beginner → Intermediate",
    tagline: "Connect the physical and digital worlds by building smart embedded systems and IoT applications.",
    description: "Dive into the world of IoT and Robotics, where smart devices and intelligent machines shape the future. This program equips you with hands-on experience in sensors, automation, embedded systems, and real-time data processing. Learn to design, build, and control innovative solutions that solve real-world problems. With industry-focused training, live projects, and expert mentorship, you’ll gain the skills needed to excel in automation, smart technology, and next-generation engineering careers.",
    icon: <Cpu size={36} />,
    duration: "2–6 Months",
    schedule: "Weekday / Weekend",
    mode: "Offline / Hybrid",
    eligibility: "Students, Graduates",
    curriculum: [
      { topic: "Embedded Basics", items: ["Arduino & Raspberry Pi", "GPIO Programming", "Sensors & Actuators", "Circuit Design"] },
      { topic: "IoT Protocols", items: ["MQTT & HTTP", "Bluetooth & Wi-Fi", "Edge Computing", "IoT Security Basics"] },
      { topic: "Robotics", items: ["Servo & Motor Control", "PID Controllers", "Path Planning", "Robot Operating System (ROS)"] },
      { topic: "Cloud Integration", items: ["AWS IoT Core", "Dashboard & Analytics", "Real-Time Data Streams", "Alert & Automation"] },
    ],
  },
  "cloud-computing": {
    title: "Cloud Computing",
    sub: "AWS, Azure & DevOps",
    level: "Intermediate → Advanced",
    tagline: "Architect and deploy scalable cloud infrastructure with AWS, Azure, and modern DevOps practices.",
    description: "Step into the world of Cloud Computing and learn to build, deploy, and manage scalable applications in the cloud. This program covers core concepts like cloud architecture, virtualization, DevOps, and services from platforms like AWS and Azure. Gain hands-on experience with real-world projects, deployment pipelines, and cloud security practices. With industry-focused training and expert guidance, you’ll develop the skills needed to excel in modern cloud-based infrastructure and high-demand IT careers.",
    icon: <Cloud size={36} />,
    duration: "3–6 Months",
    schedule: "Weekday / Weekend",
    mode: "Online / Hybrid",
    eligibility: "Graduates, IT Professionals",
    curriculum: [
      { topic: "Cloud Fundamentals", items: ["Cloud Models (IaaS/PaaS/SaaS)", "AWS Core Services", "Azure Fundamentals", "GCP Overview"] },
      { topic: "Infrastructure", items: ["Virtual Machines & Storage", "Networking & VPCs", "IAM & Security", "Load Balancing & Auto-Scaling"] },
      { topic: "DevOps", items: ["Git & GitOps", "Docker & Kubernetes", "CI/CD (GitHub Actions)", "Terraform (IaC)"] },
      { topic: "Deployment & Monitoring", items: ["Serverless Functions", "CloudWatch / Azure Monitor", "Cost Optimization", "Cloud Certification Prep"] },
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    sub: "Figma & Design Systems",
    level: "Beginner → Intermediate",
    tagline: "Craft beautiful, user-centric digital experiences using industry-standard design tools and methodologies.",
    description: "Discover the art of UI/UX Design and create intuitive, user-centered digital experiences. This program covers design principles, wireframing, prototyping, and usability testing using modern tools like Figma. Learn to design visually appealing and highly functional interfaces that enhance user engagement. Through hands-on projects and real-world case studies, you’ll develop the skills needed to craft seamless user experiences and build a strong foundation for a career in design and product development.",
    icon: <Layers size={36} />,
    duration: "2–6 Months",
    schedule: "Weekend / Flexible",
    mode: "Online / Offline",
    eligibility: "Students, Graduates, Designers",
    curriculum: [
      { topic: "Design Foundations", items: ["Color Theory & Typography", "Grid & Layout Systems", "Design Thinking", "UX Research Methods"] },
      { topic: "UI Design", items: ["Figma Mastery", "Component Libraries", "Design Systems", "Prototyping & Animation"] },
      { topic: "UX & Research", items: ["User Personas & Journey Maps", "Wireframing", "Usability Testing", "Accessibility Standards"] },
      { topic: "Portfolio & Tools", items: ["Responsive Web Design", "Mobile-First Design", "Handoff to Dev", "Portfolio Building"] },
    ],
  },
};

// ─── Related Courses ───────────────────────────────────────────────────────────
const relatedCourses = [
  { slug: "web-development", icon: <Globe size={24} />, title: "Web Development", desc: "MERN Stack full-stack engineering." },
  { slug: "python-ai", icon: <BrainCircuit size={24} />, title: "Python & AI", desc: "ML, automation & intelligent systems." },
  { slug: "data-science", icon: <Database size={24} />, title: "Data Science", desc: "Analytics, visualization & big data." },
  { slug: "cloud-computing", icon: <Cloud size={24} />, title: "Cloud Computing", desc: "AWS, Azure, Kubernetes & DevOps." },
  { slug: "iot-robotics", icon: <Cpu size={24} />, title: "IoT & Robotics", desc: "Embedded systems & smart devices." },
  { slug: "ui-ux-design", icon: <Layers size={24} />, title: "UI/UX Design", desc: "Figma, design systems & UX research." },
];

// ─── Batch Data ────────────────────────────────────────────────────────────────
// const batches = [
//   { date: "May 5, 2026", seats: 12, status: "open" as const },
//   { date: "May 19, 2026", seats: 4, status: "closing" as const },
//   { date: "June 2, 2026", seats: 20, status: "open" as const },
// ];

// ─── FAQs ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "Who can join this program?", a: "Anyone from students to working professionals can join. No prior experience is needed for beginner tracks; intermediate courses require basic programming familiarity." },
  { q: "Do you provide internships?", a: "Yes! Eligible students get real-world internship opportunities with our partner companies and in-house projects once they complete the core training module." },
  { q: "Is placement guaranteed?", a: "We offer 100% placement assistance including interview opportunities, resume reviews, and mock sessions with our 100+ hiring partners." },
  { q: "Are classes recorded?", a: "All sessions are recorded and uploaded within 24 hours to our LMS portal. Students have 6-month access to all session recordings and materials." },
];

// ─── Animation Variants ─────────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

// ─── Main Component ─────────────────────────────────────────────────────────────
const TrainingProgramDetail: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, [courseSlug]);

  const course = courseSlug ? courses[courseSlug] : null;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Poppins']">
        <div className="text-center">
          <h1 className="text-4xl font-black text-black mb-4">Course Not Found</h1>
          <p className="text-gray-500 mb-8">The course you're looking for doesn't exist.</p>
          <Link to="/services/software-training" className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-all">
            Back to Training
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white font-['Poppins'] text-gray-900 overflow-hidden">

      {/* ════ 1. PAGE HERO ════════════════════════════════════════════ */}
      <section className="bg-[#171D26] text-white pt-36 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <motion.div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-xs font-normal tracking-wide flex-wrap text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition"><Home size={16} className="text-white" /></Link>
            <span className="opacity-60">{">"}</span>
            <Link to="/services/software-training" className="hover:text-white transition">Training &amp; Placement</Link>
            <span className="opacity-60">{">"}</span>
            <span className="text-white">{course.title}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black mb-4 tracking-tight uppercase">
            Explore Our Training Programs
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 text-base max-w-xl mx-auto mb-10">
            Industry-driven courses designed to transform your skills into real-world expertise.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <a href="https://mindbotics.in/courses" target="_blank" className="group inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-gray-200 transition-all">
              Enroll Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════ 2. PROGRAM OVERVIEW ═════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase block mb-4">Program Overview</span>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Industry-Ready", course.level, course.sub].map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wide rounded-full border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-black uppercase leading-tight mb-4">{course.title}</h2>
          <div className="h-px bg-gray-200 mb-4" />
          <p className="text-gray-800 text-base font-semibold italic leading-relaxed mb-3 border-l-4 border-black pl-4">{course.tagline}</p>
          <p className="text-gray-500 text-sm leading-relaxed">{course.description}</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-[#0d0d0d] rounded-3xl p-10 flex flex-col items-center justify-center text-white text-center shadow-2xl aspect-square max-w-sm mx-auto w-full">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6">{course.icon}</div>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{course.title}</h3>
          <p className="text-gray-400 text-sm mb-6">{course.sub}</p>
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-white text-white" />)}
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Top Rated Program</p>
        </motion.div>
      </section>

      {/* ════ 3. PROGRAM DETAILS CARDS ════════════════════════════════ */}
      <section className="bg-gray-50 border-y border-gray-200 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase block mb-4">Program Details</motion.span>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black">Course Specifications</motion.h2>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Calendar size={26} />, label: "Duration", value: course.duration },
              { icon: <Clock size={26} />, label: "Schedule", value: course.schedule },
              { icon: <Monitor size={26} />, label: "Mode", value: course.mode },
              { icon: <GraduationCap size={26} />, label: "Eligibility", value: course.eligibility },
            ].map((d, idx) => (
              <motion.div key={idx} variants={fadeUp}
                className="bg-white border border-gray-200 rounded-2xl p-7 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-black mb-4 mx-auto group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {d.icon}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{d.label}</div>
                <div className="font-bold text-black text-sm leading-tight">{d.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ 4. INTERNSHIP & PLACEMENT ═══════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase block mb-4">Career Support</motion.span>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black">Internship &amp; Placement</motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-black mx-auto mt-5" />
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Briefcase size={26} />, title: "Internship Opportunities", desc: "Work on live client projects and build a portfolio that proves real-world capability to employers." },
              { icon: <TrendingUp size={26} />, title: "Placement Assistance", desc: "Dedicated placement team connects you to 100+ hiring partners across IT, product, and startup ecosystems." },
              { icon: <FileText size={26} />, title: "Mock Interviews & Resume", desc: "Personalized resume reviews, LinkedIn optimization, and rigorous mock interview sessions with expert feedback." },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeUp}
                className="flex items-start gap-5 p-7 rounded-2xl bg-gray-50 border border-gray-100 hover:border-black hover:bg-white transition-all group shadow-sm hover:shadow-lg">
                <div className="w-12 h-12 shrink-0 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-sm uppercase text-black tracking-wide mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center">
            <Link to="/careers" className="group inline-flex items-center gap-2 bg-black text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-gray-800 transition-all">
              Apply for Internship <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════ 5. UPCOMING BATCHES ═════════════════════════════════════ */}
      {/* <section id="batches" className="bg-[#0d0d0d] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.4em] text-gray-500 uppercase block mb-4">Reserve Your Seat</motion.span>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-white">Upcoming Batches</motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-white mx-auto mt-5" />
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-4">
            {batches.map((batch, idx) => (
              <motion.div key={idx} variants={fadeUp}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-8 py-6 hover:bg-white/10 hover:border-white/20 transition-all gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0"><Calendar size={20} /></div>
                  <div>
                    <div className="font-bold text-white text-base">{batch.date}</div>
                    <div className="text-gray-400 text-sm">{batch.seats} seats available</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${batch.status === "open" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                    {batch.status === "open" ? "✦ Open" : "⚠ Closing Soon"}
                  </span>
                  <a href="#cta" className="group inline-flex items-center gap-1.5 bg-white text-black font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
                    Enroll <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* ════ 6. CURRICULUM ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase block mb-4">Curriculum</motion.span>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black">What You Will Learn</motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-black mx-auto mt-5" />
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-3">
            {course.curriculum.map((module, idx) => {
              const isOpen = openModule === idx;
              return (
                <motion.div key={idx} variants={fadeUp}
                  className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all ${isOpen ? "border-black" : "border-gray-200 hover:border-gray-400"}`}>
                  <button onClick={() => setOpenModule(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-6 cursor-pointer text-left">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all duration-300 ${isOpen ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <h3 className="font-bold text-sm uppercase text-black tracking-wide">{module.topic}</h3>
                    </div>
                    <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-black" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-6 pb-6">
                          <div className="h-px bg-gray-100 mb-4" />
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {module.items.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                <CheckCircle2 size={14} className="text-black shrink-0" /> {item}
                              </li>
                            ))}
                          </ul>
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

      {/* ════ 7. EXPLORE POPULAR COURSES ════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase block mb-4">Browse More</motion.span>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black">Explore Our Popular Courses</motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-black mx-auto mt-5" />
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedCourses.filter(c => c.slug !== courseSlug).map((c, idx) => (
              <motion.div key={idx} variants={fadeUp}>
                <Link to={`/services/software-training/${c.slug}`}
                  className="group flex items-start gap-5 p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-black hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 shrink-0 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase text-black tracking-wide mb-1">{c.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-2">{c.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-black group-hover:text-gray-500 transition-colors">
                      Learn More <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ 8. STUDENT BENEFITS ════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.4em] text-gray-500 uppercase block mb-4">What You Get</motion.span>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-white">Student Benefits</motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-white mx-auto mt-5" />
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: <Zap size={26} />, title: "Live Projects", desc: "Build real products during training." },
              { icon: <Award size={26} />, title: "Certification", desc: "Industry-recognised upon completion." },
              { icon: <Users size={26} />, title: "Industry Mentors", desc: "Guidance from working professionals." },
              { icon: <BookOpen size={26} />, title: "Career Support", desc: "Ongoing support even after placement." },
            ].map((b, idx) => (
              <motion.div key={idx} variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 hover:border-white/20 transition-all group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4 mx-auto group-hover:bg-white group-hover:text-black transition-all duration-300">{b.icon}</div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-2">{b.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ 9. FAQ ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase block mb-4">Got Questions?</motion.span>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black">Frequently Asked Questions</motion.h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-black mx-auto mt-5" />
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div key={idx} variants={fadeUp} onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className={`bg-white border rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all ${isOpen ? "border-black" : "border-gray-200 hover:border-gray-400"}`}>
                  <div className="flex justify-between items-center p-6">
                    <h3 className="font-bold text-sm uppercase text-black tracking-wide pr-4">{faq.q}</h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? "bg-black text-white rotate-180" : "bg-gray-100 text-gray-500"}`}>
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
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

      {/* ════ 10. FINAL CTA ═══════════════════════════════════════════ */}
      <section id="cta" className="relative py-32 px-6 bg-[#0d0d0d] overflow-hidden">
        <motion.div className="absolute inset-0"
          animate={{ background: ["radial-gradient(ellipse at 25% 50%, rgba(70,70,70,0.5) 0%, transparent 65%)", "radial-gradient(ellipse at 75% 50%, rgba(70,70,70,0.5) 0%, transparent 65%)", "radial-gradient(ellipse at 25% 50%, rgba(70,70,70,0.5) 0%, transparent 65%)"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] text-gray-500 uppercase block mb-6">Start Today</motion.span>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-white uppercase leading-tight mb-6">
            Start Your Career<br /><span className="text-gray-400">Journey Today</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-400 text-base mb-12 max-w-xl mx-auto">
            Join thousands of students who transformed their futures through our industry-focused {course.title} program.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="https://mindbotics.in/courses" target="_blank" className="group inline-flex items-center gap-2 bg-white text-black font-bold px-10 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-gray-200 transition-all">
              Enroll Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contactus" className="group inline-flex items-center gap-2 border border-white/30 text-white font-bold px-10 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Contact Us <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default TrainingProgramDetail;
