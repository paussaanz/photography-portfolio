import EditorialsDetailPageSeo from "./SEO/EditorialsDetailPageSeo";
import HeroEditorialsDetail from "../components/EditorialsDetailPage/HeroEditorialsDetail";

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
    </div>
  );
};

export default EditorialsPage;
