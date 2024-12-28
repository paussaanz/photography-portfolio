import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    console.log("Cambio de idioma a:", lng);
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language; // Obtiene el idioma actual

  return (
    <div
      data-hover="a"
      className="flex flex--row flex--j-center flex--a-center p--l-4"
      onClick={() => changeLanguage(currentLanguage === 'en' ? 'es' : 'en')} // Cambia entre EN y ES
    >
      <svg width="25" fill="white" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 351.42 351.53">
        <path className="cls-1" d="M236.39,119.63c-.05,6.85,1.18,13.74,1.53,20.55.5,9.98.05,20.08-.06,29.94-.24,20.65-.78,41.39-4.57,61.68h-115.06c-1.65-10.19-3.11-20.65-3.84-30.97-1.04-14.73-.93-29.5-.73-44.13.18-12.42.35-24.71,1.47-37.08h121.26Z" />
        <path className="cls-1" d="M99.4,119.63l-2.28,31.03c-.45,27.21,1.47,54.26,4.52,81.25H9.95c-13.27-34.85-13.27-77.43,0-112.28h89.45Z" />
        <path className="cls-1" d="M249.86,231.91c4.32-37.24,6.3-74.88,2.25-112.28h89.45c3.81,8.31,6.22,18.41,7.64,27.54,4.3,27.54,2.67,58.79-7.64,84.74h-91.7Z" />
        <path className="cls-1" d="M234.14,103.91h-116.77c3.18-34.01,12.73-66.91,22.07-99.57,23.44-5.79,49.18-5.79,72.63,0,9.25,32.66,18.87,65.6,22.07,99.57Z" />
        <path className="cls-1" d="M231.15,247.63c-6.23,34.84-16.18,68.88-29.34,101.65-17.19,2.99-34.88,3-52.1,0-13.16-32.77-23.11-66.81-29.34-101.65h110.78Z" />
        <path className="cls-1" d="M335.94,247.63c-18.55,41.23-53.97,75.73-96.36,91.89-3.92,1.5-14.11,5.43-17.78,5.44-1,0-1.47.13-1.11-1.11.54-1.85,2.23-4.6,2.98-6.76,10.15-29.05,18.85-58.91,23.19-89.46h89.08Z" />
        <path className="cls-1" d="M104.64,247.63c3.85,25.19,9.96,50.34,17.94,74.51,2.12,6.43,6.85,15.78,8.18,21.77.3,1.34.05.99-1.06,1.06-2.9.19-14.38-4.14-17.78-5.44-42.32-16.26-77.88-50.64-96.36-91.9h89.08Z" />
        <path className="cls-1" d="M335.94,103.91h-85.33c-2.84-23.83-7.68-47.33-13.69-70.52-.45-1.75-7.68-24.56-6.14-24.55,46.53,15.5,85.14,50.37,105.16,95.07Z" />
        <path className="cls-1" d="M15.57,103.91C33.17,64.51,65.96,31.84,105.63,14.7c3.26-1.41,11.22-4.99,14.35-5.13,1.6-.07,1.28.44.98,1.74-1.69,7.38-4.49,14.71-6.38,22.07-5.95,23.19-10.94,46.69-13.69,70.52H15.57Z" />
      </svg>

      <div data-hover="a" className="p--l-2 p--t-1">{currentLanguage === 'en' ? 'ES' : 'EN'}</div> {/* Muestra el idioma actual */}
    </div>
  );
};

export default LanguageSwitcher;
