import { useState } from "react";
import "./NewAnimatedButton.scss";

const NewAnimatedButton = ({ text, onClick, isSelected, extraClassNames }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    // Aplicar clase temporal de "clicked"
    setIsClicked(true);

    // Remover la clase después de 300ms (duración de la animación)
    setTimeout(() => {
      setIsClicked(false);
    }, 300);

    // Ejecutar la función onClick si se proporciona
    if (onClick) onClick(e);
  };

  return (
    <div
      data-hover="a"
      onClick={handleClick}
      className={`new-animated-button ${extraClassNames || ""} ${isSelected ? "selected" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Texto dentro del botón */}
      <div className={`button-text ${isHovered || isSelected ? "hovered" : ""}`}>{text}</div>

      {/* Círculo que crece en hover y se anima en clic */}
      <span
        className={`hover-circle ${isHovered || isSelected ? "expanded" : ""} ${isClicked ? "clicked" : ""} ${isSelected ? "selected" : ""}`}
      ></span>
    </div>
  );
};

export default NewAnimatedButton;
