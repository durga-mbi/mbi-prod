import React from "react";
import { Link } from "react-router-dom";
import { resolveApiAssetUrl } from "../api/api";

export interface ProjectData {
  id: string | number;
  title: string;
  category: string;
  client: string;
  domain: string;
  details: string;
  tech: string;
  image?: string;
}

export interface ProjectCardProps {
  project: ProjectData;
  imageClassName?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, imageClassName = "" }) => {
  const imageSrc = project.image
    ? resolveApiAssetUrl(project.image)
    : `https://picsum.photos/seed/${project.id}-${project.title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}/400/250`;

  // Split details into words to check if we need truncation
  const words = project.details.split(" ");
  const isLong = words.length > 20;

  const displayDetails = !isLong
    ? project.details
    : words.slice(0, 20).join(" ") + "...";

  // Parse tech stack into an array
  const techStack = project.tech
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  return (
    <Link 
      to={`/project/${project.id}`} 
      state={{ project }}
      className="block group flex-col bg-gray-50 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden flex h-full border border-gray-200 hover:border-black hover:bg-white"
    >
      {/* Product Dummy/Manual Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          loading="lazy"
          decoding="async"
          src={imageSrc}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110 ${imageClassName}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"></div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold tracking-wide uppercase text-gray-900 mb-3 group-hover:text-black transition-colors">
          {project.title}
        </h3>

        {/* Client & Domain Details */}
        <div className="space-y-1.5 mb-3 text-xs md:text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-500 uppercase tracking-wider min-w-[70px]">
              Client:
            </span>
            <span className="text-gray-800 bg-white px-2 py-0.5 rounded font-medium border border-gray-200">
              {project.client}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-500 uppercase tracking-wider min-w-[70px]">
              Domain:
            </span>
            <span className="text-gray-800 font-medium">
              {project.domain}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 flex-grow">
          <p className="text-gray-600 text-sm leading-relaxed">
            {displayDetails}
          </p>
          {isLong && (
            <span className="mt-2 text-sm text-gray-800 hover:text-black font-semibold transition-colors flex items-center gap-1">
              Read More
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white border border-gray-200 group-hover:border-black group-hover:bg-black group-hover:text-white transition-colors duration-500 text-gray-700 text-xs font-semibold rounded-full shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
