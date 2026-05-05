import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrochip, FaRobot, FaPython, FaLaptopCode, FaReact } from "react-icons/fa";
import { TbDrone } from "react-icons/tb";

interface TrainingProgram {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const trainingPrograms: TrainingProgram[] = [
  {
    title: "IoT DEVELOPMENT",
    description: "Explore the Internet of Things by connecting physical devices to the digital world. Learn sensor integration, microcontrollers, and cloud communication protocols.",
    icon: <FaMicrochip size={32} className="w-8 h-8" />
  },
  {
    title: "ROBOTICS",
    description: "Design and program automated robotic systems. Focus on kinematics, motor control, and intelligent autonomous navigation to solve real-world physical challenges.",
    icon: <FaRobot size={32} className="w-8 h-8" />
  },
  {
    title: "DRONE TECHNOLOGY",
    description: "Understand the aerodynamics, flight controllers, and programming required for UAVs. Build, calibrate, and fly custom drones for various commercial applications.",
    icon: <TbDrone size={36} className="w-9 h-9" />
  },
  {
    title: "PYTHON WITH AI/ML",
    description: "Dive deep into Python programming and leverage powerful libraries for Artificial Intelligence and Machine Learning. Train intelligent models and analyze massive datasets effortlessly.",
    icon: <FaPython size={32} className="w-8 h-8" />
  },
  {
    title: "WEB DEVELOPMENT",
    description: "Master modern web technologies including HTML, CSS, JavaScript, and responsive design frameworks. Build dynamic, user-friendly websites from scratch with hands-on learning.",
    icon: <FaLaptopCode size={32} className="w-8 h-8" />
  },
  {
    title: "MERN STACK",
    description: "Become a full-stack expert using MongoDB, Express.js, React, and Node.js. Learn to build scalable single-page applications and powerful backend REST APIs.",
    icon: <FaReact size={32} className="w-8 h-8" />
  }
];

interface TrainingCardProps {
  title: string;
  icon: React.ReactNode;
  delay: number;
  isActive: boolean;
  onClick: () => void;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ title, icon, delay, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex justify-center"
    >
      <div 
        onClick={onClick}
        className={`group relative flex flex-col items-center justify-center w-full h-[145px] p-4 text-center border transition-all duration-300 hover:bg-black hover:border-black cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${isActive ? "bg-black border-black shadow-xl -translate-y-2" : "bg-white border-gray-200 shadow-sm"}`}
      >
        {/* top hover line (turns white or accent on dark background to be visible) */}
        <div className={`absolute top-0 left-0 h-[3px] bg-white transition-all duration-500 z-10 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>

        <div className={`mb-4 transition-all duration-300 flex items-center justify-center 
          ${isActive ? 'scale-110 text-white [&>img]:invert [&>img]:brightness-200' : 'text-[#0f172a] group-hover:scale-110 group-hover:text-white [&>img]:transition-all [&>img]:duration-300 [&>img]:group-hover:invert [&>img]:group-hover:brightness-200'}`}>
          {icon}
        </div>

        <h3 className={`text-[10px] md:text-[11px] font-bold tracking-wider uppercase text-center transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#0f172a] group-hover:text-white'}`}>
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

const TrainingSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="training" className="py-28 bg-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute left-[-10%] top-[10%] w-[400px] h-[400px] bg-gray-100 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute right-[-10%] bottom-[10%] w-[400px] h-[400px] bg-gray-100 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-[80px]">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-16">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#0f172a]" />
            <div className="w-2 h-2 bg-[#0f172a] rotate-45" />

            <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-black text-[#0f172a] tracking-tight uppercase">
              Trainings We Offer
            </h2>
          </div>

          <p className="text-[16px] md:text-[18px] text-gray-500 ml-16 max-w-xl">
            Practical training programs designed to help you build real-world
            industry skills. Click any category to explore.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 xl:gap-8 items-stretch pt-4">
          
          {/* Left Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full relative p-10 md:p-12 border border-gray-200 bg-gray-50 rounded-2xl shadow-sm flex flex-col justify-start lg:min-h-[350px] lg:max-h-[380px] overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <div className="mb-4 opacity-30">
                  <div className={`text-[#0f172a]`}>
                     {/* Mirroring the icon briefly as a subtle backdrop or top detail */}
                  </div>
                </div>

                <h3 className="text-[26px] md:text-[28px] font-bold mb-4 text-[#0f172a] uppercase leading-tight">
                  {trainingPrograms[activeIndex].title}
                </h3>

                <div className="flex-grow">
                  <p className="text-[14px] leading-relaxed text-gray-500 mb-6 border-l-2 border-gray-300 pl-4 line-clamp-5">
                    {trainingPrograms[activeIndex].description}
                  </p>
                </div>

                <button className="self-start px-6 py-3 border-2 border-black text-black font-bold uppercase tracking-wider text-[11px] hover:bg-black hover:text-white transition-all shadow-md mt-auto" onClick={() => window.open("https://www.mindbotics.in/courses", "_blank")}>
                  Explore course
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Training Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-[20px]">
            {trainingPrograms.map((program, idx) => (
              <TrainingCard
                key={idx}
                title={program.title}
                icon={program.icon}
                delay={0.1 * (idx + 1)}
                isActive={activeIndex === idx}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;