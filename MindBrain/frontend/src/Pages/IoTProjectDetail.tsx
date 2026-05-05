import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Home, ArrowLeft, Cpu, Zap, CheckCircle, Package, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import iotImage from "../assets/img_iot1.webp"
import iotImage_11 from "../assets/img_iot1-1.webp"
import iotImage_12 from "../assets/img_iot1-2.webp"
import iotImage_13 from "../assets/img_iot1-3.webp"
import iotImage1 from "../assets/img_iot2.webp"
import iotImage_21 from "../assets/img_iot2-1.webp"
import iotImage_22 from "../assets/img_iot2-2.webp"
import iotImage_23 from "../assets/img_iot2-3.webp"
import iotImage2 from "../assets/img_iot3.png"
import iotImage_31 from "../assets/img_iot3-1.png"
import iotImage_32 from "../assets/img_iot3-2.png"
import iotImage_33 from "../assets/img_iot3-3.png"
import iotImage3 from "../assets/img_iot4.png"
import iotImage_41 from "../assets/img_iot4-1.png"
import iotImage_42 from "../assets/img_iot4-2.png"
import iotImage_43 from "../assets/img_iot4-3.png"
import iotImage4 from "../assets/img_iot5.png"
import iotImage_51 from "../assets/img_iot5-1.png"
import iotImage_52 from "../assets/img_iot5-2.png"
import iotImage_53 from "../assets/img_iot5-3.png"
import iotImage5 from "../assets/img_iot6.png"
import iotImage_61 from "../assets/img_iot6-1.png"
import iotImage_62 from "../assets/img_iot6-2.png"
import iotImage_63 from "../assets/img_iot6-3.png"


// ─── PROJECT DATA ─────────────────────────────────────────────────────────────
const projects: Record<string, {
  id: string;
  title: string;
  tagline: string;
  category: string;
  overview: string;
  image: string;
  galleryImages: string[];
  components: { name: string; description: string }[];
  specifications: { label: string; value: string }[];
  features: string[];
  techStack: string[];
}> = {
  "water-leakage-monitoring-system": {
    id: "water-leakage-monitoring-system",
    title: "Water Leakage Monitoring System",
    tagline: "Real-Time Leak Detection, Real Peace of Mind.",
    category: "IoT / Water Management",
    overview:
      "Water is an invaluable resource, and its efficient management is crucial in industries like mining where usage is extensive and critical. Undetected water leaks in channels and pipelines can lead to significant wastage, inefficiencies, and environmental concerns. To address these challenges, we propose an innovative IoT-based Water Leakage Monitoring System for our mining client, leveraging advanced sensor technology, real-time data analytics, and remote control capabilities. This system enables comprehensive monitoring and immediate response to water leaks, significantly reducing water wastage and enhancing operational efficiency. By integrating this cutting-edge solution, clients can ensure sustainable water management practices and maintain the integrity of their water infrastructure.",
    image: iotImage,
    galleryImages: [
      iotImage_11,
      iotImage_12,
      iotImage_13,
    ],
    components: [
      { name: "Flow Rate Sensors", description: "High-precision ultrasonic flow sensors deployed at key pipeline junctions to measure water flow rates continuously." },
      { name: "Pressure Transducers", description: "Industrial-grade pressure sensors installed at critical points to detect sudden pressure drops indicative of leaks." },
      { name: "Moisture / Leak Detection Tape", description: "Water-sensitive resistive tape placed along pipelines to pinpoint exact leak locations in real time." },
      { name: "NodeMCU ESP32", description: "Edge microcontroller aggregating sensor data and transmitting to the cloud via MQTT over Wi-Fi." },
      { name: "GSM / LoRa Communication Module", description: "Dual-mode wireless module ensuring connectivity in remote mining areas where Wi-Fi is unavailable." },
      { name: "Cloud Gateway & Alert Dashboard", description: "Raspberry Pi-based local gateway paired with a web dashboard for live monitoring, trend analysis, and SMS/email alerts." },
    ],
    specifications: [
      { label: "Detection Sensitivity", value: "< 0.5 L/min deviation" },
      { label: "Communication", value: "Wi-Fi + LoRa / GSM" },
      { label: "Alert Latency", value: "< 10 seconds" },
      { label: "Operating Pressure", value: "Up to 10 bar" },
      { label: "Power Supply", value: "12V DC / Solar Option" },
      { label: "Data Logging", value: "Cloud + Local SD Card" },
    ],
    features: [
      "Real-time pipeline pressure and flow rate monitoring",
      "Instant SMS and email alerts on leak detection",
      "Historical trend analysis and anomaly detection",
      "Remote sensor health monitoring",
      "Solar-powered deployment for off-grid sites",
      "Multi-zone monitoring with zone-level isolation",
    ],
    techStack: ["ESP32", "MQTT", "Node.js", "React Dashboard", "LoRa", "MongoDB", "AWS IoT"],
  },

  "oil-gas-leakage-detector": {
    id: "oil-gas-leakage-detector",
    title: "Oil & Gas Leakage Detector",
    tagline: "Intelligent Hazard Detection Before Disaster Strikes.",
    category: "IoT / Industrial Safety",
    overview:
      "In the oil and gas industry, early detection of leaks is crucial for preventing environmental damage, ensuring safety, and minimizing financial losses. Traditional leak detection methods can be slow and may not provide real-time monitoring. To address these challenges, we propose the development of a state-of-the-art Oil & Gas Leakage Detector. This system will utilize advanced sensor technologies and data analytics to monitor and identify leaks in real-time, providing immediate alerts and actionable insights. By implementing this solution, our client will enhance safety, reduce environmental impact, and improve operational efficiency through proactive leak management.",
    image: iotImage1,
    galleryImages: [
      iotImage_21,
      iotImage_22,
      iotImage_23,
    ],
    components: [
      { name: "MQ-2 / MQ-6 Gas Sensors", description: "Semiconductor gas sensors detecting LPG, methane, propane, butane, and smoke at ppm-level concentrations." },
      { name: "MQ-135 Air Quality Sensor", description: "Detects NH3, NOx, alcohol, benzene, and CO2 to monitor air quality alongside combustible gas levels." },
      { name: "Flame Sensor Module", description: "Infrared flame detector providing secondary confirmation of fire ignition risk in leak zones." },
      { name: "Arduino Mega / ESP32", description: "Central processing unit running threshold logic, alarm triggers, and cloud data transmission." },
      { name: "Solenoid Valve (Auto Shutoff)", description: "Electrically actuated valve that automatically closes gas/oil lines upon threshold breach." },
      { name: "GSM SIM800L Module", description: "Cellular communication module sending instant SMS alerts to safety personnel regardless of internet availability." },
    ],
    specifications: [
      { label: "Gas Detection Range", value: "10 – 10,000 ppm" },
      { label: "Alarm Threshold", value: "Configurable (default 300 ppm)" },
      { label: "Response Time", value: "< 5 seconds" },
      { label: "Communication", value: "GSM + Wi-Fi (ESP32)" },
      { label: "Power Supply", value: "5V USB / 12V Industrial" },
      { label: "Operating Temperature", value: "-10°C to +60°C" },
    ],
    features: [
      "Multi-gas simultaneous detection (LPG, methane, CO, smoke)",
      "Automated pipeline shutoff via solenoid valve",
      "Instant SMS and push notifications on gas threshold breach",
      "Visual and audible alarm system (LED + buzzer)",
      "Remote monitoring via web and mobile dashboard",
      "Data logging for regulatory compliance reporting",
    ],
    techStack: ["Arduino", "ESP32", "GSM (SIM800L)", "MQTT", "Node.js", "React", "Firebase"],
  },

  "safety-kit-monitoring-system": {
    id: "safety-kit-monitoring-system",
    title: "Safety Kit Monitoring System",
    tagline: "Ensuring Every Worker Is Protected, Every Shift.",
    category: "IoT / Workplace Safety",
    overview:
      "Ensuring the safety of workers in mining operations is paramount, where strict adherence to safety protocols, including the use of helmets, gloves, boots, and other safety kits, is mandatory. However, manual monitoring of compliance is both labor-intensive and prone to errors, potentially leading to accidents and severe consequences. To address these challenges, we propose the development of an advanced AI and IoT-enabled Safety Kit Monitoring System for our mining client. This system will utilize AI-enabled cameras and devices to automatically detect workers without the necessary safety gear and provide real-time reports on a user-friendly dashboard. By implementing this solution, our client can significantly enhance worker safety, reduce the risk of accidental injuries or deaths, and ensure compliance with safety regulations, thereby fostering a safer and more efficient working environment.",
    image: iotImage2,
    galleryImages: [
      iotImage_31,
      iotImage_32,
      iotImage_33,
    ],
    components: [
      { name: "RFID Reader + Tags", description: "UHF RFID reader embedded in safety helmets, vests, and gloves for automated PPE presence detection at entry gates." },
      { name: "ESP32 Microcontroller", description: "Edge processing unit reading RFID data, running compliance logic, and communicating results to the central server." },
      { name: "Camera + AI Vision Module", description: "OpenCV-powered camera module providing visual PPE verification (helmet, vest, boots) as a secondary validation layer." },
      { name: "Electromagnetic Gate Lock", description: "Access control gate that physically prevents entry until full PPE compliance is confirmed by the system." },
      { name: "LCD / LED Status Panel", description: "At-gate display showing compliance status per item — green for compliant, red for missing equipment." },
      { name: "Cloud Dashboard & Logger", description: "Web-based management panel showing real-time compliance rates, individual worker records, and shift reports." },
    ],
    specifications: [
      { label: "RFID Read Range", value: "Up to 1.5 m (UHF)" },
      { label: "Scan Time", value: "< 2 seconds per worker" },
      { label: "Camera Resolution", value: "1080p @ 30fps" },
      { label: "Connectivity", value: "Wi-Fi 802.11 b/g/n" },
      { label: "Power Supply", value: "12V DC Industrial" },
      { label: "Data Retention", value: "90 days cloud + local" },
    ],
    features: [
      "Automated PPE compliance verification at entry points",
      "RFID + AI camera dual-layer detection",
      "Electromagnetic gate lockout for non-compliant workers",
      "Real-time compliance dashboard with shift-wise reports",
      "SMS alerts to supervisors on compliance failures",
      "Tamper-proof audit log for regulatory inspections",
    ],
    techStack: ["ESP32", "RFID (UHF)", "OpenCV", "Python", "Node.js", "React", "MongoDB"],
  },

  "smart-coal-detection": {
    id: "smart-coal-detection",
    title: "Smart Estimation of Coal Location and Coal Quality Detection Using Electromagnetic Sensing System",
    tagline: "Precision Underground Coal Mapping via Electromagnetic Intelligence.",
    category: "IoT / Mining & Geosensing",
    overview:
      "Efficiently locating coal deposits and assessing coal quality are critical for optimizing mining operations and ensuring resource quality. Traditional methods for coal location and quality detection can be time-consuming and labor-intensive, often lacking precision. To address these challenges, we propose the development of a Smart Estimation of Coal Location and Quality Detection System using Electromagnetic Sensing Technology. This advanced system will employ electromagnetic sensing techniques to accurately locate coal deposits and evaluate coal quality in real-time. By integrating this innovative solution, our client will benefit from enhanced accuracy in resource estimation, improved operational efficiency, and optimized extraction processes, ultimately leading to more effective and sustainable mining practices.",
    image: iotImage3,
    galleryImages: [
      iotImage_41,
      iotImage_42,
      iotImage_43,
    ],
    components: [
      { name: "EM Induction Sensor Array", description: "Multi-coil electromagnetic induction sensors generating controlled EM fields to profile subsurface resistivity and coal layer depths." },
      { name: "Ground Penetrating Radar (GPR) Module", description: "Pulsed radar system providing high-resolution cross-sectional images of underground strata for coal seam localization." },
      { name: "Signal Processing Unit (FPGA)", description: "FPGA-based real-time signal processor applying FFT and inverse modelling algorithms to electromagnetic response data." },
      { name: "Raspberry Pi 4 (Data Hub)", description: "Central computation node running geological modelling software and transmitting processed data to the cloud platform." },
      { name: "LoRa Long-Range Module", description: "Long-range wireless communication module ensuring data uplink from deep underground or remote surface survey points." },
      { name: "3D Visualization Dashboard", description: "Web-based 3D geological dashboard rendering coal seam maps, quality heatmaps, and reserve volume estimates." },
    ],
    specifications: [
      { label: "EM Frequency Range", value: "1 Hz – 30 kHz" },
      { label: "Survey Depth", value: "Up to 50 m below surface" },
      { label: "Spatial Resolution", value: "± 0.5 m lateral" },
      { label: "Communication", value: "LoRa (15 km range)" },
      { label: "Data Output", value: "3D resistivity + quality maps" },
      { label: "Power", value: "Battery + Solar Hybrid" },
    ],
    features: [
      "Non-invasive subsurface coal seam localization",
      "Real-time coal quality estimation (carbon, ash, moisture)",
      "3D geological map rendering on web dashboard",
      "Long-range LoRa data uplink from underground tunnels",
      "Reserve volume estimation and extraction planning support",
      "Historical survey comparison for depletion tracking",
    ],
    techStack: ["FPGA (Xilinx)", "Raspberry Pi", "LoRa", "Python", "MATLAB", "React 3D Dashboard", "AWS IoT"],
  },

  "water-quality-detector": {
    id: "water-quality-detector",
    title: "Water Quality Detector",
    tagline: "Know What's in Your Water — Before It's Too Late.",
    category: "IoT / Environmental Monitoring",
    overview:
      "Ensuring water quality is critical in various applications, from industrial processes to environmental monitoring and public health. Traditional water quality testing methods can be time-consuming and may not provide real-time insights into water conditions. To address these challenges, we propose the development of an advanced Water Quality Detector. This system will utilize state-of-the-art sensors and analytical technologies to monitor and assess water quality parameters in real-time. By implementing this solution, our client will benefit from accurate, timely data on water quality, enabling better decision-making and more effective management of water resources.",
    image: iotImage4,
    galleryImages: [
      iotImage_51,
      iotImage_52,
      iotImage_53,
    ],
    components: [
      { name: "pH Sensor Probe", description: "Industrial-grade glass pH electrode measuring acidity/alkalinity from 0–14 pH with ±0.01 resolution." },
      { name: "Turbidity Sensor", description: "Optical nephelometer measuring water clarity/suspended solids using infrared light scattering (NTU scale)." },
      { name: "TDS / Conductivity Sensor", description: "Two-electrode conductivity probe measuring total dissolved solids and ionic concentration in the water sample." },
      { name: "Dissolved Oxygen (DO) Sensor", description: "Polarographic DO probe measuring oxygen saturation — critical for aquatic ecosystem and effluent monitoring." },
      { name: "ESP32 Microcontroller", description: "Central IoT node reading all analog/digital sensor outputs and publishing data to the cloud via MQTT." },
      { name: "Solar-Powered Buoy Enclosure", description: "Weatherproof floating enclosure housing all sensors with solar charging for autonomous river/lake deployment." },
    ],
    specifications: [
      { label: "pH Range", value: "0 – 14 pH (±0.01 accuracy)" },
      { label: "Turbidity Range", value: "0 – 1000 NTU" },
      { label: "TDS Range", value: "0 – 2000 ppm" },
      { label: "DO Range", value: "0 – 20 mg/L" },
      { label: "Connectivity", value: "Wi-Fi + LoRa + GSM" },
      { label: "Data Update Rate", value: "Every 30 seconds" },
    ],
    features: [
      "Real-time multi-parameter water quality monitoring",
      "Configurable alert thresholds for each quality metric",
      "Historical data trends and regulatory compliance reports",
      "Solar-powered autonomous buoy for open water deployment",
      "Mobile and web dashboard with geographic sensor mapping",
      "AI-driven quality trend prediction and anomaly flagging",
    ],
    techStack: ["ESP32", "MQTT", "LoRa", "Node.js", "React", "MongoDB", "AWS IoT Core"],
  },

  "milk-quality-detector": {
    id: "milk-quality-detector",
    title: "Milk Quality Detector",
    tagline: "From Farm to Consumer — Quality You Can Trust.",
    category: "IoT / Food Safety",
    overview:
      "Maintaining high-quality milk is essential for both consumer safety and dairy industry standards. Traditional methods for milk quality assessment can be labor-intensive and may not offer real-time insights. To overcome these challenges, we propose the development of a sophisticated Milk Quality Detector. This system will employ advanced sensors and analytical technologies to monitor and evaluate key milk quality parameters in real-time. By integrating this solution, our client will achieve accurate and timely assessments of milk quality, enhancing product safety, compliance, and overall quality management in dairy operations.",
    image: iotImage5,
    galleryImages: [
      iotImage_61,
      iotImage_62,
      iotImage_63,
    ],
    components: [
      { name: "pH Sensor", description: "Measures milk acidity to assess freshness — fresh milk has a pH of 6.4–6.8; deviation indicates souring or adulteration." },
      { name: "Conductivity / TDS Sensor", description: "Detects water dilution and added salts by measuring ionic conductivity of the milk sample." },
      { name: "Lactometer / Density Sensor", description: "Ultrasonic density probe measuring specific gravity to detect water addition or fat skimming." },
      { name: "Temperature Sensor (DS18B20)", description: "Precise digital temperature probe monitoring cold chain compliance and detecting microbial activity signatures." },
      { name: "Turbidity Sensor (NIR)", description: "Near-infrared optical sensor estimating fat content and detecting starch/flour adulteration by light scattering." },
      { name: "ESP32 + OLED Display Unit", description: "Central microcontroller aggregating all sensor readings, displaying results on-site, and syncing data to the cloud platform." },
    ],
    specifications: [
      { label: "pH Detection Range", value: "4.0 – 9.0 pH" },
      { label: "Conductivity Range", value: "0 – 5000 µS/cm" },
      { label: "Temperature Range", value: "-10°C to +80°C" },
      { label: "Analysis Time", value: "< 30 seconds per sample" },
      { label: "Connectivity", value: "Wi-Fi + Bluetooth (ESP32)" },
      { label: "Power Supply", value: "5V USB / Li-Ion Battery" },
    ],
    features: [
      "Real-time detection of water, urea, and starch adulteration",
      "Instant freshness assessment via pH and conductivity",
      "Fat content estimation using NIR turbidity sensing",
      "Cold chain temperature compliance monitoring",
      "Blockchain-linked quality certificates for traceability",
      "Dairy cooperative dashboard with batch-level reporting",
    ],
    techStack: ["ESP32", "Python", "MQTT", "Node.js", "React", "MongoDB", "Blockchain (optional)"],
  },
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const IoTProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = projectId ? projects[projectId] : null;

  // Get related IoT projects (excluding current one)
  const relatedSolutions = Object.values(projects)
    .filter(p => p.id !== projectId)
    .slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f6f6] font-['Poppins']">
        <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase">Project Not Found</h2>
        <p className="text-gray-500 mb-8">This IoT project doesn't exist or the link is invalid.</p>
        <button onClick={() => navigate("/services/iot-solution")} className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
          ← Back to IoT Solutions
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f6f6f6] font-['Poppins'] text-gray-900 min-h-screen">

      {/* ── HERO ── */}
      <section className="bg-[#171D26] text-white pt-36 pb-20 text-center relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase mb-4 px-4"
        >
          {project.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="text-gray-400 text-base md:text-lg mb-6"
        >
          {project.tagline}
        </motion.p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Link to="/"><Home size={16} className="text-white" /></Link>
          <span className="opacity-50">›</span>
          <Link to="/services/iot-solution" className="hover:text-white transition-colors">IoT Solution</Link>
          <span className="opacity-50">›</span>
          <span className="text-white">{project.title}</span>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-20 py-16">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-10 transition-colors text-sm font-bold uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200">

          {/* ── HERO IMAGE ── */}
          <div className="w-full h-[280px] md:h-[420px] overflow-hidden relative">
            <img
              loading="lazy"
              decoding="async"
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <span className="absolute bottom-6 left-6 px-4 py-1.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full">
              {project.category}
            </span>
          </div>

          <div className="p-8 md:p-12 lg:p-16">

            {/* ── OVERVIEW ── */}
            <div className="mb-12">
              <h2 className="text-2xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <div className="w-6 h-1 bg-black"></div> Project Overview
              </h2>
              <p className="text-gray-600 leading-loose text-base md:text-lg">{project.overview}</p>
            </div>

            {/* ── GALLERY ── */}
            <div className="mb-12">
              <h2 className="text-2xl font-black uppercase text-black mb-6 flex items-center gap-3">
                <div className="w-6 h-1 bg-black"></div> Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.galleryImages.map((src, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm aspect-video"
                  >
                    <img loading="lazy" decoding="async" src={src} alt={`${project.title} gallery ${i + 1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── COMPONENTS + SPECS ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">

              {/* Components */}
              <div>
                <h2 className="text-2xl font-black uppercase text-black mb-6 flex items-center gap-3">
                  <Package size={22} className="text-black" /> Components
                </h2>
                <div className="space-y-4">
                  {project.components.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-black hover:shadow-sm transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-black text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-black text-black text-sm uppercase tracking-wide mb-1 group-hover:text-gray-700">{c.name}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{c.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-2xl font-black uppercase text-black mb-6 flex items-center gap-3">
                  <Cpu size={22} className="text-black" /> Specifications
                </h2>
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  {project.specifications.map((s, i) => (
                    <div key={i} className={`flex items-center justify-between px-5 py-4 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}>
                      <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{s.label}</span>
                      <span className="text-black text-sm font-black">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="mt-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                    <Zap size={14} /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t, i) => (
                      <span key={i} className="px-4 py-2 bg-black text-white text-xs font-bold rounded-full tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── KEY FEATURES ── */}
            <div className="pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-black uppercase text-black mb-6 flex items-center gap-3">
                <CheckCircle size={22} className="text-black" /> Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-black hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <span className="text-gray-700 text-sm font-medium leading-snug">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── BUY NOW CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 pt-10 border-t border-gray-100"
            >
              <div className="bg-[#171D26] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

                <div className="text-center md:text-left relative z-10">
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Ready to deploy?</p>
                  <h3 className="text-white text-2xl md:text-3xl font-black leading-tight mb-3">
                    Get This Solution <br className="hidden md:block" />For Your Business
                  </h3>
                  <p className="text-gray-400 text-sm max-w-md">
                    Our team will customize, deploy, and support this system end-to-end. Contact us to get a tailored quote.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 relative z-10 flex-shrink-0">
                  <motion.a
                    href="https://mindbotics.in/projects"
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Buy Now
                  </motion.a>
                  <motion.a
                    href="/contactus"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
                  >
                    Request a Quote
                  </motion.a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── RELATED SOLUTIONS ── */}
        {relatedSolutions.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-grow bg-gray-200"></div>
              <h2 className="text-2xl md:text-3xl font-black uppercase text-black tracking-tight flex items-center gap-3 whitespace-nowrap">
                <LayoutGrid size={28} />
                Related Solutions
              </h2>
              <div className="h-px flex-grow bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedSolutions.map((rs, i) => (
                <motion.div
                  key={rs.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={`/services/iot-solution/${rs.id}`}
                    className="block group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={rs.image}
                        alt={rs.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        {rs.category.split(' / ')[1] || rs.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-black uppercase leading-tight mb-2 group-hover:text-gray-700 transition-colors">
                        {rs.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                        {rs.overview}
                      </p>
                      <div className="flex items-center text-xs font-black uppercase tracking-wider gap-2">
                        View Solution
                        <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                          <ArrowLeft size={12} className="rotate-180" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default IoTProjectDetail;
