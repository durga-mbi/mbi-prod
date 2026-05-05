import React from 'react';
import paypalLogo from '../assets/paypal.webp';
import swiggyLogo from "../assets/swiggy.webp";
import infosysLogo from "../assets/infosys.webp";
import honeywellLogo from "../assets/honeywell.webp";
import deloitteLogo from "../assets/deloitte.webp";
import veltrisLogo from "../assets/veltris.webp";
import atosLogo from "../assets/atos.webp";

const ClientSection: React.FC = () => {
    const clients = [
        {
            name: "PayPal",
            icon: (
                <img
                    loading="lazy"
                    decoding="async"
                    src={paypalLogo}
                    alt="PayPal"
                    className="h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity"
                />
            )
        },
        {
            name: "Swiggy",
            icon: (
                <img
                    loading="lazy"
                    decoding="async"
                    src={swiggyLogo}
                    alt="Swiggy"
                    className="h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity"
                />
            )
        },
        {
            name: "Infosys",
            icon: (
                <img
                    loading="lazy"
                    decoding="async"
                    src={infosysLogo}
                    alt="Infosys"
                    className="h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity"
                />
            )
        },
        {
            name: "Honeywell",
            icon: (
                <img
                    loading="lazy"
                    decoding="async"
                    src={honeywellLogo}
                    alt="Honeywell"
                    className="h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity"
                />
            )
        },
        {
            name: "Deloitte",
            icon: (
                <img
                    loading="lazy"
                    decoding="async"
                    src={deloitteLogo}
                    alt="Deloitte"
                    className="h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity"
                />
            )
        },
        {
            name: "Veltris",
            icon: (
                <img
                    loading="lazy"
                    decoding="async"
                    src={veltrisLogo}
                    alt="Veltris"
                    className="h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity"
                />
            )
        },
        {
            name: "Atos",
            icon: (
                <img
                    loading="lazy"
                    decoding="async"
                    src={atosLogo}
                    alt="Atos"
                    className="h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity"
                />
            )
        },
    ];

    return (
        <section className="pt-20 pb-0 bg-white overflow-hidden">
            {/* Injecting custom keyframes for the infinite scroll */}
            <style>
                {`
                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee {
                    animation: scroll-left 40s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                `}
            </style>

            <div className="max-w-7xl mx-auto px-6 lg:px-[80px] text-center">
                <h2 className="text-[40px] md:text-[60px] font-extrabold text-black uppercase tracking-tight">
                    OUR CLIENTS
                </h2>
                <p className="mt-4 text-gray-500 text-[16px] md:text-[18px] font-medium">
                    We have been working with some Fortune 500+ clients
                </p>

                {/* Marquee Container */}
                <div className="mt-16 relative w-full overflow-hidden flex bg-white">
                    <div className="flex w-max animate-marquee">
                        {/* First Set of Clients */}
                        {clients.map((client, index) => (
                            <div key={`original-${index}`} className="flex items-center justify-center shrink-0 w-[160px] md:w-[200px] px-4 md:px-8">
                                {client.icon}
                            </div>
                        ))}
                        {/* Second Set of Clients (Duplicate for seamless loop) */}
                        {clients.map((client, index) => (
                            <div key={`duplicate-${index}`} className="flex items-center justify-center shrink-0 w-[160px] md:w-[200px] px-4 md:px-8">
                                {client.icon}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientSection;
