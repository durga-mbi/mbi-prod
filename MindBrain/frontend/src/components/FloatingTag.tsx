import React from "react";

interface Props {
  label: string;
  className?: string;
}

const FloatingTag: React.FC<Props> = ({ label, className }) => {
  return (
    <div
      className={`flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md text-sm text-gray-700 font-medium ${className}`}
    >
      <span className="w-2 h-2 bg-black rounded-full"></span>
      {label}
    </div>
  );
};

export default FloatingTag;