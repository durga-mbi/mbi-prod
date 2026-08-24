import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Fotter from './components/Fotter';
import ScrollToTop from './components/ScrollToTop';
import RequireAdmin from './components/admin/RequireAdmin';

const Hero = lazy(() => import('./components/Hero'));
const ClientSection = lazy(() => import('./components/ClientSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const TrainingSection = lazy(() => import('./components/TrainingSection'));
const CommunitySection = lazy(() => import('./components/CommunitySection'));
const Testimonials = lazy(() => import('./components/Testimonials'));

const AboutUs = lazy(() => import('./Pages/AboutUs'));
const Services = lazy(() => import('./Pages/Services'));
const ITProductDevelopment = lazy(() => import('./Pages/ITProductDevelopment'));
const Clients = lazy(() => import('./Pages/Clients'));
const Careers = lazy(() => import('./Pages/Careers'));
const ContactUs = lazy(() => import('./Pages/ContactUs'));
const OurProject = lazy(() => import('./Pages/OurProject'));
const ProjectDetails = lazy(() => import('./Pages/ProjectDetails'));
const ManpowerOutsourcing = lazy(() => import('./Pages/ManpowerOutsourcing'));
const ITStaffing = lazy(() => import('./Pages/ITStaffing'));
const NotITStaffing = lazy(() => import('./Pages/NotITStaffing'));
const IoTSolution = lazy(() => import('./Pages/IoTSolution'));
const IoTProjectDetail = lazy(() => import('./Pages/IoTProjectDetail'));
const SoftwareTraining = lazy(() => import('./Pages/SoftwareTraining'));
const TrainingProgramDetail = lazy(() => import('./Pages/TrainingProgramDetail'));
const Policy = lazy(() => import('./Pages/Policy'));
const Login = lazy(() => import('./Pages/Login'));
const AdminPanel = lazy(() => import('./Pages/AdminPanel'));

const PageLoader: React.FC = () => (
  <div className="flex min-h-[40vh] items-center justify-center bg-white">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
  </div>
);

const PublicLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <Outlet />
      </main>
      <Fotter />
    </>
  );
};

const HomePage: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <>
      <Hero />
      <ClientSection />
      <ServicesSection />
      <WhyChooseUs />
      <TrainingSection />
      <CommunitySection />
      <Testimonials />
    </>
  </Suspense>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/it-product-development" element={<ITProductDevelopment />} />
              <Route path="/services/manpower-outsourcing" element={<ManpowerOutsourcing />} />
              <Route path="/services/manpower-outsourcing/it-staffing" element={<ITStaffing />} />
              <Route path="/services/manpower-outsourcing/not-it-staffing" element={<NotITStaffing />} />
              <Route path="/services/iot-solution" element={<IoTSolution />} />
              <Route path="/services/iot-solution/:projectId" element={<IoTProjectDetail />} />
              <Route path="/services/software-training" element={<SoftwareTraining />} />
              <Route path="/services/software-training/:courseSlug" element={<TrainingProgramDetail />} />
              <Route path="/client" element={<Clients />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/ourprojects" element={<OurProject />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/policy" element={<Policy />} />
            </Route>

            <Route element={<RequireAdmin />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
