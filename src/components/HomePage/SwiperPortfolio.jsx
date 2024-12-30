import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageBanner from "./ImageBanner";
import { homeSwiperImages, editorialSwiperImages } from "../../assets/js/images";
import Button from "../General/Buttons/Button";
import { useTranslation } from "react-i18next";

const SwiperPortfolio = () => {
  const sectionRef = useRef(null);
  const [activeContent, setActiveContent] = useState("Portfolio");
  const { t } = useTranslation();

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
        name={t(image.name)}
        date={image.date}
        description={t(image.description)}
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
            className="text-color--overlay"
            text={t("syp.commons.portfolio")}
            onClick={() => toggleContent("Portfolio")}
          />{" "}
          |
          <Button
            className="text-color--overlay"
            text={t("syp.commons.editorials")}
            onClick={() => toggleContent("Editorials")}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SwiperPortfolio;
