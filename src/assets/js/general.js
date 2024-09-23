document.addEventListener("DOMContentLoaded", () => {
    // Iniciamos las funciones
});








function swipers() {

    const swiperSlider = new Swiper(".swiper-flota", {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });
}


