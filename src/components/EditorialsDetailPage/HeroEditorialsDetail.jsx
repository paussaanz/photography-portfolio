import { useTranslation } from "react-i18next";

const HeroEditorialsDetail = ({ images }) => {
  const { heroImage, title, subtitles, heroText, fontSize } = images; // Destructure properties from `images`
  const { t } = useTranslation();

  return (
    <>
      <div className="editorials-detail__hero--image d--vh-50 d--vw-100">
        <img className="d--h-100 d--w-100 object-fit--cover" src={heroImage.src} />
      </div>
      <div className="editorials-detail__hero--title flex flex--col">
        <div className="editorials-detail__hero--title-h2 flex flex--j-between d--w-100">
          {subtitles && subtitles.map((subtitle, i) => (
            <h2 key={i} className="editorials-detail__hero--title-h2">{t(subtitle)}</h2>
          ))}
        </div>
        <h1 className="editorials-detail__hero--title-h1" style={{ fontSize: fontSize }}>{t(title)}</h1>
      </div>

      <div className="editorials-detail__hero--text">
        <p>{t(heroText)}</p>
      </div>
    </>
  );
};

export default HeroEditorialsDetail;
