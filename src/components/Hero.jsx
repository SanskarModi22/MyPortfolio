/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { styles } from "../style";
import { ComputersCanvas } from "./canvas";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`${styles.paddingX} absolute inset-0 top-[1px] max-w-7xl max-auto flex flex-row items-start gap-5`}
      >
        {/* <div className={`flex flex-col justify-center items-center `}>
          <div className={`w-5 h-5 rounded-full bg-[#915eff]`} />
          <div className={`w-1 sm:h-80 h-40 violet-gradient`} />
        </div> */}

        <div className="flex flex-col items-center justify-center m-auto w-full">
          <h1
            className={`${styles.heroHeadText} text-white text-center flex flex-col lg:flex-row w-full md:w-auto items-center justify-center gap-6`}
          >
           Hi,Iʻm Sanskar Modi
           
          </h1>
          <div className={`${styles.heroTypedText} mt-2 text-white-100`}>
            <Typewriter
              options={{
                strings: [
                  "Product Manager",
                  "Software Developer",
                  "Engineer",
                  "Leader",
                  "Full Stack Developer",
                ],
                autoStart: true,
                loop: true,
                cursor: "|",
                delay: 100,
                deleteSpeed: 40,
                pauseFor: 1000,
                wrapperClassName: "text-[#dfd9ff]",
                cursorClassName: "purple-text-gradient",
              }}
            />
          </div>
          <p
            className={`text-[17px] leading-[30px] mt-6 text-white-100 w-full md:w-[75%] text-center`}
          >
            I am a problem-solving full-stack developer with expertise in mobile and web application development.I excel at analyzing complex problems and implementing innovative strategies to overcome them.
          </p>
          <div className="flex  md:flex-row items-center justify-start gap-8 mt-12 ">
            <button
              type="submit"
              className="border-[1px] border-white py-3 px-6 rounded-md hover:bg-secondary hover:text-primary duration-200 transition-all"
            >
              <a
                href="https://linktr.ee/SanskarModi2203"
                className="text-[16px]"
              >
               LinkTree
              </a>
            </button>
            <button
              type="submit"
              className="border-[1px] border-white py-3 px-6 rounded-md hover:bg-secondary hover:text-primary duration-200 transition-all"
            >
              <a
                href="https://rb.gy/bddzi"
                download={true}
                className="text-[16px]"
              >
                Resume
              </a>
            </button>
          </div>
        </div>
      </div>
      <div>
        <br />
        <br />
      </div>
      {/* <ComputersCanvas /> */}
      <br />
      <br />
      <div className=" hidden absolute xs:bottom-10 bottom-40 w-full md:flex justify-center items-center">
        {/* A link that navigates to the element with the ID "about" */}
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            {/* An animated element */}
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5, // Animation duration of 1.5 seconds
                repeat: Infinity, // Animation repeats indefinitely
                repeatType: "loop", // Animation restarts from the beginning after each cycle
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
              // The Ball Element inside the animation
            ></motion.div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
