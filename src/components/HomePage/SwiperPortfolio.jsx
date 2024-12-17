import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageBanner from "./ImageBanner";
import { homeSwiperImages, editorialSwiperImages } from "../../assets/js/images";
import Button from "../General/Buttons/Button";

const SwiperPortfolio = () => {
  const sectionRef = useRef(null);
  const [activeContent, setActiveContent] = useState("Portfolio");

  // Toggle content functions
  const toggleContent = (content) => setActiveContent(content);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.05], [5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.025], [0.8, 1]);

  const totalImages =
    activeContent === "Portfolio" ? homeSwiperImages.length : editorialSwiperImages.length;
  const finalPosition = `-${(totalImages - 1) * 100}vw`;

  const xTransform = useTransform(scrollYProgress, [0.025, 1], ["5vw", finalPosition]);

  // Render active images
  const renderActiveImages = () => {
    const images = activeContent === "Portfolio" ? homeSwiperImages : editorialSwiperImages;
    return images.map((image, index) => (
      <ImageBanner
        key={index}
        src={image.src}
        name={image.name}
        date={image.date}
        description={image.description}
        url={image.url}
      />
    ));
  };

  return (
    <motion.div
      ref={sectionRef}
      className="position--sticky d--vh-300 background--transparent"
      style={{ rotate, scale }}
    >
      <div className="position--sticky position--top-0 flex d--vh-100 flex--a-center flex--j-start overflow--clip">
        <motion.div className="home__swiper-animation-images" style={{ x: xTransform }}>
          {renderActiveImages()}
        </motion.div>
        <div className="home__swiper-animation-button--centered">
          <Button
            className="text-color--light"
            text="Portfolio"
            onClick={() => toggleContent("Portfolio")}
          />{" "}
          |
          <Button
            className="text-color--light"
            text="Editorials"
            onClick={() => toggleContent("Editorials")}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SwiperPortfolio;
