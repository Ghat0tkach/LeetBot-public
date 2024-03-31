import React from "react";

const GlowingTags = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md transform transition-all hover:scale-110 animate-pulse"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default GlowingTags;
