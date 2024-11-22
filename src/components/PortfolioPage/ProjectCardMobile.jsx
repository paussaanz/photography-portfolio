const ProjectCardMobile = ({ cards }) => {
    return (
      <div>
        <div className="card-column">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <div className="card__image-wrapper">
                <img src={card.image} alt={card.title} className="card__image" />
              </div>
              <p className="text-color--primary h4 m--t-2">{card.title}</p>
              <p className="text-color--primary b4">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProjectCardMobile;
  