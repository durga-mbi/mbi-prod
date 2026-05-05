import React from "react";
import { Home, ChevronRight, Globe, BrainCircuit, Cloud, Users, Monitor, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const services = [
  {
    icon: <Monitor size={30} />,
    title: "IT Product Development",
    sub: "End-to-End Solutions",
    desc: "We build robust, scalable software products — from ideation and design to development, testing, and long-term maintenance.",
    link: "/services/it-product-development",
    tag: "Engineering",
  },
  {
    icon: <Users size={30} />,
    title: "Manpower Outsourcing",
    sub: "IT & Non-IT Staffing",
    desc: "Strategic talent acquisition for IT and non-IT roles. We connect businesses with the right professionals, fast.",
    link: "/services/manpower-outsourcing",
    tag: "Staffing",
    featured: true,
  },
  {
    icon: <Wifi size={30} />,
    title: "IoT Solution",
    sub: "Smart Device Ecosystems",
    desc: "Intelligent IoT systems that connect devices, collect data, and automate processes across industries and environments.",
    link: "/services/iot-solution",
    tag: "IoT",
  },
  {
    icon: <Globe size={30} />,
    title: "Training & Placement",
    sub: "Build Skills. Get Placed.",
    desc: "Industry-focused training in MERN, Python AI, Data Science, Cloud & more — with guaranteed placement assistance.",
    link: "/services/software-training",
    tag: "Education",
    featured: true,
  },
  {
    icon: <BrainCircuit size={30} />,
    title: "AI / ML Solutions",
    sub: "Machine Intelligence",
    desc: "Deploy intelligent automation, predictive analytics, and ML-powered decision systems tailored to your domain.",
    link: "/services/it-product-development",
    tag: "AI",
  },
  {
    icon: <Cloud size={30} />,
    title: "Cloud & DevOps",
    sub: "AWS, Azure & CI/CD",
    desc: "Architect scalable cloud infrastructure and streamlined DevOps pipelines to accelerate your delivery cycles.",
    link: "/services/it-product-development",
    tag: "Cloud",
  },
];

const Services: React.FC = () => {
  return (
    <div className="w-full bg-white font-['Poppins'] text-gray-900 overflow-hidden">

      {/* ── HERO / BREADCRUMB ──────────────────────────────────────── */}
      <section className="bg-[#171D26] text-white pt-36 pb-20 text-center relative overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Ambient blobs */}
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1.15, 1, 1.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight uppercase"
          >
            Our Services
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm md:text-base font-normal tracking-wide flex-wrap"
          >
            <Link to="/" className="hover:text-white transition">
              <Home size={20} className="text-white" />
            </Link>
            <span className="opacity-60 text-lg">{">"}</span>
            <span className="opacity-90">Services</span>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO TEXT ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase block mb-5"
        >
          What We Can Do For Your Business
        </motion.span>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black uppercase text-black leading-tight mb-6"
        >
          Full-Spectrum Technology<br />& Training Services
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-black mx-auto mb-8"
        />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto"
        >
          MindBrain Innovation delivers end-to-end technology solutions and industry-focused
          training programs — empowering businesses to scale and professionals to launch
          successful careers.
        </motion.p>
      </section>

      {/* ── SERVICE CARDS GRID ─────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-200 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {services.map((svc, idx) => (
              <motion.div key={idx} variants={itemFade}>
                <Link
                  to={svc.link}
                  className={`group flex flex-col h-full rounded-2xl p-8 border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 cursor-pointer ${
                    svc.featured
                      ? "bg-[#0d0d0d] border-[#1a1a1a] text-white"
                      : "bg-white border-gray-100 text-gray-900"
                  }`}
                >
                  {/* Tag */}
                  <span
                    className={`self-start text-[10px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-6 ${
                      svc.featured
                        ? "bg-white/10 text-gray-300"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {svc.tag}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                      svc.featured
                        ? "bg-white/10 text-white group-hover:bg-white group-hover:text-black"
                        : "bg-gray-100 text-black group-hover:bg-black group-hover:text-white"
                    }`}
                  >
                    {svc.icon}
                  </div>

                  {/* Title + Sub */}
                  <h3
                    className={`text-xl font-black uppercase leading-tight mb-1 ${
                      svc.featured ? "text-white" : "text-black"
                    }`}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
                      svc.featured ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {svc.sub}
                  </p>

                  {/* Divider */}
                  <div
                    className={`h-px w-full mb-5 ${
                      svc.featured ? "bg-white/10" : "bg-gray-100"
                    }`}
                  />

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed flex-1 ${
                      svc.featured ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {svc.desc}
                  </p>

                  {/* CTA */}
                  <div
                    className={`mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                      svc.featured
                        ? "text-gray-300 group-hover:text-white"
                        : "text-black group-hover:text-gray-500"
                    }`}
                  >
                    Learn More{" "}
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY MINDBRAIN STRIP ────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold uppercase text-black"
            >
              Why MindBrain?
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-1 bg-black mx-auto mt-5"
            />
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { stat: "10+", label: "Years Experience" },
              { stat: "200+", label: "Projects Delivered" },
              { stat: "500+", label: "Students Placed" },
              { stat: "100+", label: "Hiring Partners" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemFade}
                className="text-center border border-gray-200 rounded-2xl py-10 px-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl font-black text-black mb-2">{item.stat}</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────── */}
      <section className="relative py-28 px-6 bg-[#0d0d0d] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 25% 50%, rgba(70,70,70,0.5) 0%, transparent 65%)",
              "radial-gradient(ellipse at 75% 50%, rgba(70,70,70,0.5) 0%, transparent 65%)",
              "radial-gradient(ellipse at 25% 50%, rgba(70,70,70,0.5) 0%, transparent 65%)",
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
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white uppercase leading-tight mb-6"
          >
            Ready to Work<br />
            <span className="text-gray-400">With Us?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base mb-10 max-w-xl mx-auto"
          >
            Whether you're looking to build a product, hire top talent, or launch your tech
            career — MindBrain Innovation is your partner every step of the way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contactus"
              className="group inline-flex items-center gap-2 bg-white text-black font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Get in Touch{" "}
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/services/software-training"
              className="group inline-flex items-center gap-2 border border-white/30 text-white font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Explore Training{" "}
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Services;
