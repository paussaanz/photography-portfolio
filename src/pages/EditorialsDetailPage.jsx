import EditorialsDetailPageSeo from "./SEO/EditorialsDetailPageSeo";
import HeroEditorialsDetail from "../components/EditorialsDetailPage/HeroEditorialsDetail";
import './EditorialsDetail.scss';
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

const EditorialsPage = () => {
  const containerRef = useRef(null);
  const largeImageRef = useRef(null);
  const targetImageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Configura la animación
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current, // El contenedor principal
        start: "top top", // Comienza cuando el contenedor entra al centro
        end: "bottom center", // Termina cuando el contenedor sale del centro
        scrub: 1, // Suaviza la animación sincronizada con el scroll
      },
    })
      .fromTo(
        largeImageRef.current,
        {
          x: 0,
          y: 0,
          scale: 1
        },
        {
          x: () => {
            const targetBounds = targetImageRef.current.getBoundingClientRect();
            const largeImageBounds = largeImageRef.current.getBoundingClientRect();
            return targetBounds.left - largeImageBounds.left;
          },
          y: () => {
            const targetBounds = targetImageRef.current.getBoundingClientRect();
            const largeImageBounds = largeImageRef.current.getBoundingClientRect();
            return targetBounds.top - largeImageBounds.top;
          },
          scale: 0.5, // Escala final
          ease: "power1.out",
        }
      );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div data-barba="container" className="background--primary-greece">
      <EditorialsDetailPageSeo />
      <section className="editorials-detail__hero-section d--vh-100">
        <HeroEditorialsDetail />
      </section>

      <section ref={containerRef} className="editorials-detail__main-section  p--5 text-color--secondary-greece">
        <div className="editorials-detail__main-section__container flex">
          <div className="editorials-detail__main-section__container__text">
            <h2 className="text-color--secondary-greece">Exploring the Intriguing Blend of LIFESTYLE AND PERFORMANCE ON BOARD</h2>
            <p className="text-color--secondary-greece">This lifestyle fosters a deep connection with nature. From swimming in crystal-clear waters to sunbathing on the deck, the sea becomes your playground. Freshly caught fish, paired with local produce, create delectable meals enjoyed under the open sky. Evenings are a symphony of colors as the sunsets cast a warm golden glow over the horizon. With no fixed address, you have the freedom to sail from one idyllic island to another, discovering the rich history, vibrant culture, and charming coastal towns that Greece has to offer.
              Living on a sailing boat in Greece is an embodiment of freedom, simplicity, and a deep appreciation for the wonders of the natural world. It is an invitation to slow down, embrace the serenity of the sea, and create unforgettable memories against the backdrop of the stunning Greek landscape.</p>
          </div>
          <div ref={largeImageRef} className="editorials-detail__main-section__container__img">
            <img src="/editorials/slide-5.webp" alt="Slide 5" />
          </div>
        </div>

        <div className="editorials-detail__main-section__thumbnails flex">
          <div className="editorials-detail__main-section__thumbnails__text flex">
            <p className="editorials-detail__main-section__thumbnails__text--content">Living on a sailing boat in Greece offers a unique and enchanting lifestyle surrounded by the breathtaking beauty of the Mediterranean. Imagine waking up to the gentle sounds of waves lapping against the hull and the soft caress of the sea breeze. Everyday life becomes a harmonious dance between the elements and the simplicity of living with the essentials.</p>
          </div>
          <div className="editorials-detail__main-section__thumbnails__images flex">
            <img src="/editorials/slide-5.webp" alt="Slide 5" className="editorials-detail__main-section__thumbnails__image" />
            <img ref={targetImageRef} src="/editorials/slide-5.webp" alt="Slide 5" className="editorials-detail__main-section__thumbnails__image" />
          </div>
        </div>

        <div className="editorials-detail__main-section__thumbnails flex">
          <div className="editorials-detail__main-section__thumbnails__text flex">
            <img src="/editorials/slide-5.webp" alt="Slide 5" className="editorials-detail__main-section__thumbnails__image" />
          </div>
          <div className="editorials-detail__main-section__thumbnails__images flex">
            <div className="editorials-detail__main-section__thumbnails__images--content"><p>PHOTOGRAPHY AND<br /> DESIGN BY .SYP!</p></div>
            <img src="/editorials/slide-5.webp" alt="Slide 5" className="editorials-detail__main-section__thumbnails__image" />
          </div>
        </div>

      </section>

      <section className="p--5">
        <div className="editorials-detail__main-section__long-image" style={{ background: 'url("/editorials/slide-5.webp")', backgroundSize: "cover", backgroundPosition: "center", height: '410px' }} />

        <p className="editorials-detail__long-image-paragraph text-color--secondary-greece">
          Living on a sailing boat in Greece offers a unique and enchanting lifestyle surrounded by the breathtaking beauty of the Mediterranean. Imagine waking up to the gentle sounds of waves lapping against the hull and the soft caress of the sea breeze. Everyday life becomes a harmonious dance between the elements and the simplicity of living with the essentials. The open seas become your backyard, inviting you to explore hidden coves, secret beaches, and pristine coastlines. Living on a sailing boat in Greece offers a unique and enchanting lifestyle surrounded by the breathtaking beauty of the Mediterranean. Imagine waking up to the gentle sounds of waves lapping against the hull and the soft caress of the sea breeze. Everyday life becomes a harmonious dance between the elements and the simplicity of living with the essentials. The open seas become your backyard, inviting you to explore hidden coves, secret beaches, and pristine coastlines.
        </p>
      </section>

      <section className="p--5">
        <h1 className="editorials-detail__sub-section__title">Exploring the Breathtaking Landscapes of the Greek Islands</h1>

        <div className="editorials-detail__sub-section__container flex">
          <div className="editorials-detail__sub-section__container__image">
            <img src="/editorials/slide-5.webp" alt="Slide 5" />
          </div>
          <div className="editorials-detail__sub-section__container__mixed">
            <div className="editorials-detail__sub-section__container__mixed__image">
              <img src="/editorials/slide-5.webp" alt="Slide 5" />
            </div>
            <div className="editorials-detail__sub-section__container__mixed__text">
              <p className="text-color--secondary-greece">Each island in Greece possesses its own unique character and charm. From the volcanic wonders of Santorini, with its iconic blue-domed churches overlooking the caldera, to the lush greenery of Corfu, where olive trees sway in the gentle breeze, the Greek islands offer a tapestry of landscapes that capture the imagination and leave an indelible mark on the soul.</p>
              <p className="text-color--secondary-greece">Picture-perfect villages adorned with whitewashed houses and vibrant bougainvillea cascading along narrow alleyways create a postcard-worthy backdrop. The tranquility of these idyllic settlements invite exploration, with each step revealing a new discovery, whether it's a hidden taverna serving delectable local cuisine or a centuries-old church steeped in history.</p>
            </div>
          </div>
        </div>
      </section >

      <section className="p--5">
        <div
          style={{
            background: 'url("/editorials/slide-5.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="editorials-detail__end-section__container flex d--vh-150"
        >
          <img src="/editorials/slide-5.webp" alt="Slide 5" className="editorials-detail__end-section__container__image" />
        </div>
      </section>

    </div >
  );
};

export default EditorialsPage;
