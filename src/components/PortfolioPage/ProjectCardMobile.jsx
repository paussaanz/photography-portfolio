import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ProjectCard = ({ image, index, scrollYProgress }) => {
  // Ajusta el inicio y el fin de cada tarjeta en función de su índice
  const start = index * 0.15; // Incrementa progresivamente (ajusta según el número de tarjetas)
  const end = start + 0.15; // Duración del efecto en el viewport

  // Transforma la opacidad y la posición en función del scrollYProgress
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]); // De transparente a opaco
  const translateY = useTransform(scrollYProgress, [start, end], [50, 0]); // De desplazado a posición original

  return (
    <motion.div
      style={{
        opacity, // Vincula opacidad al scroll
        y: translateY, // Vincula posición vertical al scroll
      }}
    >
      <Link to={image.url} className="text-decoration--none" aria-label={image.title}>
        <div className="mobile__card">
          <div className="mobile__card-image-wrapper">
            <img src={image.src} alt={image.title || "Project image"} className="mobile__card-image" />
          </div>
          <p className="text-color--primary h4 m--t-2">{image.title}</p>
          <p className="text-color--primary b4">{image.subtitle}</p>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectCardMobile = ({ images }) => {
  const containerRef = useRef(null); // Referencia al contenedor de las tarjetas
  const { scrollYProgress } = useScroll({
    target: containerRef, // Activa el scroll relativo a este contenedor
    offset: ["start end", "end start"], // Cuando el contenedor entra completamente y sale completamente
  });

  return (
    <div ref={containerRef} className="mobile__portfolio-card-column">
      {images.map((image, index) => (
        <ProjectCard key={index} image={image} index={index} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
};

export default ProjectCardMobile;
