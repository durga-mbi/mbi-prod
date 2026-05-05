import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/mindbrain-logo.webp";
import { ChevronRight } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileMenus, setOpenMobileMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();
  // const navigate = useNavigate();

  const toggleMobileMenu = (menuName: string) => {
    setOpenMobileMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const navBgColor = "bg-[#0A111A]/95";
  // const topBarBgColor = "bg-[#171D26]";
  const borderOpacity = "border-white/5";

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Our Client", href: "/client" },
    { name: "Our Projects", href: "/ourprojects" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contactus" },
    { name: "More" , href: "#", hasDropdown: true }
  ];

  // const socialIcons = [
  //   {
  //     name: "Facebook",
  //     icon: (
  //       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
  //         <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  //       </svg>
  //     ),
  //     href: "#"
  //   },
  //   {
  //     name: "Instagram",
  //     icon: (
  //       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
  //         <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16.25a4.088 4.088 0 110-8.176 4.088 4.088 0 010 8.176zm5.885-11.433a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
  //       </svg>
  //     ),
  //     href: "#"
  //   },
  //   {
  //     name: "Twitter",
  //     icon: (
  //       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
  //         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  //       </svg>
  //     ),
  //     href: "#"
  //   },
  //   {
  //     name: "LinkedIn",
  //     icon: (
  //       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
  //         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  //       </svg>
  //     ),
  //     href: "https://www.linkedin.com/company/mindbrain/posts/?feedView=all"
  //   }
  // ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top Bar */}
      {/* <div className={`${topBarBgColor} text-white py-2 border-b ${borderOpacity}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div> */}
          {/* <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              className="bg-white text-black rounded-sm py-1 px-3 pr-8 text-xs focus:outline-none w-48 lg:w-64"
            />
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div> */}
        {/* </div>
      </div> */}

      {/* Main Bar */}
      <div className={`${navBgColor} backdrop-blur-md text-white border-b ${borderOpacity} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer group">
              <div className="border border-white/10 p-1 group-hover:border-white/20 transition-colors bg-white">
                <img
                  loading="lazy"
                  decoding="async"
                  src={logo}
                  alt="MindBrain Logo"
                  className="h-8 md:h-12 w-auto object-contain brightness-100"
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-6">
              <div className="flex items-center space-x-1">
                {menuItems.map((item) =>
                  item.name === "Services" ? (
                    <div key={item.name} className="relative group/nav">
                      <button className="px-3 py-2 text-[14px] font-semibold transition-colors hover:text-gray-400 flex items-center gap-1 cursor-pointer focus:outline-none uppercase">
                        {item.name}
                        {item.hasDropdown && (
                          <svg className={`w-3 h-3 mt-0.5 transition-transform group-hover/nav:rotate-180`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>
                      <div className="absolute left-0 mt-0 pt-2 w-64 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 z-50">
                        <div className="bg-[#171D26] border border-white/10 rounded-md shadow-lg py-2 flex flex-col">
                          <Link to="/services/it-product-development" className="px-4 py-3 text-sm text-gray-300 hover:text-gray-400 hover:bg-white/5 transition-colors flex justify-between items-center group/item">
                             <span>IT Product Development</span>
                             {/* <ChevronRight size={16} className="opacity-0 group-hover/item:opacity-100 transition-opacity" /> */}
                          </Link>
                          {/* Manpower Outsourcing nested submenu */}
                          <div className="relative group/manpower">
                            <div className="px-4 py-3 text-sm text-gray-300 hover:text-gray-400 hover:bg-white/5 transition-colors flex justify-between items-center cursor-pointer">
                              <span>Manpower Outsourcing</span>
                              <ChevronRight size={16} className="transition-transform group-hover/manpower:translate-x-0.5" />
                            </div>
                            {/* Nested flyout — appears to the right */}
                            <div className="absolute left-full top-0 ml-1 w-52 opacity-0 invisible group-hover/manpower:opacity-100 group-hover/manpower:visible transition-all duration-200 z-50">
                              <div className="bg-[#171D26] border border-white/10 rounded-md shadow-lg py-2 flex flex-col">
                                <Link to="/services/manpower-outsourcing" className="px-4 py-2.5 text-xs text-gray-400 hover:text-gray-400 hover:bg-white/5 transition-colors flex justify-between items-center group/sub uppercase tracking-wide font-semibold">
                                  <span>Overview</span>
                                  {/* <ChevronRight size={14} className="opacity-0 group-hover/sub:opacity-100 transition-opacity" /> */}
                                </Link>
                                <div className="mx-4 border-t border-white/10 my-1" />
                                <Link to="/services/manpower-outsourcing/it-staffing" className="px-4 py-2.5 text-sm text-gray-300 hover:text-gray-400 hover:bg-white/5 transition-colors flex justify-between items-center group/sub">
                                  <span>IT Staffing</span>
                                  {/* <ChevronRight size={14} className="opacity-0 group-hover/sub:opacity-100 transition-opacity" /> */}
                                </Link>
                                <Link to="/services/manpower-outsourcing/not-it-staffing" className="px-4 py-2.5 text-sm text-gray-300 hover:text-gray-400 hover:bg-white/5 transition-colors flex justify-between items-center group/sub">
                                  <span>Non-IT Staffing</span>
                                  {/* <ChevronRight size={14} className="opacity-0 group-hover/sub:opacity-100 transition-opacity" /> */}
                                </Link>
                              </div>
                            </div>
                          </div>
                          <Link to="/services/iot-solution" className="px-4 py-3 text-sm text-gray-300 hover:text-gray-400 hover:bg-white/5 transition-colors flex justify-between items-center group/item">
                             <span>IoT Solution</span>
                             {/* <ChevronRight size={16} className="opacity-0 group-hover/item:opacity-100 transition-opacity" /> */}
                          </Link>
                          <Link to="/services/software-training" className="px-4 py-3 text-sm text-gray-300 hover:text-gray-400 hover:bg-white/5 transition-colors flex justify-between items-center group/item">
                             <span>Training &amp; Placement</span>
                             {/* <ChevronRight size={16} className="opacity-0 group-hover/item:opacity-100 transition-opacity" /> */}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : item.name === "More" ? (
                    <div key={item.name} className="relative group">
                      <button className="px-3 py-2 text-[14px] font-semibold transition-colors hover:text-gray-400 flex items-center gap-1 cursor-pointer focus:outline-none uppercase">
                        {item.name}
                        {item.hasDropdown && (
                          <svg className={`w-3 h-3 mt-0.5 transition-transform group-hover:rotate-180`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>
                      <div className="absolute left-0 mt-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="bg-[#171D26] border border-white/10 rounded-md shadow-lg py-2">
                          <a href="https://www.mindbotics.in/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-300 hover:text-gray-400 hover:bg-white/5 uppercase transition-colors">Mindbotics</a>
                          {/* <a href="https://mindbrain.co.in/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-300 hover:text-gray-400 hover:bg-white/5 uppercase transition-colors">Mindbrain</a> */}
                          <a href="https://mindbrainsphere.com/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-300 hover:text-gray-400 hover:bg-white/5 uppercase transition-colors">Mindbrain Sphere</a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 text-[14px] font-semibold transition-colors flex items-center gap-1 uppercase ${
                        location.pathname === item.href ? "text-gray-400" : "hover:text-gray-400"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-400 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0a111a] border-t border-white/10 shadow-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) =>
              item.name === "Services" ? (
                <div key={item.name} className="w-full">
                  <button 
                    onClick={() => toggleMobileMenu(item.name)}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white uppercase flex justify-between items-center focus:outline-none"
                  >
                    {item.name}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${openMobileMenus[item.name] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`pl-6 flex-col gap-3 pb-2 pt-1 border-l border-white/10 ml-4 mb-2 overflow-hidden transition-all duration-300 ${openMobileMenus[item.name] ? 'max-h-64 flex opacity-100' : 'max-h-0 opacity-0 hidden'}`}>
                    <Link to="/services/it-product-development" onClick={() => setIsMenuOpen(false)} className="block text-sm text-gray-400 hover:text-gray-400 uppercase transition-colors">IT Product Development</Link>
                    {/* Manpower Outsourcing nested accordion */}
                    <div>
                      <button
                        onClick={() => toggleMobileMenu('manpower')}
                        className="flex items-center justify-between w-full text-sm text-gray-400 hover:text-gray-400 uppercase transition-colors focus:outline-none"
                      >
                        <span>Manpower Outsourcing</span>
                        <svg className={`w-3 h-3 transition-transform duration-300 ${openMobileMenus['manpower'] ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className={`pl-4 flex-col gap-2 pt-2 border-l border-white/10 ml-1 overflow-hidden transition-all duration-300 ${openMobileMenus['manpower'] ? 'max-h-40 flex opacity-100' : 'max-h-0 opacity-0 hidden'}`}>
                        <Link to="/services/manpower-outsourcing" onClick={() => setIsMenuOpen(false)} className="block text-xs text-gray-500 hover:text-gray-400 uppercase transition-colors">Overview</Link>
                        <Link to="/services/manpower-outsourcing/it-staffing" onClick={() => setIsMenuOpen(false)} className="block text-xs text-gray-500 hover:text-gray-400 uppercase transition-colors">IT Staffing</Link>
                        <Link to="/services/manpower-outsourcing/not-it-staffing" onClick={() => setIsMenuOpen(false)} className="block text-xs text-gray-500 hover:text-gray-400 uppercase transition-colors">Not IT Staffing</Link>
                      </div>
                    </div>
                    <Link to="/services/iot-solution" onClick={() => setIsMenuOpen(false)} className="block text-sm text-gray-400 hover:text-gray-400 uppercase transition-colors">IoT Solution</Link>
                    <Link to="/services/software-training" onClick={() => setIsMenuOpen(false)} className="block text-sm text-gray-400 hover:text-gray-400 uppercase transition-colors">Training &amp; Placement</Link>
                  </div>
                </div>
              ) : item.name === "More" ? (
                <div key={item.name} className="w-full">
                  <button 
                    onClick={() => toggleMobileMenu(item.name)}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white uppercase flex justify-between items-center focus:outline-none"
                  >
                    {item.name}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${openMobileMenus[item.name] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`pl-6 flex-col gap-3 pb-2 pt-1 overflow-hidden transition-all duration-300 ${openMobileMenus[item.name] ? 'max-h-64 flex opacity-100' : 'max-h-0 opacity-0 hidden'}`}>
                    <a href="https://www.mindbotics.in/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-gray-400 uppercase transition-colors">Mindbotics</a>
                    {/* <a href="https://mindbrain.co.in/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-gray-400 uppercase transition-colors">Mindbrain</a> */}
                    <a href="https://mindbrainsphere.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-gray-400 uppercase transition-colors">Mindbrain Sphere</a>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors uppercase ${
                    location.pathname === item.href ? "text-gray-400" : "text-white hover:text-gray-400"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
