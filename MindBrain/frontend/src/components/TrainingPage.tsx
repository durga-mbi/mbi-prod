import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccordionItem = ({ title, content }: { title: string, content: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-[#4f5c64] rounded-lg shadow-md cursor-pointer transition-all mb-4 overflow-hidden border border-gray-600/30">
        <div 
            className="p-5 flex justify-between items-center group hover:bg-[#596871]"
            onClick={() => setIsOpen(!isOpen)}
        >
            <h3 className="text-sm font-semibold text-white group-hover:text-gray-100">{title}</h3>
            <div className="w-6 h-6 rounded-full bg-[#131618] flex items-center justify-center text-white flex-shrink-0 ml-4 group-hover:bg-black transition-colors">
                <span className="text-lg font-bold leading-none mb-0.5">{isOpen ? '-' : '+'}</span>
            </div>
        </div>
        {isOpen && (
            <div className="px-5 pb-5 pt-0">
                <div className="w-full h-px bg-white/10 mb-4"></div>
                <div className="text-gray-300 text-xs leading-relaxed pl-4 font-normal">
                    {content}
                </div>
            </div>
        )}
    </div>
  );
};

export interface Feature {
  name: string;
  icon: React.ReactNode;
  active: boolean;
}

export interface Module {
  title: string;
  content: React.ReactNode;
}

export interface TrainingPageProps {
  heroTitle: string;
  breadcrumbTitle: string;
  contentTitle: string;
  contentText: React.ReactNode;
  illustrationImage: string;
  whyLearnTitle: string;
  whyLearnText: React.ReactNode;
  features: Feature[];
  courseDetailsTitle: string;
  frontEndTitle: string;
  backEndTitle: string;
  frontEndModules: Module[];
  backEndModules: Module[];
}

const TrainingPage: React.FC<TrainingPageProps> = ({
  heroTitle,
  breadcrumbTitle,
  contentTitle,
  contentText,
  illustrationImage,
  whyLearnTitle,
  whyLearnText,
  features,
  courseDetailsTitle,
  frontEndTitle,
  backEndTitle,
  frontEndModules,
  backEndModules,
}) => {
  return (
    <div className="w-full bg-[#f6f6f6] font-['Poppins'] text-gray-900">
      {/* HERO SECTION */}
      <section className="bg-[#171D26] text-white pt-36 pb-20 text-center relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight uppercase">
          {heroTitle}
        </h1>

        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-normal tracking-wide">
          <Link to="/" className="flex flex-row gap-2 hover:text-white transition">
            <Home size={20} className="text-white" />
          </Link>
          <span className="opacity-60 text-lg">{'>'}</span>
          <span className="opacity-90">Services</span>
          <span className="opacity-60 text-lg">{'>'}</span>
          <span className="opacity-90">Software training</span>
          <span className="opacity-60 text-lg">{'>'}</span>
          <span className="opacity-90">{breadcrumbTitle}</span>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
            <div>
            <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-black flex items-center relative">
                <div className="absolute right-[-4px] w-2 h-2 border-t-2 border-r-2 border-black transform rotate-45"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-tight">
                {contentTitle}
                </h2>
            </div>
            <div className="text-gray-500 leading-relaxed text-sm font-normal space-y-4">
                {contentText}
            </div>
            </div>

            <div className="relative flex justify-center">
            <img
                loading="lazy"
                decoding="async"
                src={illustrationImage}
                alt={breadcrumbTitle}
                className="w-full max-w-md object-contain rounded-2xl shadow-xl"
            />
            </div>
          </div>
      </section>

      {/* WHY LEARN SECTION */}
      <section className="bg-gradient-to-b from-[#4a555c] to-[#171D26] text-white py-24 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 uppercase tracking-widest">
            {whyLearnTitle}
          </h2>
          <div className="text-gray-300 text-sm leading-relaxed font-normal space-y-4">
            {whyLearnText}
          </div>
        </div>
      </section>

      {/* FEATURES ROW SECTION */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-items-center mb-10">
            {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                <div 
                    className={`w-36 h-36 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-105 border-2 ${
                    feature.active 
                        ? "bg-[#252a2e] border-[#252a2e] text-white shadow-2xl" 
                        : "bg-white border-gray-400 text-gray-600 shadow-lg hover:border-[#252a2e]"
                    }`}
                >
                    {feature.icon}
                </div>
                <h3 className="font-bold text-sm text-black uppercase max-w-[120px] leading-tight text-center">
                    {feature.name.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                        {word}
                        {i !== feature.name.split(' ').length - 1 && <br />}
                    </React.Fragment>
                    ))}
                </h3>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* COURSE DETAILS SECTION */}
      <section className="bg-gray-50 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
            <div className="bg-[#4f5c64] w-full rounded-xl p-6 mb-10 shadow-md border border-gray-600/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase px-2 text-center md:text-left">
                {courseDetailsTitle}
            </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div>
                    <h3 className="text-xl font-bold text-black uppercase mb-6 flex items-center px-2">
                    {frontEndTitle}
                    </h3>
                    <div className="flex flex-col">
                        {frontEndModules.map((module, idx) => (
                            <AccordionItem key={`front-${idx}`} title={module.title} content={module.content} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-black uppercase mb-6 flex items-center px-2">
                    {backEndTitle}
                    </h3>
                    <div className="flex flex-col">
                        {backEndModules.map((module, idx) => (
                            <AccordionItem key={`back-${idx}`} title={module.title} content={module.content} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ASK YOUR QUESTION FORM */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 md:p-12 border border-gray-100">
            <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-6">
              ASK YOUR QUESTION
            </h2>
            <div className="w-full h-[1px] bg-gray-200 mb-8"></div>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We will get back to you soon."); }}>
              <div>
                <label className="block text-[11px] font-bold text-black uppercase tracking-widest mb-3">
                  NAME
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter your name"
                  className="w-full bg-[#fafafa] text-gray-800 placeholder-gray-400 rounded-md px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 border border-gray-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-black uppercase tracking-widest mb-3">
                  EMAIL
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email"
                  className="w-full bg-[#fafafa] text-gray-800 placeholder-gray-400 rounded-md px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 border border-gray-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-black uppercase tracking-widest mb-3">
                  YOUR QUESTION
                </label>
                <textarea 
                  required
                  placeholder="Enter Your Question Here ....."
                  rows={4}
                  className="w-full bg-[#fafafa] text-gray-800 placeholder-gray-400 rounded-md px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none h-32 border border-gray-100"
                ></textarea>
              </div>

              <div className="mt-4 flex justify-center">
                <button 
                  type="submit" 
                  className="bg-[#3a3f42] text-white rounded-full px-12 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
                >
                  SEND YOUR MESSAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingPage;
