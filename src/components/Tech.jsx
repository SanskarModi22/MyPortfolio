/* eslint-disable no-unused-vars */
import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <>
      <div className="hidden md:flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <>
            <div className="flex flex-col flex-wrap justify-center gap-5">
              <div className="w-28 h-28" key={technology.name}>
                <BallCanvas icon={technology.icon} />
              </div>
              <p className="text-center">{technology.name}</p>
            </div>
          </>
        ))}
      </div>
      <div className="md:hidden mt-20 flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          // <div className="w-28 h-28" key={technology.name}>
          //   <BallCanvas icon={technology.icon} />
          // </div>
          <div
            key={technology.name}
            className="flex flex-col flex-wrap justify-center gap-5"
          >
            <Tilt key={technology.name} tiltMaxAngleX={30} tiltMaxAngleY={30}>
              <motion.div
                variants={textVariant()}
                className="dark-green-pink-gradient w-20 h-20 rounded-full flex justify-center items-center"
              >
                <img
                  src={technology.icon}
                  alt="technology-icon"
                  className="w-1/2 h-1/2 object-contain"
                />
              </motion.div>
            </Tilt>
            <p className="text-center">{technology.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
