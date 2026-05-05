import { Home } from "lucide-react";
import { Link } from "react-router-dom";

import bloomberg from "../assets/bloomberg.webp";
import stanford from "../assets/stanford.webp";
import cambridge from "../assets/cambridge.webp";
import microsoft from "../assets/microsoft.webp";
import google from "../assets/google.webp";
import opengov from "../assets/opengov.webp";
import allegro from "../assets/allegro.webp";
import amazon from "../assets/amazon.webp";

import paypal from "../assets/paypal.webp";
import tcs from "../assets/tcs.webp";
import infosys from "../assets/infosys.webp";
import atos from "../assets/atos.webp";

// New Logos
import swiggy from "../assets/swiggy.webp";
import veltris from "../assets/veltris.webp";

// Pending imports - Uncomment these when files are added to src/assets
import dreamorbit from "../assets/dreamorbit.webp";
import eviden from "../assets/eviden.webp";
import hubai from "../assets/hubai.webp";
import persistent from "../assets/persistent.webp";
import supersourcing from "../assets/supersourcing.webp";
import timad from "../assets/timad.webp";
import aarete from "../assets/aarete.webp";
import qset from "../assets/qset.webp";
import incruiter from "../assets/incruiter.webp";
import awign from "../assets/awigin.webp";

const clients = [
  { name: "OpenGov", logo: opengov },
  { name: "Allegro", logo: allegro },
  { name: "Amazon", logo: amazon },
  { name: "PayPal", logo: paypal },
  { name: "TCS", logo: tcs },
  { name: "Infosys", logo: infosys },
  { name: "Atos", logo: atos },
  { name: "Bloomberg", logo: bloomberg },
  { name: "Stanford University", logo: stanford },
  { name: "University of Cambridge", logo: cambridge },
  { name: "Microsoft", logo: microsoft },
  { name: "Google", logo: google },
  // Appended Clients
  { name: "Swiggy", logo: swiggy },
  { name: "Awign", logo: awign },
  { name: "DreamOrbit", logo: dreamorbit }, // Replace with dreamorbit
  { name: "Eviden", logo: eviden }, // Replace with eviden
  { name: "Hub.ai", logo: hubai }, // Replace with hubai
  { name: "Persistent Systems", logo: persistent }, // Replace with persistent
  { name: "Veltris", logo: veltris },
  { name: "Supersourcing", logo: supersourcing }, // Replace with supersourcing
  { name: "TIMAD", logo: timad }, // Replace with timad
  { name: "Aarete", logo: aarete }, // Replace with aarete
  { name: "QSET", logo: qset }, // Replace with qset
  { name: "Incruiter", logo: incruiter }, // Replace with incruiter
];

const Clients = () => {
  return (
    <div className="w-full bg-[#f6f6f6] font-['Poppins'] text-gray-900">

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-20 bg-[#171D26] text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4">
          OUR CLIENTS
        </h1>
        <div className="flex justify-center items-center gap-2 text-sm text-gray-300">
          <Link
            to="/"
            className="flex items-center hover:text-white transition-colors"
          >
            <Home size={18} />
          </Link>
          <span className="opacity-60 text-lg">{">"}</span>
          <span className="opacity-90">Our Clients</span>
        </div>
      </section>
      {/* ================= CLIENT SECTION ================= */}
      <section className="w-full py-16 flex justify-center">

        <div className="max-w-7xl w-full px-4 md:px-8">

          {/* HEADING */}
          <div className="flex items-center gap-3 mb-10 md:mb-14">

            <div className="flex items-center gap-2">
              <div className="w-8 md:w-12 h-[2px] bg-gray-400"></div>
              <div className="w-2 h-2 bg-gray-400 rotate-45"></div>
            </div>

            <h2 className="text-lg md:text-[30px] font-bold text-[#2c3654] tracking-wide">
              TRUSTED BY OVER 1500+ COMPANIES
            </h2>

          </div>

          {/* CLIENT GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 justify-items-center">

            {clients.map((client, index) => (
              <div
                key={index}
                className="group
                  w-full max-w-[160px] md:max-w-[180px]
                  h-[120px] md:h-[160px]
                  flex items-center justify-center 
                  bg-white 
                  border-2 border-dashed border-gray-300 
                  rounded-xl
                  transition-all duration-300 
                  hover:shadow-xl md:hover:shadow-2xl 
                  hover:-translate-y-1 md:hover:-translate-y-2 
                  hover:scale-105 
                  hover:border-black
                  cursor-pointer
                "
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={client.logo}
                  alt={client.name}
                  className="max-h-[40px] md:max-h-[60px] object-contain transition duration-300 group-hover:scale-110 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
};

export default Clients;
