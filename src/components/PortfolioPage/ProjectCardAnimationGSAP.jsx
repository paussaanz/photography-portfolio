import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { portfolioCardAnimation } from '../../assets/js/images';

const ProjectCardAnimation = ({ homeSwiperImages }) => {


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const slides = gsap.utils.toArray('.slide');
    const activeSlideImages = gsap.utils.toArray('.active-slide img');

    function getInitialTranslateZ(slide) {
      const style = window.getComputedStyle(slide);
      const matrix = style.transform.match(/matrix3d\((.+)\)/);
      if (matrix) {
        const values = matrix[1].split(", ");
        return parseFloat(values[14] || 0);
      }
      return 0;
    }

    function mapRange(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    slides.forEach((slide, i) => {
      const initialZ = getInitialTranslateZ(slide);

      ScrollTrigger.create({
        trigger: ".card-3d__animation-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 5,
        onUpdate: (self) => {
          const progress = self.progress;
          const zIncrement = progress * 10000;
          const currentZ = initialZ + zIncrement;
          let opacity;

          //OPACIDAD DE LAS SLIDES
          if (currentZ > -2500) {

            opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
          } else {
            opacity = mapRange(currentZ, -5000, -2500, 0.2, 0.5);
          }

          slide.style.opacity = opacity;
          slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

          //OPACIDAD DE LOS FONDOS
          if (currentZ < 640) {
            let minZ = -3000;     // Valor mínimo donde opacidad es 0
            let maxZ = 700;   // Valor máximo donde opacidad es 1
            let progress = gsap.utils.clamp(0, 1, (currentZ - minZ) / (maxZ - minZ));
            // Si currentZ es menor a 640, animar opacidad al valor calculado de progress
            gsap.to(activeSlideImages[i], {
              opacity: progress,
              duration: 1.5,
              ease: "power3.out"
            });
            console.log(activeSlideImages[i])
          } else {
            // Si currentZ es mayor o igual a 640, reducir opacidad a 0 con animación suave
            gsap.to(activeSlideImages[i], {
              opacity: 0,  // Asegurar que opacidad es 1
              duration: 1.5,
              ease: "power3.out"
            });
          }

        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Empty dependency array ensures this runs only once after the component mounts.



  return (
    <div className="card-3d__animation-container">
      <div className="active-slide position--absolute position--top-0 position--left-0 d--w-100 d--h-100 overflow-hidden">
        {portfolioCardAnimation.map((image, index) => (
          <div className="bg-images">
            <img className="position--absolute" src={image.src} alt="" />
          </div>
        ))}
      </div>

      <div className="slider position--sticky position--top-0 d--vw-100 d--vh-100">
        {portfolioCardAnimation.map((image, index) => (
          <div key={index} className="slide d--vh-100 position--absolute overflow--hidden flex flex--col flex--j-center" id={`slide-${index + 1}`}>
            <a href={image.url} className="text-decoration--none">
              <div className={`slide-img`}>
                <img className="d--vh-50 d--w-100 object-fit--cover slide-img" src={image.src} alt="" />
              </div>
              <div className='slide-copy text-transform--uppercase text-align--center text-color--light'>
                <p className="m--0">{image.name} - {image.date}</p>
                <p className="m--0">{image.description}</p>
              </div>
            </a>
          </div>

        ))}

      </div>



    </div >
  );

};

export default ProjectCardAnimation;
