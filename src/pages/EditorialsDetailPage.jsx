import EditorialsDetailPageSeo from "./SEO/EditorialsDetailPageSeo";
import HeroEditorialsDetail from "../components/EditorialsDetailPage/HeroEditorialsDetail";
import FirstSectionEditorials from "../components/EditorialsDetailPage/FirstSectionEditorials";
import SecondSectionEditorials from "../components/EditorialsDetailPage/SecondSectionEditorials";
import ThirdSectionEditorials from "../components/EditorialsDetailPage/ThirdSectionEditorials";
import FourthSectionEditorials from "../components/EditorialsDetailPage/FourthSectionEditorials";
import { useLocation } from "react-router-dom";
import FifthSectionEditorials from "../components/EditorialsDetailPage/FifthSectionEditorials";

const EditorialsDetailPage = ({ images }) => {

  const location = useLocation(); // Captura la ubicación actual para detectar cambios de ruta 

  return (
    <div data-barba="container" className={`background--primary-${location.pathname.split("/")[2]} text-color--secondary-${location.pathname.split("/")[2]}`}>
      <EditorialsDetailPageSeo />
      <section className="editorials-detail__hero-section d--vh-100">
        <HeroEditorialsDetail images={images} />
      </section>
      <section className="editorials-detail__first-section__container container-bem">
        <FirstSectionEditorials images={images} />
      </section>
      <section className="editorials-detail__second-section__container p--b-5 container-bem">
        <SecondSectionEditorials images={images} />
      </section>
      <section className="p--y-5 container-bem d--vh-100 d--h-100-mbl">
        <ThirdSectionEditorials images={images} />
      </section >
      <section className="editorials-detail__fifth-section__container p--b-5">
        <FifthSectionEditorials images={images}/>
      </section>
      <section className="editorials-detail__fourth-section__container ">
        <FourthSectionEditorials images={images.fourthSection} />
      </section>
    </div>
  );
};

export default EditorialsDetailPage;