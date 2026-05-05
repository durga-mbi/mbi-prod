import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  UploadCloud,
  X,
  CheckCircle,
  TrendingUp,
  Users,
  BookOpen,
  Briefcase,
  ShieldCheck,
  FileText
} from "lucide-react";

import paypalLogo from '../assets/paypal.webp';
import swiggyLogo from "../assets/swiggy.webp";
import infosysLogo from "../assets/infosys.webp";
import honeywellLogo from "../assets/honeywell.webp";
import deloitteLogo from "../assets/deloitte.webp";
import veltrisLogo from "../assets/veltris.webp";
import atosLogo from "../assets/atos.webp";
import { apiPost, type ApiResponse, type CareerPayload, ApiError } from "../api/api";

// --- DUMMY DATA ---
const JOB_TITLES = [
  "Frontend Engineer",
  "Java Full Stack Developer",
  "Prompt Engineer",
  "UI/UX Designer",
  "Backend Developer",
  "Data Scientist"
];

const REASONS = [
  { title: "Growth Opportunities", desc: "Clear career paths and continuous advancement tailored to your pace.", icon: <TrendingUp size={24} className="text-gray-900" /> },
  { title: "Real-World Projects", desc: "Work on high-impact projects that actively shape modern industries.", icon: <Briefcase size={24} className="text-gray-900" /> },
  { title: "Learning Environment", desc: "Open access to courses, robust certifications, and dedicated mentorship.", icon: <BookOpen size={24} className="text-gray-900" /> },
  { title: "Flexible Culture", desc: "A mature work-life balance supporting remote and hybrid models.", icon: <Users size={24} className="text-gray-900" /> },
];

const PROCESS = [
  { step: "01", title: "Application Review", desc: "We review your CV and portfolio carefully against role requirements." },
  { step: "02", title: "Technical Interview", desc: "A practical deep dive into your technical skills and problem solving." },
  { step: "03", title: "HR Round", desc: "A friendly discussion covering cultural fit, expectations, and benefits." },
  { step: "04", title: "Offer Extended", desc: "Welcome to the MindBrain Innovation family! Your journey begins." },
];

// --- LOGOS (Placeholders via UI elements) ---
const CLIENT_LOGOS = [
  { name: "PayPal", src: paypalLogo },
  { name: "Swiggy", src: swiggyLogo },
  { name: "Infosys", src: infosysLogo },
  { name: "Honeywell", src: honeywellLogo },
  { name: "Deloitte", src: deloitteLogo },
  { name: "Veltris", src: veltrisLogo },
  { name: "Atos", src: atosLogo },
];

const alphabetPattern = /^[A-Za-z]+$/;
const digitsOnlyPattern = /^\d+$/;
const limitPhoneDigits = (value: string) => value.replace(/\D/g, "").slice(0, 10);

const validatePhoneNumber = (value: string): string | null => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Phone number is required.";
  }

  if (!digitsOnlyPattern.test(trimmedValue)) {
    return "Phone number must contain only numbers.";
  }

  if (trimmedValue.length !== 10) {
    return "Phone number must be exactly 10 digits long.";
  }

  if (!/^[6789]/.test(trimmedValue)) {
    return "Phone number must start with 6, 7, 8, or 9.";
  }

  if (/^(\d)\1{9}$/.test(trimmedValue)) {
    return "Enter a valid phone number.";
  }

  return null;
};

const Careers = () => {
  // const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    portfolioUrl: "",
    consent: false,
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form Handlers
  useEffect(() => {
    if (submitError) {
      const timer = setTimeout(() => setSubmitError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [submitError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else if (name === "phone") {
      setForm({ ...form, phone: limitPhoneDigits(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
    // Clear error on change
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: null }));
    }
  };

  // Skill Tags Handlers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = skillInput.trim();
      if (val && !skills.includes(val)) {
        setSkills([...skills, val]);
        setSkillInput("");
      }
    }
  };
  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Drag and Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileValidations(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileValidations(e.target.files[0]);
    }
  };

  const handleFileValidations = (uploadedFile: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(uploadedFile.type)) {
      setErrors((current) => ({ ...current, file: "Format must be PDF, DOC, or DOCX" }));
      return;
    }
    if (uploadedFile.size > 5 * 1024 * 1024) {
      setErrors((current) => ({ ...current, file: "File size must be under 5MB" }));
      return;
    }
    setFile(uploadedFile);
    setErrors((current) => ({ ...current, file: null }));
  };

  const removeFile = () => setFile(null);

  const fileToBase64 = (uploadedFile: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result.split(",")[1] ?? "");
        } else {
          reject(new Error("Unable to read the selected file."));
        }
      };
      reader.onerror = () => reject(new Error("Unable to read the selected file."));
      reader.readAsDataURL(uploadedFile);
    });

  // Validation
  const validate = () => {
    const newErrors: Record<string, string> = {};
    const trimmedFullName = form.fullName.trim();
    const nameParts = trimmedFullName.split(/\s+/).filter(Boolean);

    if (!trimmedFullName) {
      newErrors.fullName = "First name and last name are required";
    } else if (nameParts.length < 2) {
      newErrors.fullName = "Please enter both first name and last name";
    } else if (!nameParts.every((part) => alphabetPattern.test(part))) {
      newErrors.fullName = "First name and last name must contain only alphabets";
    }

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email is required";
    const phoneError = validatePhoneNumber(form.phone);
    if (phoneError) newErrors.phone = phoneError;
    if (!form.position) newErrors.position = "Please select a position";
    if (!form.experience) newErrors.experience = "Experience is required";
    if (!file) newErrors.file = "Resume upload is required";
    if (!form.consent) newErrors.consent = "You must agree to the privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validate() || !file) {
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const resumeBase64 = await fileToBase64(file);

      await apiPost<ApiResponse<{ id: string }>>("/careers", {
        ...form,
        portfolioUrl: form.portfolioUrl.trim(),
        skills,
        resume: {
          fileName: file.name,
          mimeType: file.type,
          size: file.size,
          data: resumeBase64,
        },
      } satisfies CareerPayload);

      setIsSuccess(true);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        portfolioUrl: "",
        consent: false,
      });
      setSkills([]);
      setSkillInput("");
      setFile(null);
      setErrors({});
    } catch (error) {
      if (error instanceof ApiError && error.status === 429 && error.data) {
        if (error.data.remainingDays !== undefined) {
          const remaining = error.data.remainingDays;
          const prevDateRaw = error.data.previousSubmissionDate;
          let formattedDate = "[date]";
          if (prevDateRaw) {
            formattedDate = new Date(prevDateRaw).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
          }
          setSubmitError(`You already submitted your application on ${formattedDate}. You can apply again after ${remaining} days.`);
        } else {
          setSubmitError(error.message || "Too many requests. Please try again later.");
        }
      } else {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Unable to submit your application right now."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#fcfcfc] font-['Poppins'] text-gray-900 pb-20">
      
      {/* 1. Header & Navigation Context */}
      <section className="pt-36 pb-20 bg-[#171D26] text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4">
          Careers
        </h1>
        <div className="flex justify-center items-center gap-2 text-sm text-gray-300">
          <Link
            to="/"
            className="flex items-center hover:text-white transition-colors"
          >
            <Home size={18} />
          </Link>
          <span className="opacity-60 text-lg">{">"}</span>
          <span className="opacity-90">Careers</span>
        </div>
      </section>

      {/* 2. ADVANCED APPLICATION FORM */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        {isSuccess ? (
          <div className="bg-white rounded-md shadow-sm p-12 text-center border border-gray-200">
            <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={36} className="text-black" />
            </div>
            <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Application Submitted</h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto mb-8">
              Thank you for exploring a career with MindBrain Innovation. Our HR team will carefully review your profile and contact you shortly.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-8 md:p-14 border border-gray-100">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-black tracking-tight uppercase">Personal Details</h2>
              <div className="h-[2px] w-12 bg-gray-800 mx-auto mt-3 mb-4"></div>
              <p className="text-gray-500 text-sm">Please provide accurate information for our recruitment team.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {submitError && (
                <div className={`fixed top-24 right-5 md:right-10 z-50 flex items-center shadow-2xl rounded-md border px-6 py-4 text-sm font-medium animate-in slide-in-from-top-5 fade-in duration-300 ${
                  submitError.includes("already submitted") 
                    ? "border-amber-200 bg-amber-50 text-amber-800" 
                    : "border-red-200 bg-red-50 text-red-700"
                }`}>
                  <span>{submitError}</span>
                  <button onClick={() => setSubmitError(null)} className="ml-4 opacity-70 hover:opacity-100">
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name *</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="E.g. John Doe"
                    className="w-full p-4 rounded-md bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder-gray-400"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address *</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full p-4 rounded-md bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder-gray-400"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className="w-full p-4 rounded-md bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder-gray-400"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Target Position *</label>
                  <select
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    className={`w-full p-4 rounded-md bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all ${form.position ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    <option value="">-- Choose Role --</option>
                    {JOB_TITLES.map(title => (
                      <option key={title} value={title} className="text-gray-900">{title}</option>
                    ))}
                    <option value="Other" className="text-gray-900">Other / Spontaneous Application</option>
                  </select>
                  {errors.position && <p className="text-red-500 text-xs mt-2">{errors.position}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Years of Experience *</label>
                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className={`w-full p-4 rounded-md bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all ${form.experience ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    <option value="">-- Select --</option>
                    <option value="Fresher" className="text-gray-900">Fresher (0 years)</option>
                    <option value="1-3" className="text-gray-900">1 - 3 Years</option>
                    <option value="3-5" className="text-gray-900">3 - 5 Years</option>
                    <option value="5+" className="text-gray-900">5+ Years</option>
                  </select>
                  {errors.experience && <p className="text-red-500 text-xs mt-2">{errors.experience}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Portfolio / GitHub Link</label>
                  <input
                    name="portfolioUrl"
                    value={form.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full p-4 rounded-md bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Skills Tag Input */}
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Core Skills (Press Enter to add)</label>
                <div className="w-full p-2.5 rounded-md bg-gray-50 border border-gray-200 focus-within:bg-white focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all flex flex-wrap gap-2 items-center min-h-[60px]">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-gray-200 text-black px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 border border-gray-300 shadow-sm">
                      {skill}
                      <button type="button" onClick={() => removeSkill(idx)} className="hover:text-gray-600 focus:outline-none">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={skills.length === 0 ? "e.g. React, Node.js, Python..." : ""}
                    className="flex-grow bg-transparent outline-none p-1 min-w-[150px] text-sm text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Advanced Drag & Drop Resume */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-800">Upload Resume *</label>
                  <span className="text-xs text-gray-400">Max 5MB (PDF/DOCX)</span>
                </div>
                
                <div 
                  className={`w-full relative border-2 border-dashed rounded-md p-8 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] ${
                    dragActive ? "border-black bg-gray-50" : "border-gray-200 bg-gray-50/50 hover:bg-gray-100/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  
                  {file ? (
                    <div className="flex flex-col items-center relative z-20">
                      <div className="w-14 h-14 bg-white border border-gray-200 text-black rounded-full flex items-center justify-center mb-3 shadow-sm">
                        <FileText size={24} />
                      </div>
                      <p className="text-gray-900 font-semibold mb-1 truncate max-w-[200px] text-sm">{file.name}</p>
                      <p className="text-gray-400 text-xs mb-3 font-mono">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      <button 
                        type="button" 
                        onClick={(e) => { e.preventDefault(); removeFile(); }}
                        className="text-gray-900 text-xs font-semibold hover:text-red-600 flex items-center gap-1 transition-colors z-30 relative"
                      >
                       Remove and Upload Different File
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center pointer-events-none">
                      <div className="w-12 h-12 bg-white border border-gray-200 text-gray-400 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <UploadCloud size={20} />
                      </div>
                      <p className="text-gray-700 font-medium mb-1 text-sm">Drag and drop your file here</p>
                      <p className="text-gray-400 text-xs">or click to browse files</p>
                    </div>
                  )}
                </div>
                {errors.file && <p className="text-red-500 text-xs mt-2">{errors.file}</p>}
              </div>

              {/* Privacy & Consent */}
              <div className="bg-gray-50 p-5 rounded-md border border-gray-200 mt-8">
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    <input 
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      I agree to the processing of my personal data according to the <a href="#" className="text-black font-semibold hover:underline">Privacy Policy</a>. I understand my CV is stored securely and reviewed solely for recruitment.
                      <ShieldCheck size={14} className="inline ml-1.5 text-black opacity-80" />
                    </p>
                    {errors.consent && <p className="text-red-500 text-xs mt-2">{errors.consent}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-xs text-gray-400 font-medium">
                  * Note: Submissions are routed to MindBrain securely.
                </span>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-black text-white px-10 py-3.5 rounded-md font-bold tracking-wide hover:bg-gray-800 transition-all shadow-md disabled:bg-gray-300 disabled:text-gray-500 flex items-center justify-center min-w-[200px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
                      Processing
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>            
          </div>
        )}
      </section>

      {/* 3. WHY JOIN US */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-200">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-black uppercase">Why Join Us</h2>
          <div className="h-[2px] w-12 bg-gray-800 mx-auto mt-3 mb-4"></div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Discover a workplace designed around minimalism and impact. We nurture steady career progression, prioritizing your professional growth and well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REASONS.map((reason, idx) => (
            <div key={idx} className="bg-white p-6 rounded-md shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 hover:border-gray-800 transition-all duration-300 flex items-start gap-5">
              <div className="bg-gray-50 p-3 rounded border border-gray-100 shrink-0">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRUST ELEMENTS & STATS */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stats Box */}
          <div className="col-span-1 md:col-span-3 bg-black rounded-md p-10 flex flex-col md:flex-row justify-around items-center gap-8 shadow-xl">
            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-white mb-1 tracking-tight">100+</h3>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Developers Trained</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-800"></div>
            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-white mb-1 tracking-tight">50+</h3>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Projects Delivered</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-800"></div>
            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-white mb-1 tracking-tight">10+</h3>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Awards Won</p>
            </div>
          </div>
          
          {/* Trusted Clients Footer */}
          <div className="col-span-1 md:col-span-3 text-center mt-6 w-full overflow-hidden relative">
            <style>
                {`
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: scroll-left 40s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                `}
            </style>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 inline-block pb-2">Trusted By Industry Leaders</p>
            <div className="flex animate-marquee w-[200%] mt-4">
                {CLIENT_LOGOS.map((client, idx) => (
                    <div key={`original-${idx}`} className="flex items-center justify-center w-1/7 px-8">
                        <img loading="lazy" decoding="async" src={client.src} alt={client.name} className="h-10 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
                    </div>
                ))}
                {CLIENT_LOGOS.map((client, idx) => (
                    <div key={`duplicate-${idx}`} className="flex items-center justify-center w-1/7 px-8">
                        <img loading="lazy" decoding="async" src={client.src} alt={client.name} className="h-10 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300" />
                    </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. HIRING PROCESS */}
      <section className="max-w-6xl mx-auto px-6 py-28 border-t border-gray-200 mb-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black uppercase">Hiring Process</h2>
          <div className="h-[2px] w-12 bg-gray-800 mx-auto mt-4 mb-5"></div>
          <p className="text-gray-500 text-base md:text-lg">
            A transparent and structured pathway for finding the best talent seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS.map((step) => (
            <div key={step.step} className="bg-white border border-gray-200 rounded-xl p-8 hover:border-black hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 shadow-sm min-h-[220px]">
              <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-md text-black font-extrabold flex items-center justify-center mb-6 text-lg">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Careers;
