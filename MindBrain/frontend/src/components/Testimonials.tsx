import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import portraitImg from '../assets/testimonial_portrait.webp';

interface TestimonialData {
    id: number;
    text: string;
    name: string;
    role: string;
}

const testimonials: TestimonialData[] = [
    {
        id: 1,
        text: "The web development program fundamentally transformed how we build products. The attention to detail and modern tech stack is unparalleled.",
        name: "Sarah Chen",
        role: "Head of Product",
    },
    {
        id: 2,
        text: "Minimal, clean, and blazingly fast. We saw a 300% increase in conversion rates after implementing their UI/UX suggestions.",
        name: "Marcus Aurelius",
        role: "Founder & CEO",
    },
    {
        id: 3,
        text: "I was blown away by the glassmorphism and smooth animations. It feels like a true premium experience from start to finish.",
        name: "Elena Rostova",
        role: "Design Director",
    },
    {
        id: 4,
        text: "The training didn't just teach code; it taught engineering culture. Our team is shipping features securely and twice as fast.",
        name: "David Kim",
        role: "CTO",
    },
    {
        id: 5,
        text: "Exceptional architecture and incredibly crisp designs. It’s rare to find developers who understand both aesthetics and performance.",
        name: "Priya Sharma",
        role: "Lead Interactive Designer",
    }
];

const SWIPE_THRESHOLD = 120;
const SWIPE_VELOCITY_THRESHOLD = 450;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    const next = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(next, 3000);
        return () => clearInterval(interval);
    }, [isHovered, next]);

    useEffect(() => {
        const updateViewport = () => {
            setIsMobile(window.innerWidth < 768);
        };

        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    const getOffset = (index: number) => {
        const total = testimonials.length;
        let offset = index - activeIndex;
        // Adjust for infinite look
        if (offset < -Math.floor(total / 2)) offset += total;
        if (offset > Math.floor(total / 2)) offset -= total;
        return offset;
    };

    return (
        <section 
            className="relative py-24 md:py-32 bg-white overflow-hidden"
        >
            {/* Background Decorative Circle matching Services */}
            <div className="absolute right-[-10%] top-[20%] w-[600px] h-[600px] bg-[#f8fafc] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-[80px] relative z-10 w-full">
                {/* Header mapped to Home theme */}
                <div className="flex flex-col items-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center w-full"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[2px] w-12 bg-[#0f172a]" />
                            <div className="w-2 h-2 bg-[#0f172a] transform rotate-45" />
                        </div>
                        
                        <h2 className="text-[40px] md:text-[64px] font-black text-[#0f172a] leading-[0.9] tracking-tighter mb-4 uppercase text-center">
                            Testimonials
                        </h2>
                        <p className="text-[18px] md:text-[20px] text-gray-400 font-medium leading-tight max-w-2xl mx-auto text-center">
                            See what industry leaders are saying about our transformative approaches to software and design.
                        </p>
                    </motion.div>
                </div>

                {/* 3D Carousel Container */}
                <div 
                    className="relative h-[480px] md:h-[500px] flex items-center justify-center perspective-[1200px] mt-10"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    
                    <div className="absolute inset-0 flex items-center justify-center w-full h-full transform-style-preserve-3d">
                        <AnimatePresence initial={false} mode="popLayout">
                            {testimonials.map((testimonial, index) => {
                                const offset = getOffset(index);
                                const absOffset = Math.abs(offset);
                                const isActive = offset === 0;

                                const baseTranslation = isMobile ? 50 : 250;

                                return (
                                    <motion.div
                                        key={testimonial.id}
                                        initial={false}
                                        animate={{
                                            opacity: isActive ? 1 : 1 - absOffset * 0.4,
                                            scale: isActive ? 1 : 1 - absOffset * 0.15,
                                            x: offset * baseTranslation,
                                            zIndex: 50 - absOffset,
                                            rotateY: offset * -12, // Slight turn inward
                                            filter: isActive ? 'blur(0px)' : `blur(${absOffset * 4}px)`
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 220,
                                            damping: 25,
                                            mass: 1.2
                                        }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.35}
                                        onDragEnd={(_, { offset, velocity }) => {
                                            const swipe = swipePower(offset.x, velocity.x);
                                            if (offset.x < -SWIPE_THRESHOLD || swipe < -SWIPE_VELOCITY_THRESHOLD) {
                                                next();
                                            } else if (offset.x > SWIPE_THRESHOLD || swipe > SWIPE_VELOCITY_THRESHOLD) {
                                                prev();
                                            }
                                        }}
                                        onClick={() => {
                                            if (!isActive) setActiveIndex(index);
                                        }}
                                        whileDrag={{ scale: 0.98 }}
                                        className={`absolute w-[90%] sm:w-[500px] md:w-[650px] h-auto min-h-[350px] p-8 md:p-10 rounded-[24px] cursor-grab active:cursor-grabbing flex flex-col justify-between shadow-sm transition-colors duration-700
                                            ${isActive 
                                                ? 'bg-gradient-to-br from-[#2d2d2d] to-[#000000] text-white border-transparent shadow-xl' 
                                                : 'bg-white text-[#0f172a] border border-gray-100 cursor-pointer'
                                            }
                                        `}
                                    >
                                        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 pointer-events-none">
                                            <Quote size={80} className={isActive ? 'text-white/20' : 'text-gray-200'} />
                                        </div>

                                        <p className={`text-xl md:text-2xl leading-relaxed relative z-10 font-medium ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>
                                            "{testimonial.text}"
                                        </p>

                                        <div className="flex items-center gap-4 relative z-10 mt-10">
                                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[12px] flex items-center justify-center overflow-hidden ${isActive ? 'bg-[#1a1a1a]' : 'bg-[#f1f5f9]'}`}>
                                                <div className="w-full h-full p-1 relative">
                                                    <img 
                                                        loading="lazy"
                                                        decoding="async"
                                                        src={portraitImg} 
                                                        alt={testimonial.name}
                                                        className="w-full h-full object-cover rounded-[8px] grayscale contrast-125 transition-all duration-500 opacity-90" 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-[18px] md:text-xl tracking-tight uppercase leading-tight ${isActive ? 'text-white' : 'text-[#0f172a]'}`}>
                                                    {testimonial.name}
                                                </h4>
                                                <p className={`text-[14px] leading-relaxed ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
                        <button 
                            onClick={prev}
                            className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50 shadow-sm flex items-center justify-center text-[#0f172a] transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        
                        {/* Pagination Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        activeIndex === idx 
                                        ? 'w-8 bg-[#0f172a] shadow-sm' 
                                        : 'w-2 bg-gray-200 hover:bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>

                        <button 
                            onClick={next}
                            className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50 shadow-sm flex items-center justify-center text-[#0f172a] transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
