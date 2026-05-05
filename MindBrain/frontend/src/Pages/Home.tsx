import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ClientSection from "../components/ClientSection";
import ServicesSection from "../components/ServicesSection";
import WhyChooseUs from "../components/WhyChooseUs";
import TrainingSection from "../components/TrainingSection";
import CommunitySection from "../components/CommunitySection";
import Testimonials from "../components/Testimonials";
import SubContainer from "../components/SubContainer";

const homeSections = [
  ClientSection,
  ServicesSection,
  WhyChooseUs,
  TrainingSection,
  CommunitySection,
  Testimonials,
  SubContainer,
];

const sectionReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      {homeSections.map((Section, index) => (
        <motion.div
          key={index}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Section />
        </motion.div>
      ))}
    </>
  );
};

export default Home;
