import { SectionWrapper } from "../hoc";
// import { Link } from "react-router-dom";

// import { links } from "../constants/index";

const Footer = () => {
  return (
    <div className="text-center">
      {/* <div className="flex items-center gap-x-4 justify-center mb-10">
        <Link to={links.linkedin} target="_blank">
          <i className="fa-brands fa-linkedin fa-xl cursor-pointer"></i>
        </Link>
        <Link to={links.github} target="_blank">
          <i className="fa-brands fa-github fa-xl cursor-pointer"></i>
        </Link>
        <Link to={links.resume} target="_blank">
          <i className="fa-solid fa-file-lines fa-xl cursor-pointer"></i>
        </Link>
        <Link to={`mailto:${links.schoolEmail}`} target="_blank">
          <i className="fa-solid fa-envelope fa-xl cursor-pointer"></i>
        </Link>
      </div> */}
      <p className="mb-2">{`</>`} with 🫶🏻 and 🧋</p>
      <p className="mb-2">
        Copyright © {new Date().getFullYear()} Sanskar Modi
      </p>
    </div>
  );
};

export default SectionWrapper(Footer, "footer");
