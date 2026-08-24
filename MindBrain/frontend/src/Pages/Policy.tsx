import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Shield,
  FileText,
  RotateCcw,
  Truck,
  Lock,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building2,
  Calendar,
} from "lucide-react";

interface PolicySectionProps {
  id: string;
  icon: React.ReactNode;
  number: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({
  id,
  icon,
  number,
  title,
  lastUpdated,
  children,
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-28 bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Section {number}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-tight">
              {title}
            </h2>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
          <Calendar size={13} />
          <span>Last Updated: {lastUpdated}</span>
        </div>
      </div>

      <div className="mt-8 space-y-8 text-gray-700 leading-relaxed font-normal text-[15px]">
        {children}
      </div>
    </motion.section>
  );
};

const Policy: React.FC = () => {
  const [activeTab, setActiveTab] = useState("terms");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navItems = [
    { id: "terms", label: "1. Terms & Conditions", icon: <FileText size={16} /> },
    { id: "refund", label: "2. Cancellation & Refund", icon: <RotateCcw size={16} /> },
    { id: "shipping", label: "3. Shipping & Delivery", icon: <Truck size={16} /> },
    { id: "privacy", label: "4. Privacy Policy", icon: <Lock size={16} /> },
  ];

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full font-['Poppins'] bg-[#FAFAFA] text-gray-900 min-h-screen">
      {/* ════════════════════════════════════════════════════════════════
          1. BREADCRUMB / HERO HEADER
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#171D26] text-white pt-36 pb-20 text-center relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-widest text-gray-300 mb-4 border border-white/10"
          >
            <Shield size={14} className="text-white" />
            <span>Legal &amp; Compliance</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6"
          >
            Company Policies
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed mb-6"
          >
            Please review our terms of service, refund policy, digital delivery guidelines, and privacy practices to understand your rights and obligations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-300 flex-wrap"
          >
            <Link to="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Home size={16} />
              <span>Home</span>
            </Link>
            <span className="opacity-60">{">"}</span>
            <span className="text-white font-medium">Policy</span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. MAIN CONTENT AREA WITH STICKY NAV
      ════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Quick Navigation Sidebar (Desktop) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">
                  Table of Contents
                </span>
                <h3 className="text-lg font-black uppercase text-black">
                  Quick Navigation
                </h3>
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-black text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <span className={isActive ? "text-white" : "text-gray-400"}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-gray-100">
                <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 flex items-start gap-3">
                  <Building2 size={20} className="text-black shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-black uppercase mb-0.5">
                      Mindbrain Innovations
                    </p>
                    <p className="text-gray-500 leading-relaxed">
                      CIN / Registered in Bhubaneswar, Odisha, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Policy Sections */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Terms and Conditions */}
            <PolicySection
              id="terms"
              number="01"
              icon={<FileText size={22} />}
              title="Terms and Conditions"
              lastUpdated="August 2026"
            >
              <div className="bg-gray-50 border border-gray-200/70 rounded-2xl p-5 text-sm text-gray-600 leading-relaxed">
                These Terms and Conditions govern your use of the website and services provided by{" "}
                <strong className="text-black font-semibold">
                  Mindbrain Innovations Private Limited
                </strong>{" "}
                (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing our website, purchasing our software (including MindBrain Nexus ERP), or enrolling in our training courses, you agree to be bound by these terms.
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  1.1 Services Offered
                </h3>
                <p>
                  Mindbrain Innovations Private Limited provides digital products, including but not limited to Enterprise Resource Planning (ERP) software, IoT solutions, and online/offline technical training programs (e.g., MERN stack, Python, IoT architecture).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  1.2 User Obligations &amp; Account Security
                </h3>
                <p>
                  You are responsible for maintaining the confidentiality of your login credentials for our portals. You agree not to share your account access with third parties. Any unauthorized use of your account must be reported to us immediately.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  1.3 Intellectual Property
                </h3>
                <p>
                  All materials provided, including software code, UI/UX designs, course curriculum, study materials, and video lectures, are the exclusive intellectual property of Mindbrain Innovations Private Limited. You may not reproduce, distribute, or create derivative works from these materials without express written consent.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  1.4 Code of Conduct
                </h3>
                <p>
                  Users engaging in our offline or online training batches are expected to maintain professional conduct. We reserve the right to terminate access to our ERP or training platforms without refund if a user violates these terms, engages in disruptive behavior, or attempts to compromise our system security.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  1.5 Governing Law &amp; Jurisdiction
                </h3>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts located in Bhubaneswar, Odisha.
                </p>
              </div>
            </PolicySection>

            {/* 2. Cancellation & Refund Policy */}
            <PolicySection
              id="refund"
              number="02"
              icon={<RotateCcw size={22} />}
              title="Cancellation &amp; Refund Policy"
              lastUpdated="August 2026"
            >
              <div className="bg-gray-50 border border-gray-200/70 rounded-2xl p-5 text-sm text-gray-600 leading-relaxed">
                We strive to ensure complete satisfaction with our software and training programs. Because our products are primarily digital, our refund policy is strictly defined below:
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  2.1 Software, ERP, and Digital Subscriptions
                </h3>
                <p>
                  Once access to the MindBrain Nexus ERP or other proprietary software has been provisioned and the system is in use, all payments are final and non-refundable.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  2.2 Training Courses &amp; Bootcamps
                </h3>
                <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                  <div>
                    <p className="font-semibold text-black mb-1">
                      • Pre-Commencement:
                    </p>
                    <p className="text-sm text-gray-600">
                      If you wish to cancel your enrollment in a training batch, you must submit a cancellation request to our support team at least 48 hours before the scheduled start date of the batch. A full refund (minus any payment gateway processing fees) will be issued.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-black mb-1">
                      • Post-Commencement:
                    </p>
                    <p className="text-sm text-gray-600">
                      Once a batch has officially started and dashboard access/study materials have been granted, we do not offer refunds, regardless of the student&apos;s attendance or completion status.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  2.3 Refund Processing
                </h3>
                <p>
                  Approved refunds will be processed back to the original method of payment (e.g., Credit Card, UPI, Net Banking via PhonePe) within 5 to 7 business days from the date of approval.
                </p>
              </div>
            </PolicySection>

            {/* 3. Shipping & Delivery Policy */}
            <PolicySection
              id="shipping"
              number="03"
              icon={<Truck size={22} />}
              title="Shipping &amp; Delivery Policy"
              lastUpdated="August 2026"
            >
              <div className="bg-gray-50 border border-gray-200/70 rounded-2xl p-5 text-sm text-gray-600 leading-relaxed">
                Mindbrain Innovations Private Limited specializes in digital software, ERP solutions, and EdTech training. Therefore, the traditional concept of physical shipping does not apply to our services.
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  3.1 Delivery of Digital Goods
                </h3>
                <p className="mb-4">
                  Upon successful processing of your payment, delivery of the service is executed digitally:
                </p>
                <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                  <div>
                    <p className="font-semibold text-black mb-1">
                      • Software/ERP Clients:
                    </p>
                    <p className="text-sm text-gray-600">
                      System access credentials and setup instructions will be dispatched to your registered email address within 24 hours of payment confirmation.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-black mb-1">
                      • Students/Trainees:
                    </p>
                    <p className="text-sm text-gray-600">
                      Instant access is granted to the student dashboard. Study materials, batch schedules, and automated receipts will be accessible immediately via your secure login.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  3.2 No Physical Shipment
                </h3>
                <p>
                  No physical products, CDs, or printed materials will be shipped to your address unless explicitly stated in a custom enterprise contract.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  3.3 Access Issues
                </h3>
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-amber-900 text-sm">
                  <AlertCircle size={20} className="shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <p className="font-semibold mb-1">Need Immediate Assistance?</p>
                    <p className="text-amber-800 leading-relaxed text-xs sm:text-sm">
                      If your payment is successful but you do not receive immediate access to the dashboard or your welcome email, please contact our support team immediately with your Transaction ID.
                    </p>
                  </div>
                </div>
              </div>
            </PolicySection>

            {/* 4. Privacy Policy */}
            <PolicySection
              id="privacy"
              number="04"
              icon={<Lock size={22} />}
              title="Privacy Policy"
              lastUpdated="August 2026"
            >
              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  4.1 Data Collection
                </h3>
                <p>
                  We collect necessary information such as your name, email address, phone number, and billing details when you register for an account, enroll in a course, or purchase our software. We do not store sensitive payment details (like full credit card numbers) on our servers; these are securely handled by our PCI-DSS compliant payment gateway partner (PhonePe).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  4.2 Data Usage
                </h3>
                <p className="mb-3">Your data is used strictly for:</p>
                <ul className="space-y-2 pl-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-black shrink-0" />
                    <span>Provisioning access to our ERP and student dashboards.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-black shrink-0" />
                    <span>Generating automated invoices and digital certificates.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-black shrink-0" />
                    <span>Sending transactional updates (e.g., fee reminders, class schedule changes).</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  4.3 Data Sharing
                </h3>
                <p>
                  We do not sell, rent, or trade your personal information to third parties. Data is only shared with trusted service providers (like payment gateways and cloud hosting servers) solely for the purpose of operating our business and providing our services to you.
                </p>
              </div>
            </PolicySection>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. POLICY INQUIRY & CONTACT SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                <HelpCircle size={15} />
                <span>Policy Inquiries &amp; Support</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
                Have questions regarding our policies?
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Our support and legal compliance team is available to assist you with any questions regarding course enrollments, refunds, digital credentials, or enterprise software agreements.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail size={16} className="text-gray-400 shrink-0" />
                  <a href="mailto:admin@mindbrain.co.in" className="hover:text-white transition-colors">
                    admin@mindbrain.co.in
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Phone size={16} className="text-gray-400 shrink-0" />
                  <a href="tel:+919178587486" className="hover:text-white transition-colors">
                    +91 9178587486
                  </a>
                </div>
                <div className="flex items-start gap-3 text-xs text-gray-400">
                  <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <span>DCB-718, DLF CYBER CITY, Patia, Bhubaneswar, Odisha 751024</span>
                </div>
              </div>

              <Link
                to="/contactus"
                className="group inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-widest hover:bg-gray-200 transition-all shadow-lg text-center"
              >
                <span>Contact Support</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Policy;
