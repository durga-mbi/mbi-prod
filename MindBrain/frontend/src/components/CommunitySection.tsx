import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../assets/it_product_laptop.webp';

const Bubble: React.FC<{ size: number; top: string; left: string; delay: number }> = ({ size, top, left, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{
                y: [0, -20, 0],
                x: [0, 10, 0]
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay
            }}
            className="absolute bg-white/10 rounded-full"
            style={{
                width: size,
                height: size,
                top,
                left,
                filter: "blur(1px)"
            }}
        />
    );
};

const CommunitySection: React.FC = () => {
    const bubbles = [
        { size: 180, top: '10%', left: '5%', delay: 0 },
        { size: 100, top: '25%', left: '18%', delay: 1 },
        { size: 140, top: '70%', left: '15%', delay: 0.5 },
        { size: 110, top: '55%', left: '5%', delay: 2 },
        { size: 150, top: '5%', left: '80%', delay: 1.5 },
        { size: 130, top: '25%', left: '85%', delay: 0.2 },
        { size: 100, top: '65%', left: '75%', delay: 1.8 },
        { size: 220, top: '75%', left: '85%', delay: 0.7 },
    ];

    return (
        <section className="py-32 relative overflow-hidden min-h-[500px] flex items-center justify-center border-t border-b border-gray-800">
            {/* Full-width Background Image with Soft Dark Overlay */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed grayscale"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-black/70"></div>
            </div>
            {/* Artistic Bubbles */}
            {bubbles.map((bubble, idx) => (
                <Bubble key={idx} {...bubble} />
            ))}

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[28px] md:text-[36px] font-bold mb-10 tracking-wider uppercase leading-tight"
                >
                    A COMMUNITY YOU'LL BE PROUD TO BE A PART OF
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[14px] md:text-[16px] leading-relaxed text-gray-200 font-medium uppercase tracking-widest max-w-[800px] mx-auto"
                >
                    WE'VE BEEN SUCCESSFUL IN OUR GOAL TO KEEP OUR COWORKING COMMUNITY HAPPY,
                    ENGAGED, AND PRODUCTIVE. OUR COMMUNITY MANAGERS HOST NUMEROUS FUN-FILLED
                    EVENTS EACH MONTH TO ENERGIZE THE WORK ENVIRONMENT AND FACILITATE
                    NETWORKING.
                </motion.p>
            </div>
        </section>
    );
};

export default CommunitySection;
