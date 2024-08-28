/**
 * Función para filtrar documentos basados en el tipo y la categoría.
 * Esta función se activa cuando se cambia la selección en los filtros de tipo de documento o categoría de documento.
 * Desactiva los otros botones de filtro y activa el seleccionado.
 * Luego, realiza una solicitud AJAX para obtener los documentos filtrados y los muestra en el contenedor de documentación.
 */
function filterDocuments() {
    $('.doc-type-filter .doc-filter-check, .doc-cat-filter .doc-filter-check').on('change', function () {
        $("#container-documentation").html('');
        $("#loading").show();
        $("#moreDocs").addClass("d-none");
        let filterClass = $(this).closest('div').attr('class');
        $('.' + filterClass + ' .doc-filter-check').not(this).prop('checked', false);
        let btn = $(this).closest('.col-auto, .form-check').find('.btn, .form-check');
        if (btn.hasClass('active')) {
            btn.removeClass('active');
        } else {
            $('.' + filterClass + ' .btn, .form-check').removeClass('active');
            btn.addClass('active');
        }
        let selectedCategory = $(".doc-cat-filter .doc-filter-check:checked").data("filter");
        let selectedType = $(".doc-type-filter .doc-filter-check:checked").data("filter");
        let data = {
            action: "filterDocs_ajax",
            category: selectedCategory,
            type: selectedType,
        };
        $.ajax({
            url: pepenunez_form.ajaxUrl,
            data,
            type: "post",
            success: function (res) {
                $("#loading").hide()
                $("#container-documentation").html(res.html);
                if (res.more > 1) {
                    $("#moreDocs").removeClass("d-none");
                } else {
                    $("#moreDocs").addClass("d-none");

                }
            },
            error: function (err) {
                console.log(err);
                $("#loading").hide()
            },
        });
    });
}

/**
 * Función para cargar más documentos.
 * Esta función se activa cuando se hace clic en el botón "Más".
 * Realiza una solicitud AJAX para obtener más documentos basados en el tipo y la categoría seleccionados y los añade al contenedor de documentación.
 * Incrementa la variable de página para la próxima solicitud.
 */
function loadMoreDocuments() {
    let page = 2;
    $("#moreDocs").click(function () {
        $("#loading").show();
        $("#moreDocs").addClass("d-none");
        let selectedCategory = $(".doc-cat-filter .doc-filter-check:checked").data("filter");
        let selectedType = $(".doc-type-filter .doc-filter-check:checked").data("filter");
        let data = {
            action: "moreDocs",
            page: page,
            category: selectedCategory,
            type: selectedType,
        };
        $.ajax({
            url: pepenunez_form.ajaxUrl,
            data,
            type: "post",
            success: function (res) {
                $("#loading").hide()
                $("#container-documentation").append(res.html);
                if (res.more > 1) {
                    $("#moreDocs").removeClass("d-none");
                } else {
                    $("#moreDocs").addClass("d-none");
                }
                page++;
            },
            error: function (err) {
                console.log(err);
                $("#loading").hide()
            },
        });
    });

}

/**
 * Función para filtrar post  basados en  la categoría.
 * Esta función se activa cuando se cambia la selección en los filtros de categoria de post.
 * Desactiva los otros botones de filtro y activa el seleccionado.
 * Luego, realiza una solicitud AJAX para obtener los post filtrado.
 */
function filterBlog() {
    $('.blog-cat-filter .blog-filter-check').on('change', function () {
        $("#container-articulos-destacados").html('');
        $("#loadingDestacados").show();
        let filterClass = $(this).closest('div').attr('class');
        $('.' + filterClass + ' .blog-filter-check').not(this).prop('checked', false);
        let btn = $(this).closest('.col-auto, .form-check').find('.btn, .form-check');
        if (btn.hasClass('active')) {
            btn.removeClass('active');
        } else {
            $('.' + filterClass + ' .btn, .form-check').removeClass('active');
            btn.addClass('active');
        }

        let selectedCategory = $(".blog-cat-filter .blog-filter-check:checked").data("filter");
        let data = {
            action: "filterBlog_ajax",
            category: selectedCategory,
        };
        $.ajax({
            url: pepenunez_form.ajaxUrl,
            data,
            type: "post",
            success: function (res) {
                $("#loadingDestacados").hide()
                $("#container-articulos-destacados").html(res.html);
            },
            error: function (err) {
                console.log(err);
                $("#loadingDestacados").hide()
            },
        });
    });
}

/**
 * Función para cargar máspsot.
 * Esta función se activa cuando se hace clic en el botón "Más".
 * Realiza una solicitud AJAX para obtener mas post restantes y los añade al contenedor de post.
 * Incrementa la variable de página para la próxima solicitud.
 */
function loadMoreBlog() {
    let page = 2;
    $("#morePost").click(function () {
        $("#loading").show();
        let data = {
            action: "moreBlog",
            page: page,
        };
        $.ajax({
            url: pepenunez_form.ajaxUrl,
            data,
            type: "post",
            success: function (res) {
                $("#loading").hide()
                $("#container-otros-articulos").append(res.html);
                console.log(res.more);
                if (res.more > 1) {
                    $("#morePost").removeClass("d-none");
                } else {
                    $("#morePost").addClass("d-none");
                }
                page++;
            },
            error: function (err) {
                console.log(err);
                $("#loading").hide()
            },
        });
    });
}

function filterSwiperAscensores() {
    $('.ascensores-cat-filter .ascensores-filter-check').on('change', function () {
        $("#container-swiper-ascensores").html('');
        $("#loadingAscensores").show();
        let filterClass = $(this).closest('div').attr('class');
        $('.' + filterClass + ' .ascensores-filter-check').not(this).prop('checked', false);
        let btn = $(this).closest('.col-auto, .form-check').find('.btn, .form-check');
        if (btn.hasClass('activo')) {
            btn.removeClass('activo');
        } else {
            $('.' + filterClass + ' .btn, .form-check').removeClass('activo');
            btn.addClass('activo');
        }
        let secectedCat = $(".ascensores-cat-filter .ascensores-filter-check:checked").data("filter");
        let category_actual = $("#container-swiper-ascensores").data("category-actual");
        let data = {
            action: "filtroAscensores",
            category: secectedCat,
            category_actual: category_actual,
        };
        $.ajax({
            url: pepenunez_form.ajaxUrl,
            data,
            type: "post",
            success: function (res) {
                $("#loadingAscensores").hide()
                $("#container-swiper-ascensores").html(res.html);
                if (swiperProductos) {
                    swiperProductos.destroy();
                }
                swipersAscensores();
            },
            error: function (err) {
                console.log(err);
                $("#loadingAscensores").hide()
            },
        });
    });
}