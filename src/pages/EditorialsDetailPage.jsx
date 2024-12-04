import EditorialsDetailPageSeo from "./SEO/EditorialsDetailPageSeo";
import HeroEditorialsDetail from "../components/EditorialsDetailPage/HeroEditorialsDetail";
import './EditorialsDetail.scss';

const EditorialsPage = () => {
  const slides = [
    { src: "/editorials/slide-1.webp", alt: "Slide 1", type: "image" },
    { src: "/editorials/slide-2.webp", alt: "Slide 2", type: "text" },
    { src: "/editorials/slide-3.webp", alt: "Slide 3", type: "custom" },
    { src: "/editorials/slide-4.webp", alt: "Slide 4", type: "custom" },
  ];

  return (
    <div data-barba="container" className="background--primary-greece">
      <EditorialsDetailPageSeo />
      <section className="editorials-detail__hero-section d--vh-100">
        <HeroEditorialsDetail />
      </section>

      <section className="editorials-detail__main-section  p--5 text-color--secondary-greece">
        <div className="editorials-detail__main-section__container flex">
          <div className="editorials-detail__main-section__container__text">
            <h2 className="text-color--secondary-greece">Exploring the Intriguing Blend of LIFESTYLE AND PERFORMANCE ON BOARD</h2>
            <p className="text-color--secondary-greece">This lifestyle fosters a deep connection with nature. From swimming in crystal-clear waters to sunbathing on the deck, the sea becomes your playground. Freshly caught fish, paired with local produce, create delectable meals enjoyed under the open sky. Evenings are a symphony of colors as the sunsets cast a warm golden glow over the horizon. With no fixed address, you have the freedom to sail from one idyllic island to another, discovering the rich history, vibrant culture, and charming coastal towns that Greece has to offer.
              Living on a sailing boat in Greece is an embodiment of freedom, simplicity, and a deep appreciation for the wonders of the natural world. It is an invitation to slow down, embrace the serenity of the sea, and create unforgettable memories against the backdrop of the stunning Greek landscape.</p>
          </div>
          <div className="editorials-detail__main-section__container__img">
            <img src="/editorials/slide-5.webp" alt="Slide 5" />
          </div>
        </div>

        <div className="editorials-detail__main-section__thumbnails flex">
          <div className="editorials-detail__main-section__thumbnails__text flex">
            <p className="editorials-detail__main-section__thumbnails__text--content">Living on a sailing boat in Greece offers a unique and enchanting lifestyle surrounded by the breathtaking beauty of the Mediterranean. Imagine waking up to the gentle sounds of waves lapping against the hull and the soft caress of the sea breeze. Everyday life becomes a harmonious dance between the elements and the simplicity of living with the essentials.</p>
          </div>
          <div className="editorials-detail__main-section__thumbnails__images flex">
            <img src="/editorials/slide-5.webp" alt="Slide 5" className="editorials-detail__main-section__thumbnails__image" />
            <img src="/editorials/slide-5.webp" alt="Slide 5" className="editorials-detail__main-section__thumbnails__image" />
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

      </section >
      <section className="p--5">



        <div className="editorials-detail__main-section__long-image" style={{ background: 'url("/editorials/slide-5.webp")', backgroundSize: "cover", backgroundPosition: "center", height: '410px' }} />

        <p className="editorials-detail__long-image-paragraph text-color--secondary-greece">
          Living on a sailing boat in Greece offers a unique and enchanting lifestyle surrounded by the breathtaking beauty of the Mediterranean. Imagine waking up to the gentle sounds of waves lapping against the hull and the soft caress of the sea breeze. Everyday life becomes a harmonious dance between the elements and the simplicity of living with the essentials. The open seas become your backyard, inviting you to explore hidden coves, secret beaches, and pristine coastlines. Living on a sailing boat in Greece offers a unique and enchanting lifestyle surrounded by the breathtaking beauty of the Mediterranean. Imagine waking up to the gentle sounds of waves lapping against the hull and the soft caress of the sea breeze. Everyday life becomes a harmonious dance between the elements and the simplicity of living with the essentials. The open seas become your backyard, inviting you to explore hidden coves, secret beaches, and pristine coastlines.
        </p>
      </section>

    </div >
  );
};

export default EditorialsPage;
