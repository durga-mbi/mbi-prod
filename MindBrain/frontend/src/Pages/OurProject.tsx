import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Home, Search, Loader2, AlertCircle } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import type { ProjectData } from "../components/ProjectCard";
import { apiGet, resolveApiAssetUrl, type ApiResponse, type ProjectsResponse, type ApiProject } from "../api/api";

// Map backend ApiProject → ProjectCard's ProjectData shape
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

const TABS = ["ALL", "ECOMMERCE", "IT", "LOGISTICS", "FINANCE", "OTHER"];
const PAGE_SIZE = 9;

const normalizeCategory = (value?: string | null) =>
  String(value ?? "").trim().replace(/\s+/g, "").toUpperCase();

const OurProject: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch projects from backend ───────────────────────────────────────────
  const fetchProjects = useCallback(async (
    pageNum: number,
    searchTerm: string,
    category: string,
    append: boolean
  ) => {
    try {
      if (append) setIsLoadingMore(true);
      else { setIsLoading(true); setError(null); }

      const params = new URLSearchParams({
        page: String(pageNum),
        limit: String(PAGE_SIZE),
        ...(searchTerm ? { search: searchTerm } : {}),
        ...(category ? { category } : {}),
      });

      const res = await apiGet<ApiResponse<ProjectsResponse>>(`/projects?${params}`);
      const projectsArray = Array.isArray(res?.data?.projects)
        ? res.data.projects
        : [];

      const mapped = projectsArray.map(mapApiProject);

      setProjects(prev => append ? [...prev, ...mapped] : mapped);
      setTotalPages(res.data.pagination.pages);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects.");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  // Initial load & on search change
  useEffect(() => {
    fetchProjects(1, search, categoryFilter, false);
  }, [search, categoryFilter, fetchProjects]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setActiveTab("ALL");
    setCategoryFilter("");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearch("");
    setSearchInput("");
    setCategoryFilter(tab === "ALL" ? "" : tab);
  };

  const handleLoadMore = () => {
    fetchProjects(page + 1, search, categoryFilter, true);
  };

  // Filter client-side by tab (tabs map to category)
  const displayedProjects = activeTab === "ALL"
    ? projects
    : projects.filter((project) => normalizeCategory(project.category) === normalizeCategory(activeTab));

  return (
    <div className="bg-[#f6f6f6] min-h-screen text-gray-900 font-['Poppins']">
      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-[#171D26] text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4">
          OUR PROJECTS
        </h1>
        <div className="flex justify-center items-center gap-2 text-sm text-gray-300">
          <Link to="/" className="flex items-center hover:text-white transition-colors">
            <Home size={18} />
          </Link>
          <span className="opacity-60 text-lg">{">"}</span>
          <span className="opacity-90">Our Projects</span>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20 pb-24">

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex justify-center mb-10">
          <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden max-w-md w-full">
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search projects..."
              className="flex-1 px-5 py-3 text-sm text-gray-800 outline-none bg-transparent"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-1 text-sm font-semibold"
            >
              <Search size={16} />
            </button>
          </div>
        </form>

        {/* Tab Filters */}
        <div className="flex justify-center mb-16 relative z-10 w-full overflow-x-auto px-2 md:px-0 py-4">
          <div className="bg-gradient-to-r from-[#8f979c] via-[#3a3a3a] to-black rounded-sm p-1 flex flex-row items-center gap-1 md:gap-2 shadow-xl border border-gray-800 min-w-max md:min-w-0 mx-auto transform -skew-x-12">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 md:px-8 py-2 md:py-3 font-bold text-base md:text-xl tracking-wider transition-all duration-300 relative whitespace-nowrap ${activeTab === tab
                    ? "bg-white/10 text-white shadow-inner"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <div className="transform skew-x-12">{tab}</div>
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={40} className="animate-spin text-gray-500" />
            <p className="text-gray-500 text-sm font-medium">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <AlertCircle size={40} className="text-red-400" />
            <p className="text-red-600 font-semibold">{error}</p>
            <button
              onClick={() => fetchProjects(1, search, categoryFilter, false)}
              className="mt-2 px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && displayedProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-gray-500 text-lg font-medium">No projects found.</p>
            <button
              onClick={() => {
                setSearch("");
                setSearchInput("");
                setActiveTab("ALL");
                setCategoryFilter("");
              }}
              className="px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Project Grid */}
        {!isLoading && !error && displayedProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && !error && page < totalPages && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="bg-[#0b1d23] text-white px-10 py-4 text-sm font-bold tracking-widest rounded-md hover:bg-[#16333b] transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? (
                <><Loader2 size={16} className="animate-spin" /> Loading...</>
              ) : (
                "SEE MORE"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurProject;
