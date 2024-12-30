import { editorialsCovers, editorialsCoversMbl, editorialsParallaxHero } from "../assets/js/images";
import HeroEditorials from "../components/EditorialsPage/HeroEditorials";
import SwiperEditorialCard from "../components/EditorialsPage/SwiperEditorialCard";
import EditorialsPageSeo from "./SEO/EditorialsPageSeo";
import LoaderEditorials from "../components/Loaders/LoaderEditorials";
import TextAnimation from "../components/General/TextAnimation";
import { useMediaQuery } from "../contexts/MediaQueryContext";
import { useTranslation } from "react-i18next";

const EditorialsPage = ({ isVisited }) => {
  const { isMobile } = useMediaQuery();
  const { t } = useTranslation();

  return (
    <div data-barba="container">
      <EditorialsPageSeo editorialsParallaxHero={editorialsParallaxHero} />

      <section className="editorials__section-hero">
        <div className="d--vh-100 flex overflow--x-clip">
          {isVisited ? (
            <HeroEditorials images={editorialsParallaxHero} />
          ) : (
            <LoaderEditorials images={editorialsParallaxHero} />
          )}
        </div>
      </section>

      <section className="editorials__section-text-animation">
        <div
          className={`${isMobile ? "d--h-100 p--y-0" : "d--vh-100 p--y-5"
            } align-content--center position--relative z-index--5`}
        >
          <TextAnimation text={t(`editorials.section.textAnimation.${isMobile ? "mobile" : "desktop"}`)} />
        </div>
      </section>

      <section className="editorials__section-cards">
        <div className={`${isMobile ? "p--y-0" : "p--y-5"} overflow--clip`}>
          <SwiperEditorialCard images={isMobile ? editorialsCoversMbl : editorialsCovers} />
        </div>
      </section>
    </div>
  );
};

export default EditorialsPage;
