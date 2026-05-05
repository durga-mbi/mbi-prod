import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Droplets, ArrowRight, Activity, Router, Cloud, Monitor, Cpu, Settings, LineChart, Smartphone, Flame, ShieldCheck, Layers, FlaskConical, TestTube2 } from "lucide-react";
import { motion } from "framer-motion";
import bgImage from "../assets/it_product_laptop.webp";

const placeholderImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80";

const IoTSolution: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const lineDraw = {
    hidden: { width: "0%" },
    visible: { width: "100%", transition: { duration: 1, ease: "easeInOut" as const } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as any, stiffness: 120, damping: 15, mass: 0.8 }
    }
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
          IOT SOLUTION
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
          <span className="opacity-90">IoT Solution</span>
        </motion.div>
      </section>

      {/* WE ALWAYS STRIVE TO BE BETTER SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-gray-400 font-medium text-lg mb-4 block">
            We always strive to be better
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-black leading-tight uppercase">
            SMART IOT SOLUTIONS FOR MODERN BUSINESSES
          </h2>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] flex-grow bg-gray-200"></div>
            <div className="h-[2px] w-20 bg-black"></div>
          </div>

          <p className="text-gray-500 leading-relaxed text-sm md:text-base font-normal">
            Transform ordinary appliances, heavy machinery, and sprawling buildings into intelligent, critically connected ecosystems. Our bespoke IoT Solutions seamlessly integrate vast networks of wireless sensors, edge-computing gateways, and secure cloud infrastructures to capture real-time operational data.
          </p>
          <p className="text-gray-500 leading-relaxed text-sm md:text-base font-normal mt-4">
            Leverage robust predictive maintenance, live-stream analytics, and automated alerting schemas allowing your business to transcend legacy monitoring limitations, reduce systematic downtime drastically, and drive unparalleled resource efficiency.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
          <img loading="lazy" decoding="async" src={placeholderImage} alt="IoT Solutions" className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3]"/>
        </motion.div>
      </section>

      {/* OUR IOT ECOSYSTEM FLOW */}
      <section className="py-24 relative overflow-hidden text-white">
        {/* Full-width Background Image with Soft Dark Overlay */}
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed grayscale opacity-80"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="absolute inset-0 bg-black/85"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="text-center mb-16">
             <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-extrabold uppercase text-white">
               OUR IOT ECOSYSTEM
             </motion.h2>
             <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-gray-400 mx-auto mt-6"></motion.div>
           </div>

           <div className="flex flex-col md:flex-row items-center justify-between relative mt-12 max-w-5xl mx-auto">
              
              {/* Background Connecting Line (Desktop specific) */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-800 -translate-y-1/2 hidden md:block z-0">
                 <motion.div variants={lineDraw} initial="hidden" whileInView="visible" viewport={{ once: true }} className="h-full bg-white"></motion.div>
              </div>

              {/* Node 1 */}
              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col items-center relative z-10 p-4 w-full md:w-auto mb-8 md:mb-0 group cursor-default">
                 <div className="w-20 h-20 rounded-full bg-gray-300 shadow-2xl border-4 border-gray-400 flex items-center justify-center text-black mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-white group-hover:border-black">
                    <Activity size={32} />
                 </div>
                 <h3 className="font-bold text-lg uppercase text-white group-hover:text-gray-300 transition-colors">SENSOR</h3>
                 <p className="text-xs text-gray-400 mt-1 max-w-[120px] text-center">Data Capture</p>
              </motion.div>

              {/* Node 2 */}
              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col items-center relative z-10 p-4 w-full md:w-auto mb-8 md:mb-0 group cursor-default">
                 <div className="w-20 h-20 rounded-full bg-gray-300 shadow-2xl border-4 border-gray-400 flex items-center justify-center text-black mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-white group-hover:border-black">
                    <Router size={32} />
                 </div>
                 <h3 className="font-bold text-lg uppercase text-white group-hover:text-gray-300 transition-colors">GATEWAY</h3>
                 <p className="text-xs text-gray-400 mt-1 max-w-[120px] text-center">Edge Processing</p>
              </motion.div>

              {/* Node 3 */}
              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.8 }} className="flex flex-col items-center relative z-10 p-4 w-full md:w-auto mb-8 md:mb-0 group cursor-default">
                 <div className="w-20 h-20 rounded-full bg-gray-300 shadow-2xl border-4 border-gray-400 flex items-center justify-center text-black mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-white group-hover:border-black">
                    <Cloud size={32} />
                 </div>
                 <h3 className="font-bold text-lg uppercase text-white group-hover:text-gray-300 transition-colors">CLOUD</h3>
                 <p className="text-xs text-gray-400 mt-1 max-w-[120px] text-center">Secure Storage</p>
              </motion.div>

              {/* Node 4 */}
              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.1 }} className="flex flex-col items-center relative z-10 p-4 w-full md:w-auto group cursor-default">
                 <div className="w-20 h-20 rounded-full bg-gray-300 shadow-2xl border-4 border-gray-400 flex items-center justify-center text-black mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-white group-hover:border-black">
                    <Monitor size={32} />
                 </div>
                 <h3 className="font-bold text-lg uppercase text-white group-hover:text-gray-300 transition-colors">DASHBOARD</h3>
                 <p className="text-xs text-gray-400 mt-1 max-w-[120px] text-center">Real-Time BI</p>
              </motion.div>
           </div>
        </div>
      </section>

      {/* KEY IOT FEATURES GRID */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-extrabold uppercase text-black">
               KEY IOT FEATURES
             </motion.h2>
             <motion.div initial={{ width: 0 }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-1 bg-black mx-auto mt-6"></motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[ 
               { icon: <LineChart size={32} />, title: "REAL-TIME MONITORING", desc: "Instantly track environmental and structural metrics across your entire grid." },
               { icon: <Settings size={32} />, title: "AUTOMATION", desc: "Set strict thresholds to trigger automated safety relays seamlessly." },
               { icon: <Cpu size={32} />, title: "PREDICTIVE ANALYTICS", desc: "Machine learning algorithms forecast maintenance timelines avoiding failure." },
               { icon: <Smartphone size={32} />, title: "REMOTE ACCESS", desc: "Manage operational dashboards entirely via secure mobile cloud portals." }
             ].map((feature, idx) => (
                <motion.div key={idx} variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                   <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-black mb-6 group-hover:bg-[#171D26] group-hover:text-white transition-colors">
                      {feature.icon}
                   </div>
                   <h3 className="text-lg font-bold uppercase mb-4 text-[#171D26]">{feature.title}</h3>
                   <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* SPECIALIZED MODULES */}
      <section className="py-24 px-6 text-white overflow-hidden relative">
        {/* Full-width Background Image with Soft Dark Overlay */}
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed grayscale"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="absolute inset-0 bg-black/85"></div>
        </div>
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-900/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold mb-4 uppercase text-white tracking-wide"
          >
            EXPLORE OUR SPECIALIZED IOT SYSTEMS
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-cyan-500 mx-auto mb-16 rounded-full"
          />

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 1 — Hand Robot */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              className="bg-white text-gray-900 rounded-2xl p-8 h-full flex flex-col items-center shadow-2xl border border-gray-100 cursor-default group hover:border-gray-200 transition-all relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 text-black flex items-center justify-center mb-5 border border-gray-200 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                <Droplets size={32} />
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 text-center leading-snug">Water Leakage Monitoring System</h3>
              <p className="text-gray-500 text-sm mb-6 text-center leading-relaxed flex-1">
                A smart system that detects pipeline leaks using sensors, enabling real-time monitoring, early alerts, and efficient water conservation and damage prevention.
              </p>
              <Link to="/services/iot-solution/water-leakage-monitoring-system" className="bg-black text-white rounded-full px-5 py-2 font-semibold text-xs flex items-center gap-2 hover:bg-gray-800 transition-colors">
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* 2 — Drone Technology */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              className="bg-white text-gray-900 rounded-2xl p-8 h-full flex flex-col items-center shadow-2xl border border-gray-100 cursor-default group hover:border-gray-200 transition-all relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 text-black flex items-center justify-center mb-5 border border-gray-200 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                <Flame size={32} />
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 text-center leading-snug">Oil & Gas Leakage Detector</h3>
              <p className="text-gray-500 text-sm mb-6 text-center leading-relaxed flex-1">
                An IoT-based gas leakage detection system using MQ-2 sensors, Arduino, and cloud alerts to monitor air quality and detect combustible gas leaks in real-time.
              </p>
              <Link to="/services/iot-solution/oil-gas-leakage-detector" className="bg-black text-white rounded-full px-5 py-2 font-semibold text-xs flex items-center gap-2 hover:bg-gray-800 transition-colors">
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* 3 — Humanoid Robot */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              className="bg-white text-gray-900 rounded-2xl p-8 h-full flex flex-col items-center shadow-2xl border border-gray-100 cursor-default group hover:border-gray-200 transition-all relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 text-black flex items-center justify-center mb-5 border border-gray-200 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 text-center leading-snug">Safety Kit Monitoring System</h3>
              <p className="text-gray-500 text-sm mb-6 text-center leading-relaxed flex-1">
                An IoT-based safety kit monitoring system using Arduino, GSM, and cloud alerts to track safety equipment and notify users of missing or expired kits.
              </p>
              <Link to="/services/iot-solution/safety-kit-monitoring-system" className="bg-black text-white rounded-full px-5 py-2 font-semibold text-xs flex items-center gap-2 hover:bg-gray-800 transition-colors">
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* 4 — Hexaphor Robot */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              className="bg-white text-gray-900 rounded-2xl p-8 h-full flex flex-col items-center shadow-2xl border border-gray-100 cursor-default group hover:border-gray-200 transition-all relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 text-black flex items-center justify-center mb-5 border border-gray-200 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                <Layers size={32} />
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 text-center leading-snug">Smart Coal Detection</h3>
              <p className="text-gray-500 text-sm mb-6 text-center leading-relaxed flex-1">
                An IoT-based coal detection system using Arduino, IR sensors, and cloud alerts to detect coal and notify users of missing or expired coal.
              </p>
              <Link to="/services/iot-solution/smart-coal-detection" className="bg-black text-white rounded-full px-5 py-2 font-semibold text-xs flex items-center gap-2 hover:bg-gray-800 transition-colors">
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* 5 — Smart Parking System */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              className="bg-white text-gray-900 rounded-2xl p-8 h-full flex flex-col items-center shadow-2xl border border-gray-100 cursor-default group hover:border-gray-200 transition-all relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 text-black flex items-center justify-center mb-5 border border-gray-200 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                <FlaskConical size={32} />
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 text-center leading-snug">Water Quality Detector</h3>
              <p className="text-gray-500 text-sm mb-6 text-center leading-relaxed flex-1">
                An IoT-based water quality monitoring system using Arduino, pH sensors, and cloud alerts to detect water quality and notify users of missing or expired water.
              </p>
              <Link to="/services/iot-solution/water-quality-detector" className="bg-black text-white rounded-full px-5 py-2 font-semibold text-xs flex items-center gap-2 hover:bg-gray-800 transition-colors">
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* 6 — Milk Quality Detector */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              className="bg-white text-gray-900 rounded-2xl p-8 h-full flex flex-col items-center shadow-2xl border border-gray-100 cursor-default group hover:border-gray-200 transition-all relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 text-black flex items-center justify-center mb-5 border border-gray-200 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                <TestTube2 size={32} />
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 text-center leading-snug">Milk Quality Detector</h3>
              <p className="text-gray-500 text-sm mb-6 text-center leading-relaxed flex-1">
                An IoT-based milk quality monitoring system using electrochemical and optical sensors to detect adulteration, assess freshness, and ensure dairy safety standards.
              </p>
              <Link to="/services/iot-solution/milk-quality-detector" className="bg-black text-white rounded-full px-5 py-2 font-semibold text-xs flex items-center gap-2 hover:bg-gray-800 transition-colors">
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default IoTSolution;
