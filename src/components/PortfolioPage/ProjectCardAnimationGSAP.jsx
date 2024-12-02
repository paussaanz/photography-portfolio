import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { portfolioCardAnimation } from '../../assets/js/images';
import { Link } from 'react-router-dom';

const ProjectCardAnimation = ({ homeSwiperImages }) => {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!container.current) return;

    const slides = container.current.querySelectorAll('.card-3d__animation-slide'); // Selección dentro del contenedor
    const activeSlide = container.current.querySelector('.card-3d__animation-active-slide'); // Selección del contenedor
    const activeSlideImages = container.current.querySelectorAll('.card-3d__animation-active-slide--image'); // Selección de imágenes dentro de .active-slide


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
        trigger: container.current,
        start: "top center",
        end: "bottom bottom",

        onUpdate: (self) => {
          const progress = self.progress;

          gsap.to(activeSlide, {
            opacity: progress * 100,
            ease: "power4.out",
            duration: 0.5
          });

          
        }
      }); 
      
      ScrollTrigger.create({
        trigger: container.current,
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

          if (currentZ >= -1300 && currentZ <= 1000) {
            // Dentro del tramo [-1300, 640], la opacidad es 1
            gsap.to(activeSlideImages[i], {
              opacity: 1,
              duration: 0.5, // Suaviza la transición si entra al rango
              ease: "power3.out"
            });
          } else {
            // Fuera del tramo [-1300, 640], la opacidad es 0
            gsap.to(activeSlideImages[i], {
              opacity: 0,
              duration: 0.5, // Suaviza la transición si sale del rango
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
    
    <div ref={container} className="card-3d__animation-container">
      <div className="card-3d__animation-active-slide">
        {portfolioCardAnimation.map((image, index) => (
          <img className={`card-3d__animation-active-slide--image card-3d__animation-active-slide--image-${index + 1}`} src={image.src} alt="" loading="lazy" />
        ))}
      </div>

      <div className="card-3d__animation-slider">
        {portfolioCardAnimation.map((image, index) => (
          <div key={index} className="card-3d__animation-slide" id={`slide-${index + 1}`}>
            <Link to={image.url} className="text-decoration--none">
              <div className={`slide-img`}>
                <img className="d--vh-50 d--w-100 object-fit--cover slide-img" src={image.src} alt="" loading="lazy" />
              </div>
              <div className='slide-copy flex flex--row text-transform--uppercase text-align--center text-color--light m--t-3'>
                <p className="m--0 h4">{image.name}</p>
                <p className="m--0 h6">{image.date}</p>

                {/* <p className="m--0">{image.description}</p> */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div >
  );

};

export default ProjectCardAnimation;
