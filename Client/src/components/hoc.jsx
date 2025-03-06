import React from "react";
import { motion } from "framer-motion";

const SectionWrapper = (Component, idName) => 
  function HOC() {
    return (
      <motion.section
        id={idName}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full py-10"
      >
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
