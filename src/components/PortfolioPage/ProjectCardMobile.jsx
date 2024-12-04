import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectCard = ({ image, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    viewport={{ once: true, amount: 0.2 }}
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

const ProjectCardMobile = ({ images }) => (
  <div className="mobile__portfolio-card-column">
    {images.map((image, index) => (
      <ProjectCard key={index} image={image} index={index} />
    ))}
  </div>
);

export default ProjectCardMobile;
