import { motion } from 'framer-motion';
import bgImage from "../assets/it_product_laptop.webp";

const milestones = [
  {
    year: '2022/2023',
    description: 'The company entered its starting phase with a clear vision and structured planning. Initial setup, core operations, and foundation building were completed to support future growth.',
  },
  {
    year: '2023/2024',
    description: 'IT staffing services were launched to connect businesses with skilled technology professionals. Business operations expanded with stronger client engagement and service delivery.',
  },
  {
    year: '2024/2025',
    description: 'A Terms & Conditions system was added to improve process clarity and compliance. MERN technology was implemented to build scalable, modern, and reliable web solutions.',
  },
  {
    year: '2025/2026',
    description: 'ISO certification was achieved, strengthening trust and quality assurance. Organizational standards were improved through better processes, documentation, and operational discipline.',
  },
  {
    year: '2026/2027',
    description: 'The company is expanding into multi-field sectors including IoT, robotics, drone, EV, and IT training programs. This phase focuses on innovation, skill development, and broader technology impact.',
    isLatest: true,
  },
];

const OurStory = () => {
  return (
    <section className="relative w-full py-28 flex flex-col justify-center overflow-hidden">
      {/* Full-width Background Image with Soft Dark Overlay */}
      <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed grayscale"
          style={{ backgroundImage: `url(${bgImage})` }}
      >
          <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            <span className="font-light">Our</span> <span className="font-extrabold text-white underline decoration-4 underline-offset-8">Story</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto mt-8"
          >
            A journey of innovation, resilience, and relentless pursuit of excellence.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative mt-8 md:mt-16">
          {/* Vertical Center Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/20 md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((milestone, index) => {
              // Alternate right/left on desktop. 2010 -> right side
              const isRight = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center w-full ${isRight ? 'md:justify-end' : 'md:justify-start'}`}
                >
                  {/* Node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-black border-[3px] border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] z-10 -translate-x-1/2" />

                  {/* Card Container */}
                  <div className={`w-full md:w-[calc(50%-3rem)] pl-16 pr-4 md:px-0`}>
                    <div aria-current={milestone.isLatest ? "step" : undefined} className={`group relative p-6 md:p-8 rounded-sm bg-gray-200 border border-gray-300 shadow-xl hover:bg-gray-800 hover:border-gray-800 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] text-left ${!isRight ? 'md:text-right' : 'md:text-left'}`}>
                      <h4 className="inline-block text-3xl md:text-4xl font-black text-gray-400 mb-3 transition-colors duration-500 group-hover:text-white/20">
                        {milestone.year}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify transition-colors duration-500 group-hover:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
