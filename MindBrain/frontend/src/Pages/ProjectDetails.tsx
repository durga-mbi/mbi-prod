import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { Home, ArrowLeft, LayoutGrid, Loader2, AlertCircle } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import type { ProjectData } from "../components/ProjectCard";
import { motion } from "framer-motion";
import { apiGet, resolveApiAssetUrl, type ApiProject, type ApiResponse, type ProjectsResponse } from "../api/api";

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

const ProjectDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectData | null>(
    (location.state?.project as ProjectData | undefined) ?? null
  );
  const [relatedProjects, setRelatedProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(!location.state?.project);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setError("Project ID is missing.");
      setIsLoading(false);
      return;
    }

    const fetchProject = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const projectRes = await apiGet<ApiResponse<ApiProject>>(`/projects/${id}`);
        const mappedProject = mapApiProject(projectRes.data);
        setProject(mappedProject);
        
        const relatedResponse = mappedProject.category
          ? await apiGet<ApiResponse<ProjectsResponse>>(
              `/projects?category=${encodeURIComponent(mappedProject.category)}&limit=6`
            )
          : null;

        const nextRelated = relatedResponse
          ? relatedResponse.data.projects
              .map(mapApiProject)
              .filter((item) => item.id !== mappedProject.id)
              .slice(0, 3)
          : [];

        setRelatedProjects(nextRelated);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "We couldn't load the details for this project."
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProject();
  }, [id]);

  const techStack = useMemo(
    () =>
      project?.tech
        .split(",")
        .map((tech: string) => tech.trim())
        .filter(Boolean) ?? [],
    [project]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f6f6] gap-4">
        <Loader2 size={40} className="animate-spin text-gray-500" />
        <p className="text-gray-600">Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f6f6]">
        <AlertCircle size={40} className="text-red-400 mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h2>
        <p className="text-gray-600 mb-8 text-center max-w-xl px-4">
          {error ?? "We couldn't load the details for this project. Please return to the projects page."}
        </p>
        <button
          onClick={() => navigate('/ourprojects')}
          className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const heroImage = project.image || `https://picsum.photos/seed/${project.id}-${project.title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}/1200/600`;

  return (
    <div className="w-full bg-[#f6f6f6] min-h-screen font-['Poppins'] text-gray-900">

      {/* ================= HERO SECTION ================= */}
      <section className="pt-36 pb-20 bg-[#171D26] text-white text-center relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase mb-6 relative z-10 px-4 leading-tight">
          {project.title}
        </h1>

        <div className="flex justify-center items-center gap-2 text-sm text-gray-300 relative z-10">
          <Link to="/" className="flex items-center hover:text-white transition-colors">
            <Home size={18} />
          </Link>
          <span className="opacity-60 text-lg">{">"}</span>
          <Link to="/ourprojects" className="hover:text-white transition-colors opacity-90">
            Our Projects
          </Link>
          <span className="opacity-60 text-lg">{">"}</span>
          <span className="opacity-90 max-w-[200px] truncate">{project.title}</span>
        </div>
      </section>

      {/* ================= PROJECT DETAILS ================= */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-[80px] py-16">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-10 transition-colors uppercase text-sm font-bold tracking-wider"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200">

          {/* Main Image */}
          <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] bg-gray-100 overflow-hidden relative">
            <img
              loading="lazy"
              decoding="async"
              src={heroImage}
              alt={project.title}
              className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 hover:grayscale-0 hover:scale-105"
            />
          </div>

          <div className="p-8 md:p-12 lg:p-16">

            <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-10">
              {/* Category / Domain Badge */}
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-black text-white text-xs font-bold tracking-widest uppercase rounded-full">
                  {project.category}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-200 text-xs font-bold tracking-widest uppercase rounded-full">
                  {project.domain}
                </span>
              </div>

              {/* Client Info */}
              <div className="flex flex-col text-right">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Client Base</span>
                <span className="text-xl font-bold text-black">{project.client}</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Description (Taking up 2 columns) */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-black uppercase text-black mb-6 tracking-tight flex items-center gap-3">
                  <div className="w-6 h-1 bg-black"></div>
                  Project Brief
                </h3>
                <p className="text-gray-600 leading-loose text-base md:text-lg text-justify whitespace-pre-line">
                  {project.details}
                </p>
              </div>

              {/* Technologies Sidebar */}
              <div className="lg:col-span-1 bg-gray-50 p-8 rounded-2xl border border-gray-200 h-fit">
                <h3 className="text-lg font-black uppercase text-black mb-6 tracking-tight">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.length > 0 ? (
                    techStack.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-800 text-sm font-semibold rounded-lg shadow-sm w-full md:w-auto"
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">Not specified</span>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ================= RELATED PROJECTS ================= */}
      {relatedProjects.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-[80px] pb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-grow bg-gray-200"></div>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-black tracking-tight flex items-center gap-3 whitespace-nowrap">
              <LayoutGrid size={28} />
              Related Projects
            </h2>
            <div className="h-px flex-grow bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProjects.map((rp) => (
              <motion.div
                key={rp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={rp} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProjectDetails;
