import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from './Slider.module.css'
import ArtworkGallery from "./ArtGallery/ArtworkGallery";

const slides = [
  { id: 1, title: "Artwork", content: <ArtworkGallery /> },
  { id: 2, title: "Literature", content: "Literatures." }
];


const Button = ({ children, onClick, type = "button", className = "" }) => {
    return (
        <button className={`${styles.button} ${className}`} type={type} onClick={onClick}>
            {children}
        </button>
    );
};


const SlidingPages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const direction = "left";

  const variants = {
    enter: (direction) => ({
      x: direction === "left" ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction === "left" ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        {slides.map((slide, index) => (
          <Button
            key={slide.id}
            onClick={() => setCurrentIndex(index)}
            className={`px-4 py-2 rounded-lg transition ${
              index === currentIndex ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {slide.title}
          </Button>
        ))}
      </div>

      <div className="relative w-full h-40 overflow-hidden border rounded-lg">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slides[currentIndex].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex items-center justify-center p-4 bg-white shadow-lg"
          >
            <p className="text-lg">{slides[currentIndex].content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SlidingPages;



