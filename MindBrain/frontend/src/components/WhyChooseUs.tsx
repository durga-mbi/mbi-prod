import React from "react";
import bgImage from "../assets/it_product_laptop.webp";

const WhyChooseUs: React.FC = () => {
    const features = [
        {
            number: "01",
            title: "Creative Design",
            description: "Modern and intuitive interfaces crafted for the perfect user experience."
        },
        {
            number: "02",
            title: "24x7 User Support",
            description: "Dedicated assistance to ensure your operations never experience downtime."
        },
        {
            number: "03",
            title: "Affordable Cost",
            description: "Competitive pricing models designed to deliver maximum value and ROI."
        },
        {
            number: "04",
            title: "Business Growth",
            description: "Scalable, high-performance solutions that evolve seamlessly alongside you."
        }
    ];

    return (
        <section className="relative w-full py-28 flex flex-col justify-center overflow-hidden">
            {/* Full-width Background Image with Soft Dark Overlay */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed grayscale"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                
                {/* Header */}
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        <span className="font-light">Why Choose</span> <span className="font-extrabold text-white underline decoration-4 underline-offset-8">Us</span>
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto">
                        Delivering excellence through refined processes, dedicated support, and scalable digital solutions tailored for your enterprise.
                    </p>
                </div>

                {/* Features Staggered Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 relative mt-16 max-w-5xl mx-auto">
                    {features.map((feature, idx) => (
                        <div 
                            key={idx} 
                            className={`group flex flex-col relative w-full ${idx % 2 !== 0 ? 'md:mt-16' : ''}`}
                        >
                            {/* Feature Card */}
                            <div className="bg-white p-6 md:p-8 w-full rounded-sm shadow-xl border border-gray-100 group-hover:bg-black group-hover:border-black transform group-hover:-translate-y-3 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-500 flex flex-col justify-center min-h-[180px] relative overflow-hidden">
                                
                                {/* Giant Number Background (visible heavily on hover) */}
                                <div className="absolute -right-2 -bottom-4 text-8xl font-black text-gray-50 group-hover:text-[#1a1a1a] transition-colors duration-500 z-0 select-none">
                                    {feature.number}
                                </div>
                                
                                <div className="z-10 relative">
                                    {/* Small Number Badge */}
                                    <div className="w-10 h-10 bg-black group-hover:bg-white text-white group-hover:text-black flex items-center justify-center font-bold text-base mb-4 transition-colors duration-500 shadow-sm">
                                        {feature.number}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-500">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-500 text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
