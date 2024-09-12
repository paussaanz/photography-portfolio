import ProjectCard from '../General/ProjectCard';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const ProjectCardAnimation = ({ homeSwiperImages }) => {

  // const lerp = (start, end, alpha) => {
  //   return start * (1 - alpha) + end * alpha;
  // };

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

    // Animation timeline for background and slide images
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container-card-animation",
        start: "bottom top",
        end: "bottom top",
        scrub: true,
        toggleActions: 'none none'
      }
    });

    // Start with a solid background color
    gsap.set(".container-card-animation", {
      backgroundImage: 'linear-gradient(to top, var(--bs-primary) 50%, transparent 100%)'
    });
    
    tl.to(".container-card-animation", {
      backgroundImage: 'linear-gradient(to top, transparent 0%, transparent 100%)',
      ease: "none"
    });

    slides.forEach((slide, i) => {
      const initialZ = getInitialTranslateZ(slide);

      ScrollTrigger.create({
        trigger: ".container-card-animation",
        start: "top top",
        end: "bottom bottom",
        scrub: 5,
        onUpdate: (self) => {
          const progress = self.progress;
          const zIncrement = progress * 18200;
          const currentZ = initialZ + zIncrement;
          let opacity;
          if (currentZ > -2500) {

            opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
          } else {
            opacity = mapRange(currentZ, -5000, -2500, 0.2, 0.5);
          }

          slide.style.opacity = opacity;
          slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;


          if (currentZ < 640) {
            gsap.to(activeSlideImages[i], 1.5, {
              opacity: progress ? 1 : 0,
              ease: "power3.out"
            });
          } else {

            gsap.to(activeSlideImages[i], 1.5, {
              opacity: 0,
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
    <div className="w-100 vh-300 container-card-animation position-relative">
      <div className="active-slide position-absolute top-0 left-0 w-100 h-100 overflow-hidden">
        <img className="position-absolute" src="../../../CR1.jpg" />
        <img className="position-absolute" src="../../../Diphda1.jpg" />
        <img className="position-absolute" src="../../../Diphda1.jpg" />
        <img className="position-absolute" src="../../../CR1.jpg" />
        <img className="position-absolute" src="../../../Diphda1.jpg" />
        <img className="position-absolute" src="../../../CR1.jpg" />
      </div>
      <div className="slider position-sticky top-0 vw-100 vh-100">

        <div className="slide vh-100 position-absolute overflow-hidden d-flex flex-column justify-content-center" id="slide-1">
          <div className={`slide-img `}>
            <img className="vh-50 w-100 object-fit-cover slide-img" src="../../../CR1.jpg" alt="" />
          </div>

          <div className='slide-copy text-uppercase text-center text-white'>
            <p className="m-0">NATURE - 2025</p>
            <p className="m-0">pruebaa</p>
          </div>
        </div>


        <div className="slide vh-100 position-absolute overflow-hidden d-flex flex-column justify-content-center" id="slide-2">
          <div className={`slide-img `}>
            <img className="vh-50 w-100 object-fit-cover slide-img" src="../../../CR1.jpg" alt="" />
          </div>

          <div className='slide-copy text-uppercase text-center text-white'>
            <p className="m-0">NATURE - 2025</p>
            <p className="m-0">pruebaa</p>
          </div>
        </div>

        <div className="slide vh-100 position-absolute overflow-hidden d-flex flex-column justify-content-center" id="slide-3">
          <div className={`slide-img `}>
            <img className="vh-50 w-100 object-fit-cover slide-img" src="../../../CR1.jpg" alt="" />
          </div>

          <div className='slide-copy text-uppercase text-center text-white'>
            <p className="m-0">NATURE - 2025</p>
            <p className="m-0">pruebaa</p>
          </div>
        </div>

        <div className="slide vh-100 position-absolute overflow-hidden d-flex flex-column justify-content-center" id="slide-4">
          <div className={`slide-img `}>
            <img className="vh-50 w-100 object-fit-cover slide-img" src="../../../CR1.jpg" alt="" />
          </div>

          <div className='slide-copy text-uppercase text-center text-white'>
            <p className="m-0">NATURE - 2025</p>
            <p className="m-0">pruebaa</p>
          </div>
        </div>

        <div className="slide vh-100 position-absolute overflow-hidden d-flex flex-column justify-content-center" id="slide-5">
          <div className={`slide-img `}>
            <img className="vh-50 w-100 object-fit-cover slide-img" src="../../../CR1.jpg" alt="" />
          </div>

          <div className='slide-copy text-uppercase text-center text-white'>
            <p className="m-0">NATURE - 2025</p>
            <p className="m-0">pruebaa</p>
          </div>
        </div>

        <div className="slide vh-100 position-absolute overflow-hidden d-flex flex-column justify-content-center" id="slide-6">
          <div className={`slide-img `}>
            <img className="vh-50 w-100 object-fit-cover slide-img" src="../../../CR1.jpg" alt="" />
          </div>

          <div className='slide-copy text-uppercase text-center text-white'>
            <p className="m-0">NATURE - 2025</p>
            <p className="m-0">pruebaa</p>
          </div>
        </div>

      </div>



    </div>
  );

};

export default ProjectCardAnimation;
