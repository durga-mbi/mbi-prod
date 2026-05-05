import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import sticker from "../assets/img_staffing.webp";
import sticker2 from "../assets/img_about.webp";
import OurStory from "../components/OurStory";
import mission from "../assets/our_mission.webp" 
import vision from "../assets/our_vision.webp" 

const AboutUs = () => {
  return (
    <div className="w-full bg-[#f6f6f6] font-['Poppins'] text-gray-900">
      {/* HERO SECTION */}
      <section className="pt-36 pb-20 bg-[#171D26] text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4">
          ABOUT US
        </h1>
        <div className="flex justify-center items-center gap-2 text-sm text-gray-300">
          <Link
            to="/"
            className="flex items-center hover:text-white transition-colors"
          >
            <Home size={18} />
          </Link>
          <span className="opacity-60 text-lg">{">"}</span>
          <span className="opacity-90">About Us</span>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center relative">
        <div className="absolute left-[-100px] top-1/2 -translate-y-1/2 w-48 h-48 bg-blue-100 rounded-full blur-[80px] opacity-30"></div>

        <div className="relative z-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-black"></div>
            <h2 className="text-3xl font-bold tracking-tight uppercase">About us</h2>
            {/* <div className="w-3 h-3 bg-red-600 rounded-full ml-auto md:ml-20"></div> */}
          </div>

          <h3 className="text-4xl font-extrabold mb-8 text-black leading-tight uppercase">
            WE ARE INCREASING BUSINESS SUCCESS <br /> WITH IT SOLUTION
          </h3>

          <p className="text-gray-500 leading-relaxed mb-10 text-lg max-w-xl font-normal">
            In today’s fast-paced digital world, businesses need more than just technology — they need smart, scalable, and innovative IT solutions to stay ahead. We empower organizations by delivering cutting-edge digital services that streamline operations, enhance productivity, and drive measurable growth.
          </p>

          <Link to="/services" className="inline-block bg-[#0b1d23] text-white px-10 py-5 rounded-md font-bold text-sm tracking-widest hover:bg-[#16333b] transition-all transform hover:scale-105 shadow-xl">
            VIEW ALL SERVICES
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
          <img loading="lazy" decoding="async" src={sticker} alt="about" className="w-full relative z-10 rounded-2xl shadow-2xl grayscale brightness-75" />
        </div>
      </section>


      {/* STATS & GROWTH SECTION */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          {/* Stats Circular Layout */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Concentric Circle Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[450px] h-[450px] border border-gray-100 rounded-full"></div>
              <div className="w-[350px] h-[350px] border border-gray-100 rounded-full"></div>
              <div className="w-[250px] h-[250px] border border-gray-100 rounded-full"></div>
            </div>

            {/* Stat 1: Top Right */}
            <div className="group absolute top-[10%] right-[10%] bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center w-40 h-40 border border-gray-50 z-20 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-default">
              <img loading="lazy" decoding="async" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="clients" className="w-10 h-10 mb-2 opacity-80 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-300" />
              <h2 className="text-3xl font-black text-black group-hover:text-blue-600 transition-colors">500+</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Happy Clients</p>
            </div>

            {/* Stat 2: Left Center */}
            <div className="group absolute left-[-20px] top-[40%] bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center w-44 h-44 border border-gray-50 z-20 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-default">
              <div className="flex gap-1 mb-2 group-hover:scale-110 transition-all duration-300">
                <span className="text-yellow-400 group-hover:text-yellow-500 drop-shadow-md">★</span>
                <span className="text-yellow-400 group-hover:text-yellow-500 drop-shadow-md">★</span>
                <span className="text-yellow-400 group-hover:text-yellow-500 drop-shadow-md">★</span>
              </div>
              <h2 className="text-4xl font-black text-black group-hover:text-amber-500 transition-colors">1,000+</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Projects Completed</p>
            </div>

            {/* Stat 3: Bottom Center */}
            <div className="group absolute bottom-[0%] right-[15%] bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center w-40 h-40 border border-gray-50 z-20 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-default">
              <img loading="lazy" decoding="async" src="https://cdn-icons-png.flaticon.com/512/423/423786.png" alt="growth" className="w-10 h-10 mb-2 opacity-80 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-300" />
              <h2 className="text-3xl font-black text-black group-hover:text-emerald-500 transition-colors">128 %</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Annual Growth</p>
            </div>
          </div>

          {/* Growth Text Content */}
          <div className="relative">
            <span className="text-gray-400 font-medium italic mb-4 block">We always strive to be better</span>
            <h3 className="text-4xl font-extrabold mb-8 text-black leading-tight uppercase">
              WE HELP BUSSINESSES GROW WITH EFFECTIVE SEO METHODS AND OUR EFFORTS.
            </h3>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] flex-grow bg-gray-200"></div>
              <div className="h-[2px] w-20 bg-black"></div>
            </div>

            <p className="text-gray-500 leading-relaxed mb-10 text-lg font-normal">
              We empower businesses to achieve sustainable growth through strategic and result-driven SEO solutions. Our approach focuses on improving search engine rankings, increasing organic traffic, and enhancing online visibility to connect you with the right audience.
            </p>

            <Link to="/services" className="inline-flex items-center gap-3 bg-[#0b1d23] text-white px-8 py-4 rounded-full font-bold text-xs tracking-widest hover:bg-[#1c3a44] transition-all group shadow-lg">
              <div className="bg-white/10 p-1 rounded-full group-hover:bg-white/20 transition-colors">
                <Home size={16} />
              </div>
              VIEW ALL SERVICES
            </Link>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-[#111111] to-[#222222] text-white rounded-[40px] p-2 flex flex-col md:flex-row items-stretch gap-0 shadow-2xl overflow-hidden min-h-[350px]">
          <div className="md:w-1/3 overflow-hidden rounded-[38px]">
            <img
              loading="lazy"
              decoding="async"
              src={vision}
              alt="vision"
              className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
            />
          </div>

          <div className="flex-1 p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-white/40"></div>
              <h2 className="text-3xl font-bold tracking-tight text-white uppercase italic">OUR VISION</h2>
            </div>

            <h3 className="text-xl font-bold mb-6 text-gray-100 uppercase tracking-wider">
              EXCELLENCE FOR BETTERMENT OF LIFE
            </h3>

            <p className="text-gray-400 text-lg leading-relaxed line-clamp-4 font-normal">
              Inspiring individuals and organizations through innovations, technologies, and development to create a brighter future through intelligence and excellence. Bringing solutions that make lives better today and build for tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-[#111111] to-[#222222] text-white rounded-[40px] p-2 flex flex-col md:flex-row-reverse items-stretch gap-0 shadow-2xl overflow-hidden min-h-[350px]">
          <div className="md:w-1/3 overflow-hidden rounded-[38px]">
            <img
              loading="lazy"
              decoding="async"
              src={mission}
              alt="mission"
              className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
            />
          </div>

          <div className="flex-1 p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-white/40"></div>
              <h2 className="text-3xl font-bold tracking-tight text-white uppercase italic">OUR MISSION</h2>
            </div>

            <h3 className="text-xl font-bold mb-6 text-gray-100 uppercase tracking-wider">
              EXCELLENCE FOR BETTERMENT OF LIFE
            </h3>

            <p className="text-gray-400 text-lg leading-relaxed line-clamp-4 font-normal">
              Our promise of providing high-quality training, proper placements, and cutting-edge IT services for growth.
              Our dedication to developing skills, generating opportunities, and advancing technology around the world.
            </p>
          </div>
        </div>
      </section>

      <OurStory />

      {/* CORE VALUES */}
      <section className="bg-white py-24 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-12 bg-black"></div>
            <h2 className="text-5xl font-extrabold tracking-tight uppercase text-black">CORE VALUES</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 text-center">
            {/* Value 1 */}
            <div className="group cursor-default p-6 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="bg-[#4a5568] p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#0b1d23] transition-all duration-300">
                <img loading="lazy" decoding="async" src="https://cdn-icons-png.flaticon.com/512/3252/3252934.png" alt="betterment" className="w-10 h-10 invert opacity-90 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-2 uppercase tracking-tight text-black">BETTERMENT</h3>
              <p className="text-sm text-gray-500 font-medium px-4">
                Continuous learning for betterment
              </p>
            </div>

            {/* Value 2 */}
            <div className="group cursor-default p-6 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="bg-[#4a5568] p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#0b1d23] transition-all duration-300">
                <img loading="lazy" decoding="async" src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="accountability" className="w-10 h-10 invert opacity-90 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-2 uppercase tracking-tight text-black">ACCOUNTABILITY</h3>
              <p className="text-sm text-gray-500 font-medium px-4">
                Accountability for providing finest solutions
              </p>
            </div>

            {/* Value 3 */}
            <div className="group cursor-default p-6 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="bg-[#4a5568] p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#0b1d23] transition-all duration-300">
                <img loading="lazy" decoding="async" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="success" className="w-10 h-10 invert opacity-90 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-2 uppercase tracking-tight text-black">SUCCESS</h3>
              <p className="text-sm text-gray-500 font-medium px-4">
                Success for us is to help help you great manage work
              </p>
            </div>

            {/* Value 4 */}
            <div className="group cursor-default p-6 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="bg-[#4a5568] p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#0b1d23] transition-all duration-300">
                <img loading="lazy" decoding="async" src="https://cdn-icons-png.flaticon.com/512/1162/1162953.png" alt="excellence" className="w-10 h-10 invert opacity-90 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-2 uppercase tracking-tight text-black">EXCELLENCE</h3>
              <p className="text-sm text-gray-500 font-medium px-4">
                Excellence by overhaul high in work follow an impactable future
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODERN COMPANY ABOUT SECTION */}
      <section className="bg-[#f6f6f6] pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-14 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left Content */}
              <div className="flex flex-col text-center lg:text-left order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight mb-6">
                  Transforming Bold Visions into Tangible Realities
                </h2>
                <p className="text-gray-500 font-light text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                  We empower businesses through innovative technology, refining processes and delivering high-impact solutions that drive sustainable growth in a connected digital world.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mb-14">
                  <Link to="/services/manpower-outsourcing/it-staffing" className="inline-block bg-black text-white px-8 py-3.5 rounded-md font-semibold tracking-wide hover:bg-gray-800 hover:-translate-y-0.5 transition-all w-full sm:w-auto shadow-md text-center">
                    Get Started
                  </Link>
                  <Link to="/services/manpower-outsourcing/it-staffing" className="group inline-flex items-center justify-center gap-1 bg-transparent text-gray-800 border border-gray-300 px-8 py-3.5 rounded-md font-semibold tracking-wide hover:bg-gray-100 hover:border-gray-400 hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                    Learn More <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
                  </Link>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-12 lg:gap-16 border-t border-gray-200 pt-8">
                  <div>
                    <h4 className="text-4xl font-extrabold text-black mb-1">98%</h4>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Customer Satisfaction</p>
                  </div>
                  <div className="w-[1px] h-12 bg-gray-300 hidden sm:block"></div>
                  <div>
                    <h4 className="text-4xl font-extrabold text-black mb-1">1K+</h4>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Projects Delivered</p>
                  </div>
                </div>
              </div>

              {/* Right Image Layout */}
              <div className="relative order-1 lg:order-2 w-full mt-4 lg:mt-0">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={sticker2}
                    alt="Innovation"
                    className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover grayscale opacity-90 transition-all duration-700 hover:grayscale-0 hover:opacity-100"
                  />
                </div>

                {/* Floating Badge Overlay */}
                {/* <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:-translate-x-0 lg:-bottom-8 lg:-left-8 bg-white px-5 py-4 rounded-xl shadow-xl flex items-center gap-4 border border-gray-100 z-10 hover:-translate-y-1 transition-transform w-[max-content]">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 shadow-sm"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 shadow-sm"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center text-xs font-bold text-white shadow-sm">+</div>
                  </div>
                  <div className="text-left">
                    <h5 className="font-bold text-black text-sm">1000+</h5>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">Happy Clients</p>
                  </div>
                </div> */}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY SECTION */}

    </div>
  );
};

export default AboutUs;
