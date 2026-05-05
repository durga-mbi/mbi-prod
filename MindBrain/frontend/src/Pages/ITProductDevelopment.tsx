import React, { useEffect, useState } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import laptopImage from "../assets/it_product_laptop.webp";
import ProjectCard from "../components/ProjectCard";
import type { ProjectData } from "../components/ProjectCard";
import {
  apiGet,
  resolveApiAssetUrl,
  type ApiProject,
  type ApiResponse,
  type ProjectsResponse,
} from "../api/api";
import {
  Users,
  ClipboardList,
  PenTool,
  Code,
  Activity,
  Rocket,
  Settings,
} from "lucide-react";

const mapApiProject = (p: ApiProject): ProjectData => ({
  id: p._id,
  title: p.title,
  category: p.category ?? "OTHER",
  client: p.client ?? "",
  domain: p.domain ?? "",
  details: p.description ?? "",
  tech: Array.isArray(p.technologies) ? p.technologies.join(", ") : "",
  image: p.image ? resolveApiAssetUrl(p.image) : undefined,
});

const ITProductDevelopment: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [inHouseProjects, setInHouseProjects] = useState<ProjectData[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInHouseProjects = async () => {
      try {
        setIsLoadingProjects(true);
        setProjectsError(null);

        const res = await apiGet<ApiResponse<ProjectsResponse>>("/projects?limit=100");
        const normalizedProjects = res.data.projects
          .filter((project) => {
            const normalizedClient = project.client?.trim().toLowerCase().replace(/\s+/g, "-");
            return normalizedClient === "in-house";
          })
          .map(mapApiProject);

        setInHouseProjects(normalizedProjects);
      } catch (err) {
        setProjectsError(err instanceof Error ? err.message : "Failed to load projects.");
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchInHouseProjects();
  }, []);

  const faqs = [
    {
      question: "How long does it take to complete a web development project?",
      answer: "The timeline varies depending on the project's complexity and requirements. Our team strives to deliver projects on time while maintaining the highest quality standards."
    },
    {
      question: "Can you handle large-scale mobile app development projects?",
      answer: "Yes, our team is equipped with the expertise to manage and deliver large-scale enterprise mobile applications seamlessly and efficiently."
    },
    {
      question: "Can you integrate third-party APIs into our mobile app?",
      answer: "Absolutely. We regularly integrate advanced REST and GraphQL APIs for payment gateways, social media authentication, custom integrations, and more."
    },
    {
      question: "How do you ensure cross-platform compatibility for mobile apps?",
      answer: "We leverage robust modern frameworks like React Native and Flutter, ensuring a native-like, responsive experience across all major platforms from a single codebase."
    },
    {
      question: "What is your approach to user experience (UX) design?",
      answer: "We prioritize user-centric design principles, ensuring intuitive navigation, clear visual hierarchy, and seamless interactions tailored directly to your target audience."
    }
  ];

  return (
    <div className="w-full bg-white font-['Poppins'] text-gray-900">
      {/* HERO SECTION */}
      <section className="bg-[#171D26] text-white pt-36 pb-20 text-center relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight uppercase">
          IT PRODUCT DEVLOPMENT
        </h1>

        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-normal tracking-wide">
          <Link
            to="/"
            className="flex flex-row gap-2 hover:text-white transition"
          >
            <Home size={20} className="text-white" />
          </Link>
          <span className="opacity-60 text-lg">{">"}</span>
          <span className="opacity-90">Services</span>
          <span className="opacity-60 text-lg">{">"}</span>
          <span className="opacity-90">IT Product Devlopment</span>
        </div>
      </section>

      {/* WE ALWAYS STRIVE TO BE BETTER SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-gray-400 font-medium text-lg mb-4 block">
            We always strive to be better
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-black leading-tight uppercase">
            WE HELP BUSSINESSES GROW WITH EFFECTIVE SEO METHODS AND OUR EFFORTS.
          </h2>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] flex-grow bg-gray-200"></div>
            <div className="h-[2px] w-20 bg-black"></div>
          </div>

          <p className="text-gray-500 leading-relaxed text-sm md:text-base font-normal">
            We help businesses grow by delivering innovative IT solutions combined with effective SEO strategies. Our approach enhances digital presence, improves performance, and drives sustainable business success.
            By leveraging modern technologies and data-driven insights, we create scalable systems tailored to your needs. Our team ensures continuous optimization so your business stays competitive in the evolving digital landscape.
          </p>
        </div>

        <div className="relative">
          <img
            loading="lazy"
            decoding="async"
            src={laptopImage}
            alt="Product Development"
            className="w-full rounded-2xl shadow-xl object-cover"
          />
        </div>
      </section>

      {/* EXCELLENCE FOR BETTERMENT OF LIFE SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center text-black">
        <h2 className="text-3xl font-extrabold mb-8 uppercase">
          EXCELLENCE FOR BETTERMENT OF LIFE
        </h2>
        <p className="text-gray-500 leading-relaxed text-sm font-normal">
          Excellence for the betterment of life. We are committed to delivering high-quality solutions that create real impact and improve everyday experiences.
          Our approach is driven by innovation, precision, and a deep understanding of modern technology.
          We design and develop solutions that are efficient, scalable, and future-ready.
          By combining IT expertise with strategic thinking, we help businesses and individuals grow with confidence.
          Our focus remains on quality, reliability, and continuous improvement in everything we do.
          We believe technology should simplify life, not complicate it.
          Through our efforts, we aim to build smarter systems and stronger digital ecosystems.
          Our commitment extends beyond delivery—we ensure long-term value and performance.
          Together, we strive to create a better, smarter, and more connected world.
        </p>
      </section>

      {/* PROCESS TIMELINE SECTION */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-[1400px] mx-auto relative">
          {/* Central Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-400 -translate-y-1/2 z-0"></div>

          <div className="flex flex-col md:flex-row justify-between items-center relative gap-4 md:gap-0">
            {/* Hexagon 1: Initial Consultation - BOTTOM */}
            <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
              {/* Hexagon */}
              <div
                className="w-28 h-32 bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center relative cursor-default shadow-lg"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div
                  className="w-22 h-24 bg-white text-gray-800 flex items-center justify-center pointer-events-none m-1"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <Users size={36} />
                </div>
              </div>
              {/* Vertical line down */}
              <div className="w-0.5 h-16 bg-gray-800"></div>
              {/* Number badge */}
              <div
                className="bg-gray-800 w-9 h-10 flex items-center justify-center text-white font-bold text-sm"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                01
              </div>
              {/* Title */}
              <h3 className="font-bold text-sm uppercase text-black text-center mt-2 max-w-[140px] leading-tight">
                INITIAL
                <br />
                CONSULTATION
              </h3>
            </div>

            {/* Hexagon 2: Planning - TOP */}
            <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
              {/* Title */}
              <h3 className="font-bold text-sm uppercase text-black text-center mb-2">
                PLANNING
              </h3>
              {/* Number badge */}
              <div
                className="bg-gray-800 w-9 h-10 flex items-center justify-center text-white font-bold text-sm mb-2"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                02
              </div>
              {/* Vertical line up */}
              <div className="w-0.5 h-16 bg-gray-800"></div>
              {/* Hexagon */}
              <div
                className="w-28 h-32 bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center relative cursor-default shadow-lg"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div
                  className="w-22 h-24 bg-white text-gray-800 flex items-center justify-center pointer-events-none m-1"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <ClipboardList size={36} />
                </div>
              </div>
            </div>

            {/* Hexagon 3: Design - BOTTOM */}
            <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
              {/* Hexagon */}
              <div
                className="w-28 h-32 bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center relative cursor-default shadow-lg"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div
                  className="w-22 h-24 bg-white text-gray-800 flex items-center justify-center pointer-events-none m-1"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <PenTool size={36} />
                </div>
              </div>
              {/* Vertical line down */}
              <div className="w-0.5 h-16 bg-gray-800"></div>
              {/* Number badge */}
              <div
                className="bg-gray-800 w-9 h-10 flex items-center justify-center text-white font-bold text-sm"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                03
              </div>
              {/* Title */}
              <h3 className="font-bold text-sm uppercase text-black text-center mt-2">
                DESIGN
              </h3>
            </div>

            {/* Hexagon 4: Development - TOP */}
            <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
              {/* Title */}
              <h3 className="font-bold text-sm uppercase text-black text-center mb-2">
                DEVELOPMENT
              </h3>
              {/* Number badge */}
              <div
                className="bg-gray-800 w-9 h-10 flex items-center justify-center text-white font-bold text-sm mb-2"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                04
              </div>
              {/* Vertical line up */}
              <div className="w-0.5 h-16 bg-gray-800"></div>
              {/* Hexagon */}
              <div
                className="w-28 h-32 bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center relative cursor-default shadow-lg"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div
                  className="w-22 h-24 bg-white text-gray-800 flex items-center justify-center pointer-events-none m-1"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <Code size={36} />
                </div>
              </div>
            </div>

            {/* Hexagon 5: Testing - BOTTOM */}
            <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
              {/* Hexagon */}
              <div
                className="w-28 h-32 bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center relative cursor-default shadow-lg"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div
                  className="w-22 h-24 bg-white text-gray-800 flex items-center justify-center pointer-events-none m-1"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <Activity size={36} />
                </div>
              </div>
              {/* Vertical line down */}
              <div className="w-0.5 h-16 bg-gray-800"></div>
              {/* Number badge */}
              <div
                className="bg-gray-800 w-9 h-10 flex items-center justify-center text-white font-bold text-sm"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                05
              </div>
              {/* Title */}
              <h3 className="font-bold text-sm uppercase text-black text-center mt-2">
                TESTING
              </h3>
            </div>

            {/* Hexagon 6: Launch - TOP */}
            <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
              {/* Title */}
              <h3 className="font-bold text-sm uppercase text-black text-center mb-2">
                LAUNCH
              </h3>
              {/* Number badge */}
              <div
                className="bg-gray-800 w-9 h-10 flex items-center justify-center text-white font-bold text-sm mb-2"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                06
              </div>
              {/* Vertical line up */}
              <div className="w-0.5 h-16 bg-gray-800"></div>
              {/* Hexagon */}
              <div
                className="w-28 h-32 bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center relative cursor-default shadow-lg"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div
                  className="w-22 h-24 bg-white text-gray-800 flex items-center justify-center pointer-events-none m-1"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <Rocket size={36} />
                </div>
              </div>
            </div>

            {/* Hexagon 7: Maintenance - BOTTOM */}
            <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
              {/* Hexagon */}
              <div
                className="w-28 h-32 bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center relative cursor-default shadow-lg"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div
                  className="w-22 h-24 bg-white text-gray-800 flex items-center justify-center pointer-events-none m-1"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <Settings size={36} />
                </div>
              </div>
              {/* Vertical line down */}
              <div className="w-0.5 h-16 bg-gray-800"></div>
              {/* Number badge */}
              <div
                className="bg-gray-800 w-9 h-10 flex items-center justify-center text-white font-bold text-sm"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                07
              </div>
              {/* Title */}
              <h3 className="font-bold text-sm uppercase text-black text-center mt-2">
                MAINTENANCE
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IN-HOUSE PROJECTS SECTION ===== */}
      <section className="px-6 py-24 bg-[#f6f6f6]">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 block">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-black mb-5 leading-tight">
              In-House Projects
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gray-300"></div>
              <div className="h-1 w-8 bg-black rounded-full"></div>
              <div className="h-px w-16 bg-gray-300"></div>
            </div>
            <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
              A curated showcase of our own internally built digital products — each one a testament to our engineering depth and design excellence.
            </p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingProjects && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-sm font-medium">Loading projects...</p>
              </div>
            )}

            {!isLoadingProjects && projectsError && (
              <div className="col-span-full text-center py-12">
                <p className="text-red-600 font-medium">{projectsError}</p>
              </div>
            )}

            {!isLoadingProjects && !projectsError && inHouseProjects.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-sm font-medium">
                  No in-house projects available right now.
                </p>
              </div>
            )}

            {!isLoadingProjects &&
              !projectsError &&
              inHouseProjects.map((project) => (
                <ProjectCard key={project.id} project={project} imageClassName="grayscale" />
              ))}

            {!isLoadingProjects && !projectsError && (
              <div className="group relative bg-white rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-black transition-all duration-500 cursor-default flex items-center justify-center min-h-[340px]">
                <div className="text-center px-8 py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-black flex items-center justify-center mx-auto mb-6 transition-all duration-500">
                    <span className="text-3xl group-hover:animate-spin transition-all duration-500">+</span>
                  </div>
                  <h3 className="text-lg font-black uppercase text-gray-400 group-hover:text-black mb-3 transition-colors duration-500 tracking-widest">
                    More Projects
                  </h3>
                  <p className="text-2xl font-black text-black uppercase tracking-tight mb-4">Coming Soon</p>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                  <p className="text-xs text-gray-400 mt-5 font-medium tracking-wider uppercase">
                    We're building something exciting
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="relative h-52 overflow-hidden bg-gray-900">
                <img loading="lazy" decoding="async" src="https://picsum.photos/seed/hrms-proj/600/300" alt="HRMS Platform" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <span className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">HR Tech</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black uppercase text-black mb-2 group-hover:text-gray-700 transition-colors">HRMS Platform</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  A full-featured Human Resource Management System built to streamline employee data, payroll, leave, and performance workflows.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["React", "Node.js", "PostgreSQL"].map(t => (
                    <span key={t} className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full border border-gray-200 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-500">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Internal Product</span>
                  <span className="text-xs font-bold text-black uppercase group-hover:underline">View →</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="relative h-52 overflow-hidden bg-gray-900">
                <img loading="lazy" decoding="async" src="https://picsum.photos/seed/erp-proj/600/300" alt="ERP System" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <span className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">Enterprise</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black uppercase text-black mb-2 group-hover:text-gray-700 transition-colors">ERP Suite</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  A modular Enterprise Resource Planning solution covering procurement, inventory, finance, and reporting in a unified dashboard.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Angular", "Python", "MongoDB"].map(t => (
                    <span key={t} className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full border border-gray-200 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-500">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Internal Product</span>
                  <span className="text-xs font-bold text-black uppercase group-hover:underline">View →</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="relative h-52 overflow-hidden bg-gray-900">
                <img loading="lazy" decoding="async" src="https://picsum.photos/seed/crm-proj/600/300" alt="CRM Tool" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <span className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">CRM</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black uppercase text-black mb-2 group-hover:text-gray-700 transition-colors">Smart CRM</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  An intelligent Customer Relationship Management tool with lead tracking, pipeline visualization, and automated follow-up workflows.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["React", "AWS", "MySQL"].map(t => (
                    <span key={t} className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full border border-gray-200 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-500">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Internal Product</span>
                  <span className="text-xs font-bold text-black uppercase group-hover:underline">View →</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="relative h-52 overflow-hidden bg-gray-900">
                <img loading="lazy" decoding="async" src="https://picsum.photos/seed/lms-proj/600/300" alt="LMS Platform" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <span className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">Ed Tech</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black uppercase text-black mb-2 group-hover:text-gray-700 transition-colors">LMS Platform</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  A Learning Management System enabling organizations to create, manage, and track employee training programs and certifications at scale.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Vue.js", "Django", "Redis"].map(t => (
                    <span key={t} className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full border border-gray-200 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-500">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Internal Product</span>
                  <span className="text-xs font-bold text-black uppercase group-hover:underline">View →</span>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="relative h-52 overflow-hidden bg-gray-900">
                <img loading="lazy" decoding="async" src="https://picsum.photos/seed/iot-dash/600/300" alt="IoT Dashboard" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <span className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">IoT</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black uppercase text-black mb-2 group-hover:text-gray-700 transition-colors">IoT Dashboard</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  A real-time IoT monitoring dashboard that visualizes sensor data, device health, and alert thresholds across distributed smart infrastructure.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["React", "MQTT", "InfluxDB"].map(t => (
                    <span key={t} className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full border border-gray-200 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-500">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Internal Product</span>
                  <span className="text-xs font-bold text-black uppercase group-hover:underline">View →</span>
                </div>
              </div>
            </div>

            {/* Card 6 — Coming Soon */}
            <div className="group relative bg-white rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-black transition-all duration-500 cursor-default flex items-center justify-center min-h-[340px]">
              <div className="text-center px-8 py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-black flex items-center justify-center mx-auto mb-6 transition-all duration-500">
                  <span className="text-3xl group-hover:animate-spin transition-all duration-500">⚙</span>
                </div>
                <h3 className="text-lg font-black uppercase text-gray-400 group-hover:text-black mb-3 transition-colors duration-500 tracking-widest">
                  More Projects
                </h3>
                <p className="text-2xl font-black text-black uppercase tracking-tight mb-4">Coming Soon</p>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
                <p className="text-xs text-gray-400 mt-5 font-medium tracking-wider uppercase">
                  We're building something exciting
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INDUSTRIES THAT WE CAN SERVE OUR SERVICE & FAQ SECTION */}

      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 uppercase text-black">
            INDUSTRIES THAT WE CAN SERVE OUR SERVICE
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-4xl mx-auto">
            Are you looking for top IT services companies for your next
            projects? Finding excellent IT support and service providers is no
            easy task. We Mindbrain Innovation providing 100+ software
            development and IT services at your doorsteps.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* FAQ Header Bar */}
          <div className="bg-[#4f5c64] w-full rounded-xl p-8 mb-6 shadow-md">
            <h2 className="text-3xl font-bold text-white uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column: FAQs */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className={`bg-[#4f5c64] rounded-xl p-6 shadow-md cursor-pointer transition-all overflow-hidden ${!isOpen ? 'hover:bg-[#596871] group' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className={`text-lg font-medium transition-colors ${isOpen ? 'text-white' : 'text-white group-hover:text-gray-100'}`}>
                        {faq.question}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-[#131618] flex items-center justify-center text-white flex-shrink-0 ml-4 transition-transform duration-300">
                        <span className="text-xl font-bold leading-none">{isOpen ? "-" : "+"}</span>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="mt-4 animate-fadeIn">
                        <div className="w-full h-px bg-white/20 mb-4"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Contact Form */}
            <div className="md:col-span-1 bg-[#4f5c64] rounded-xl p-8 shadow-md flex flex-col">
              <h2 className="text-lg font-bold text-white uppercase mb-4">
                ASK YOUR QUESTION
              </h2>
              <div className="w-full h-px bg-white/20 mb-8"></div>

              <form className="flex flex-col flex-grow">
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-[#131618] text-white placeholder-gray-500 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-[#131618] text-white placeholder-gray-500 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>

                <div className="mb-8 flex-grow">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-2">
                    YOUR QUESTION
                  </label>
                  <textarea
                    placeholder="Enter Your Question Here ....."
                    rows={4}
                    className="w-full bg-[#131618] text-white placeholder-gray-500 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none h-32"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white rounded-full py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1a1a1a] transition-colors mt-auto"
                >
                  SEND YOUR MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ITProductDevelopment;
