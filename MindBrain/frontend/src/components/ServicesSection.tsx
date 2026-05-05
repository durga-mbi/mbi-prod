import React from 'react';

interface ServiceCard {
    title: string;
    description: string;
    icon: React.ReactNode;
    isFeatured?: boolean;
}

const services: ServiceCard[] = [
    {
        title: "SOFTWARE TRAINING",
        description: "We offer training courses in software that ensure our students learn how to develop software and become effective problem solvers. We have included topics on web development, backend development, and database development. Learners will engage in real-world experiences, guided by professionals, to ensure that they acquire the ability to develop scalable software applications.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        title: "IT PRODUCT DEVLEPMENT",
        description: "Our company builds software products - we rely on technology at every step. We ensure the software works without failure, grows with demand and fits the people who use it. The team handles the whole life of a product - we test the idea first.We design, code, release and then keep the system healthy.With our process, companies replace old workflows with digital ones faster.",
        isFeatured: true,
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        )
    },
    {
        title: "IOT SOLUTION",
        description: "Our IoT solutions enable interconnectivity of devices, data collection and process automation. We optimize processes, monitor activities, and make informed decisions. Whether in a residential environment, industry, or manufacturing, we design secure and intelligent IoT solutions.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
        )
    },
    {
        title: "MAIN POWER OUT SOURCING",
        description: "Our company offers outsourced solutions for primary power management that help you get reliable power sources for your enterprise. The range of our services includes managing electricity consumption, having backup systems, monitoring processes, and maintenance activities.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        title: "AI/ML FULLSTACK TRAINING",
        description: "In our program, we train you in AI/ML full stack including data science, machine learning, and modern web development. You will learn how to create smart apps by working on live projects using industry-standard tools and gaining practical experience.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 12L2.5 6.5" />
                <path d="M12 12L21.5 6.5" />
                <path d="M12 12v10" />
            </svg>
        )
    }
];

const Card: React.FC<ServiceCard> = ({ title, description, icon, isFeatured }) => {
    return (
        <div className={`group p-8 rounded-[24px] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] ${isFeatured
            ? 'bg-gradient-to-br from-[#2d2d2d] to-[#000000] text-white hover:from-[#1f2937] hover:to-[#000000]'
            : 'bg-white text-[#0f172a] hover:bg-[#0f172a] hover:text-white'
            }`}>
            <div className={`w-14 h-14 rounded-[12px] flex items-center justify-center mb-10 transition-all duration-300 group-hover:scale-110 ${isFeatured ? 'bg-[#1a1a1a] text-white group-hover:bg-white group-hover:text-[#0f172a]' : 'bg-[#f1f5f9] text-[#0f172a] group-hover:bg-white group-hover:text-[#0f172a]'
                }`}>
                {icon}
            </div>
            <h3 className="text-[18px] font-bold mb-4 tracking-tight uppercase leading-tight transition-colors duration-300">{title}</h3>
            <p className={`text-[14px] leading-relaxed transition-colors duration-300 ${isFeatured ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-200'}`}>
                {description}
            </p>
        </div>
    );
};

const ServicesSection: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Circle */}
            <div className="absolute left-[-10%] top-[10%] w-[600px] h-[600px] bg-[#f8fafc] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-[80px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Column 1 */}
                    <div className="flex flex-col gap-12">
                        <div className="pt-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-[2px] w-12 bg-[#0f172a]" />
                                <div className="w-2 h-2 bg-[#0f172a] transform rotate-45" />
                            </div>
                            <h2 className="text-[64px] font-black text-[#0f172a] leading-[0.9] tracking-tighter mb-4">SERVICES</h2>
                            <p className="text-[20px] text-gray-400 font-medium leading-tight">
                                What we can do for<br />your business
                            </p>
                        </div>
                        <Card {...services[0]} />
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-8 lg:mt-12">
                        <Card {...services[1]} />
                        <Card {...services[3]} />
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-8 lg:mt-24">
                        <Card {...services[2]} />
                        <Card {...services[4]} />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
