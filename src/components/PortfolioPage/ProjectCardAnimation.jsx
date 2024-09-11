import ProjectCard from '../General/ProjectCard';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; // Importar framer-motion

const ProjectCardAnimation = ({ homeSwiperImages, scrollYProgress }) => {
    const totalCards = homeSwiperImages.length;

    return (
      <div className="vh-300 position-relative "> {/* Altura para permitir scroll */}
        <div className="d-flex justify-content-center align-items-ceter">
          {homeSwiperImages.map((image, i) => {
            // Alternar la posición entre izquierda y derecha
            const direction = i % 2 === 0 ? 'left' : 'right';

            // Controlar la escala, posición Z y opacidad en función de scrollYProgress
            const scale = useTransform(scrollYProgress, [i / totalCards, (i + 1) / totalCards], [0.8, 1.2]);
            const z = useTransform(scrollYProgress, [i / totalCards, (i + 1) / totalCards], [0, 300]);
            const opacity = useTransform(scrollYProgress, [i / totalCards, (i + 1) / totalCards], [0.5, 1]);

            // Movimiento horizontal según el índice para alternar entre izquierda y derecha
            const x = useTransform(scrollYProgress, [i / totalCards, (i + 1) / totalCards], direction === 'left' ? ['-50vw', '0vw'] : ['50vw', '0vw']);

            return (
              <motion.div
                key={i}
                style={{
                  position: 'absolute', // Para mantener las tarjetas visibles durante el scroll
                 
                  left: direction === 'left' ? '10%' : 'auto',
                  right: direction === 'right' ? '10%' : 'auto',
                  width: '20vw',
                  height: '20vh',
                  display: 'flex',
                  
                  
                  transformStyle: 'preserve-3d',
                  zIndex: totalCards - i, // Control de apilamiento en 3D
                }}
              >
                <motion.div
                  style={{
                    width: '100%',
                    height: '100%',
                    scale,
                    opacity,
                    z,
                  }}
                >
                  <ProjectCard
                    src={image.src}
                    name={image.name}
                    date={image.date}
                    description={image.description}
                    orientation="vertical"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
};

export default ProjectCardAnimation;