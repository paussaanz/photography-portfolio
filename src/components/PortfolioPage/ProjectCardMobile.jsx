import { Link } from "react-router-dom";

const ProjectCardMobile = ({ images }) => {
  return (
    <div>
      <div className="mobile__portfolio-card-column">
        {images.map((image, index) => (
          <Link to={image.url} className="text-decoration--none">
            <div className="mobile__card" key={index}>
              <div className="mobile__card-image-wrapper">
                <img src={image.src} alt={image.title} className="mobile__card-image" />
              </div>
              <p className="text-color--primary h4 m--t-2">{image.title}</p>
              <p className="text-color--primary b4">{image.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectCardMobile;
