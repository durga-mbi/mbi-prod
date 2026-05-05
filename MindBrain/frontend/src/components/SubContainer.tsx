import React from "react";

const SubContainer: React.FC = () => {
    const socialCards = [
        {
            platform: "INSTAGRAM",
            description: "Share visually appealing snippets of our projects.",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z" />
                </svg>
            ),
        },
        {
            platform: "TWITTER",
            description: "Tweet about interesting coding challenges",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
            ),
        },
        {
            platform: "DRIBBBLE",
            description: "Showcase design elements of our web projects.",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.64 1.977 7.203 2.597-1.56 4.327-4.417 4.407-7.665v-.1zM16.4 21.65c-.15-.815-.75-3.86-2.193-7.61-.03.01-.06.01-.092.022-4.904 1.636-6.68 5.132-7.05 5.923 1.403.955 3.1 1.523 4.935 1.523 1.59 0 3.064-.44 4.333-1.197l.067-.06zm-10.8-2.65c.44-.8 2.44-4.09 7.07-5.467.14-.04.288-.076.436-.107-.15-.36-.31-.72-.475-1.077-4.43 1.258-8.86.992-9.613.935A11.838 11.838 0 001.2 12c0 2.65 1.05 5.05 2.768 6.83l.142.17zm-.51-11.41c.8.06 4.67.24 8.7 1.173.34-.69.65-1.4.92-2.13-2.61-1.03-5.07-2.82-6.52-4.04-.99.71-1.83 1.61-2.48 2.64v.357zm10.28-4.22c1.42 1.18 3.73 2.87 6.07 3.86a11.96 11.96 0 00-3.32-4.8 11.976 11.976 0 00-2.75.94zm2.18 5.61c-2.12-.92-4.14-2.42-5.41-3.51-.31.79-.65 1.61-1.01 2.44 1.4.38 2.87.65 4.37.81 1.89.21 3.64.12 5.09-.07a11.94 11.94 0 00-2.8-1.51l-.24.16.01-.1-.01-.02z" />
                </svg>
            ),
        },
        {
            platform: "BEHANCE",
            description: "Create detailed presentations for our projects.",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 7h-7v-2h7v2zm.866 2.502c-.37-.803-1.043-1.436-2.021-1.899-.979-.462-2.164-.693-3.555-.693-1.196 0-2.261.197-3.193.591-.933.394-1.688.948-2.268 1.663-.579.715-.992 1.564-1.238 2.547s-.369 2.035-.369 3.155c0 1.111.127 2.148.38 3.111.253.963.666 1.794 1.239 2.493.573.699 1.319 1.235 2.239 1.609.919.374 2.008.561 3.268.561 1.156 0 2.179-.168 3.07-.503s1.614-.814 2.173-1.439c.558-.624.965-1.378 1.222-2.26.257-.882.385-1.854.385-2.916v-.667h-6.903c.01-.849.19-1.547.538-2.094.349-.547.939-.82 1.771-.82.52 0 .919.108 1.196.325.278.216.48.487.607.812h2.593zm-5.574 5.378h4.204c-.031.571-.165 1.05-.404 1.437-.239.387-.589.673-1.051.86s-1.025.28-1.691.28c-.802 0-1.401-.225-1.797-.674-.395-.449-.607-1.116-.637-2.001l-.024.098zm-11.292-6.88h-3.5v3.5h3.196c.607 0 1.05-.125 1.332-.375.281-.251.422-.601.422-1.052 0-.422-.128-.75-.386-.983-.257-.233-.611-.35-1.064-.35v-.74zm3.83 5.467c.394-.436.591-1 .591-1.693 0-.441-.09-.844-.27-1.206s-.461-.676-.843-.941-.88-.475-1.493-.63c-.613-.155-1.353-.232-2.22-.232h-6.167v14.167h6.611c1.07 0 1.956-.129 2.658-.388s1.259-.624 1.67-1.094.704-1.042.879-1.714.262-1.438.262-2.298c0-1.09-.232-2-.693-2.731l-.285-.24zm-3.13 4.806c-.328.271-.812.406-1.453.406h-3.247v-4.167h3.111c.715 0 1.246.126 1.594.378.348.252.522.642.522 1.168 0 .493-.176.861-.527 1.105v1.11z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="bg-[#0a0c10] pt-12 pb-8 px-4 sm:px-6 lg:px-20 text-white font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Social Cards (Small cards) */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 col-span-1 md:col-span-2">
                        {socialCards.map((card, idx) => (
                            <div
                                key={idx}
                                className="bg-[#14161a] p-6 rounded-[24px] group hover:bg-[#1c1f24] transition-all duration-300 relative flex flex-col justify-between aspect-square md:aspect-auto min-h-[180px]"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="bg-[#1c1f24] p-3 rounded-xl group-hover:bg-[#25282e] transition-colors">
                                        {card.icon}
                                    </div>
                                    <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                        <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[13px] font-bold tracking-widest mb-2 text-white/90">{card.platform}</h3>
                                    <p className="text-[13px] text-gray-500 leading-snug">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Links Card (Large) */}
                    <div className="bg-[#14161a] p-8 md:p-10 rounded-[24px] col-span-1 md:col-span-2 flex flex-col justify-between">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                            <div>
                                <ul className="space-y-4">
                                    <li><a href="#" className="text-[15px] font-bold tracking-wider hover:text-[#00c2ff] transition-colors">HOME</a></li>
                                    <li><a href="#" className="text-[15px] font-bold tracking-wider hover:text-[#00c2ff] transition-colors">ABOUT</a></li>
                                    <li><a href="#" className="text-[15px] font-bold tracking-wider hover:text-[#00c2ff] transition-colors">OUR CLIENT</a></li>
                                    <li><a href="#" className="text-[15px] font-bold tracking-wider hover:text-[#00c2ff] transition-colors">CAREERS</a></li>
                                    <li><a href="#" className="text-[15px] font-bold tracking-wider hover:text-[#00c2ff] transition-colors">CONTACT</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold tracking-widest text-[#00c2ff] mb-6">SERVICES</h4>
                                <ul className="space-y-4">
                                    <li><a href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">It Product Devlopment</a></li>
                                    <li><a href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Main Power Outsourcing</a></li>
                                    <li><a href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">IOT Solution</a></li>
                                    <li><a href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Software Training</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold tracking-widest text-[#00c2ff] mb-6">PROJECTS</h4>
                                <ul className="space-y-4">
                                    <li><a href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Project Name</a></li>
                                    <li><a href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Project Name</a></li>
                                    <li><a href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Project Name</a></li>
                                    <li><a href="#" className="text-[14px] text-gray-400 hover:text-white transition-colors">Project Name</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Spacer if needed or Newsletter spans more */}
                    <div className="hidden md:block col-span-2"></div>

                    {/* Newsletter Card (Large bottom right) */}
                    <div className="bg-[#14161a] p-8 md:p-10 rounded-[24px] col-span-1 md:col-span-2 flex flex-col justify-between">
                        <div>
                            <span className="text-[11px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-4 block">NEWSLETTER</span>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">SUBSCRIBE TO OUR NEWSLETTER</h2>
                        </div>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent border-b border-white/20 pb-4 text-lg focus:outline-none focus:border-[#00c2ff] transition-colors placeholder:text-gray-600"
                            />
                            <button className="absolute right-0 top-0 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all group-hover:border-[#00c2ff]">
                                <svg className="w-5 h-5 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-[#14161a] px-8 py-6 rounded-[24px] flex flex-col sm:flex-row items-center justify-between text-gray-500 text-[13px] tracking-wider">
                    <div className="mb-4 sm:mb-0">
                        &copy; 2024. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                        <div className="w-[1px] h-4 bg-white/10 hidden sm:block"></div>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubContainer;