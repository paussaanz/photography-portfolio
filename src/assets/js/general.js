document.addEventListener("DOMContentLoaded", () => {
    // Iniciamos las funciones
    initGeneral();
});
let swiperProductos;

function initGeneral() {
    console.log("Pepenunez Loaded")
    // menuNavBar()
    imagenClickable()
    filterDocuments();
    loadMoreDocuments();
    filterBlog();
    swipers()
    loadMoreBlog();
    imagenConfigurador();
    forms();
    filterSwiperAscensores();
    setupHeaderHover();
    initMap();
    initForms();
    initJqueryValidations();
    imagenClickableInspiracion();
    alturaFormularioPresupuesto();
    closeModal()
}



// function menuNavBar() {
//     $(document).ready(function () {
//         let $menu = $('#menu-nav-bar');
//         let $items = $menu.find('li');
//         let $lastItem = $items.last();

//         $items.slice(0, 3).wrapAll('<div class="menu-left"></div>');
//         $lastItem.wrap('<div class="menu-right"></div>');

//         $('.menu-left').insertBefore('.navbar-brand');
//         $('.menu-right').insertAfter('.navbar-brand');
//     });
// }
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


function alturaFormularioPresupuesto() {
    $('#presupuestoFormModal').on('shown.bs.modal', function () {
        let $rowElement = $('.header-form-presupuesto');

        if ($rowElement.length === 0) {
            console.error('El elemento con la clase "header-form-presupuesto" no fue encontrado.');
            return;
        }

        let rowHeight = $rowElement.outerHeight();
        console.log("Altura del elemento:", rowHeight);

        let parentHeight = $rowElement.parent().outerHeight();
        console.log("Altura del padre:", parentHeight);

        let resultHeight = parentHeight - rowHeight;
        console.log("Altura resultante:", resultHeight);

        $('.h-header-form').height(resultHeight);
    });

}


function imagenClickableInspiracion() {
    $('.imagenClickableInspiracion').click(function () {
        let imageSrc = $(this).data('image');
        $('#modalImageInspiracion').attr('src', imageSrc);
        $('#imageModalInspiracion').modal('show')
    })
}

function imagenClickable() {
    $('.imagenClickable').click(function () {
        let imageSrc = $(this).data('image');

        // Clear previous slides
        $('#swiperModalWrapper').empty();

        // Append all images from the main Swiper to the modal Swiper
        $('.swiper-galeria .swiper-slide').each(function () {
            let imgSrc = $(this).data('image');
            $('#swiperModalWrapper').append(`
                    <div class="swiper-slide custom-swiper-slide d-flex justify-content-center align-items-center">
                        <img src="${imgSrc}" class="img-fluid image-swiper-modal" alt="Imagen ampliada">
                    </div>
                `);
        });

        // Initialize the modal Swiper
        initializeModalSwiper();

        // Open the modal
        $('#imageModal').modal('show');

        // Navigate to the clicked image in the modal Swiper
        const clickedIndex = $(this).index();
        $('.swiper-modal')[0].swiper.slideTo(clickedIndex);
    });
}



function imagenConfigurador() {
    let initialAccordion = $('.accordion-collapse.show');
    let initialImage = initialAccordion.find('.button-configurador.active').data('image');
    $('#configurador-imagen, #configurador-imagen-md').attr('src', initialImage);


    $('.button-configurador').click(function () {
        let imageSrc = $(this).data('image');
        $('#configurador-imagen, #configurador-imagen-md').attr('src', imageSrc);
        $('.button-configurador').removeClass('activo')
        $(this).addClass('activo')
    })

    $('.accordion-button').on('click', function () {
        let parent = $(this).closest('.accordion-item');
        let collapse = parent.find('.accordion-collapse');

        if (!collapse.hasClass('show')) {
            collapse.one('shown.bs.collapse', function () {
                let firstOption = parent.find('.button-configurador').first();
                $('.button-configurador').removeClass('activo');
                firstOption.addClass('activo');
                let newImage = firstOption.data('image');
                $('#configurador-imagen, #configurador-imagen-md').attr('src', newImage);
            });
        }
    });
}

$(window).on('resize', function () {
    setupHeaderHover()
});

function setupHeaderHover() {
    // Limpia cualquier evento anterior para evitar múltiples ataduras de eventos
    $('header li.dropdown').off('hover click');
    $('header li.dropend').off('hover click');
    if (window.matchMedia("(min-width: 768px)").matches) {
        // Comportamiento para pantallas grandes (hover)
        $('header li.dropdown').hover(function () {
            $(this).addClass('show');
            $(this).find('.dropdown-vertical').addClass('show').removeClass('d-none');
        }, function () {
            $(this).removeClass('show');
            $(this).find('.dropdown-vertical').removeClass('show').addClass('d-none');
        });
        $('header li.dropend').hover(function () {
            $(this).addClass('show');
            $(this).find('.dropend-horizontal').addClass('show').removeClass('d-none');
        }, function () {
            $(this).removeClass('show');
            $(this).find('.dropend-horizontal').removeClass('show').addClass('d-none');
        });
    } else {
        // Comportamiento para pantallas pequeñas (click)
        $('header li.dropdown').click(function () {
            $(this).toggleClass('show');
            $(this).find('.dropdown-vertical').toggleClass('show').toggleClass('d-none');
        });
    }
}

function closeModal() {

    $(document).ready(function () {
        $(document).on('click', function (event) {
            let modal = $('#imageModal');
            if (modal.is(':visible') && !$(event.target).closest('.image-swiper-modal, .swiper-button-next, .swiper-button-prev').length) {
                modal.modal('hide');
            }

        });

        // Evitar que el clic dentro del contenido cierre el modal
        $('.image-swiper-modal').on('click', function (event) {
            event.stopPropagation();
        });
    });
}

