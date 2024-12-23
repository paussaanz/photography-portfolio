import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const FloatingButton = () => {
  const { theme, setThemeMode } = useTheme();
  const isDarkMode = theme === 'dark-theme';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [paletteImage, setPaletteImage] = useState('/palette.svg');

  const availableThemes = [
    { id: 'light-theme', color: 'var(--cor-button-light)' },
    { id: 'dark-theme', color: 'var(--cor-button-dark)' },
    { id: 'green-theme', color: 'var(--cor-button-green)' },
    { id: 'purple-theme', color: 'var(--cor-button-purple)' },
  ];
  const filteredThemes = availableThemes.filter((t) => t.id !== theme);

  useEffect(() => {
    let timeouts = [];

    if (isMenuOpen) {
      // Animación al abrir el menú
      timeouts = [
        setTimeout(() => setPaletteImage('/palette-2.svg'), 100),
        setTimeout(() => setPaletteImage('/palette-3.svg'), 200),
        setTimeout(() => setPaletteImage('/palette-4.svg'), 300),
      ];
    } else {
      // Animación inversa al cerrar el menú
      timeouts = [
        setTimeout(() => setPaletteImage('/palette-3.svg'), 100),
        setTimeout(() => setPaletteImage('/palette-2.svg'), 200),
        setTimeout(() => setPaletteImage('/palette.svg'), 300),
      ];
    }

    return () => {
      // Cleanup de timeouts
      timeouts.forEach(clearTimeout);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <>
      <div className="floatingButton theme__button-container" style={{ filter: 'url(#goo)' }} >
        <input
          type="checkbox"
          className="floatingButton-open"
          name="floatingButton-open"
          id="floatingButton-open"
          onChange={toggleMenu}
          checked={isMenuOpen}
        />
        <label data-hover="a" style={{ background: isDarkMode ? "var(--cor-secondary)" : "var(--cor-secondary)" }} className="floatingButton-open-button" htmlFor="floatingButton-open">
          <img src={paletteImage} />
        </label>

        {filteredThemes.map((themeOption) => (
          <a
            key={themeOption.id}
            onClick={() => setThemeMode(themeOption.id)}
            style={{ background: themeOption.color }}
            className="floatingButton-item"
          />
        ))}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="svg-filters"
        aria-hidden="true"
      >
        <defs>
          <filter id="shadowed-goo">
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feColorMatrix
              in="shadow"
              mode="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
              result="shadow"
            />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feComposite in2="shadow" in="goo" result="goo" />
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default FloatingButton;
