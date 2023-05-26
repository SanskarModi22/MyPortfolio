import { useState } from "react";

// interface IProjectLink {
//   link: string;
//   image: string;
// }

const ProjectLink = ({ link, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverStyles = isHovered ? `green-pink-gradient` : "black-gradient";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(link, "_blank")}
      className={`${hoverStyles} w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-colors duration-200`}
    >
      <img src={image} alt="github" className="w-1/2 h-1/2 object-contain" />
    </div>
  );
};

export default ProjectLink;