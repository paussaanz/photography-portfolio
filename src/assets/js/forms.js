function forms() {
    //console.log('forms.js cargado');
}

$('#presupuestoFormModal').on('shown.bs.modal', function (e) {
    const prevButton_PE = $('.prevButtonPresupuestoProfesionales');
    let nextButton_PE = $('.nextButtonPresupuestoProfesionales');
    const prevButton_PP = $('.prevButtonPresupuestoParticulares');
    let nextButton_PP = $('.nextButtonPresupuestoParticulares');

    // Maneja el clic en los botones "Siguiente" para Profesionales
    nextButton_PE.on('click', function () {
        let currentStepId = $(this).data('current-step');
        let currentStep = $('#' + currentStepId);

        //if ($('#formPresupuestosProfesionales').valid()) {
        let nextStep = currentStep.next('.step-content-PE');
        let currentStepListItem = $('#listadoPasosProfesionales').find('.pasoActivo');
        let nextStepListItem = currentStepListItem.next('.paso');

        if (nextStep.length) {
            currentStep.addClass('d-none');
            nextStep.removeClass('d-none');
            currentStepListItem.removeClass('pasoActivo').addClass('pasoFinalizado').find('.enMarcha').addClass('d-none').end().find('.completado').removeClass('d-none');
            nextStepListItem.addClass('pasoActivo').find('.enMarcha').removeClass('opacity-0');

            prevButton_PE.removeClass('opacity-0');
        }
        //}
    });

    // Maneja el clic en el botón "Atrás" para Profesionales
    prevButton_PE.on('click', function () {
        let currentStep = $('.step-content-PE:not(.d-none)');
        let prevStep = currentStep.prev('.step-content-PE');
        let currentStepListItem = $('#listadoPasosProfesionales').find('.pasoActivo');
        let prevStepListItem = currentStepListItem.prev('.paso');

        if (prevStep.length) {
            currentStep.addClass('d-none');
            prevStep.removeClass('d-none');
            currentStepListItem.removeClass('pasoActivo').find('.enMarcha').addClass('opacity-0');
            prevStepListItem.addClass('pasoActivo').removeClass('pasoFinalizado')
                .find('.enMarcha').removeClass('d-none').end()
                .find('.completado').addClass('d-none');

            if (!prevStep.prev('.step-content-PE').length) {
                prevButton_PE.addClass('opacity-0');
            }
        }
    });

    // Maneja el clic en los botones "Siguiente" para Particulares
    nextButton_PP.on('click', function () {
        let currentStepId = $(this).data('current-step');
        let currentStep = $('#' + currentStepId);

        //if ($('#formPresupuestosParticulares').valid()) {
        let nextStep = currentStep.next('.step-content-PP');
        let currentStepListItem = $('#listadoPasosParticulares').find('.pasoActivo');
        let nextStepListItem = currentStepListItem.next('.paso');

        if (nextStep.length) {
            currentStep.addClass('d-none');
            nextStep.removeClass('d-none');
            currentStepListItem.removeClass('pasoActivo').addClass('pasoFinalizado').find('.enMarcha').addClass('d-none').end().find('.completado').removeClass('d-none');
            nextStepListItem.addClass('pasoActivo').find('.enMarcha').removeClass('opacity-0');

            prevButton_PP.removeClass('opacity-0');
        }
        //}
    });

    // Maneja el clic en el botón "Atrás" para Particulares
    prevButton_PP.on('click', function () {
        let currentStep = $('.step-content-PP:not(.d-none)');
        let prevStep = currentStep.prev('.step-content-PP');
        let currentStepListItem = $('#listadoPasosParticulares').find('.pasoActivo');
        let prevStepListItem = currentStepListItem.prev('.paso');

        if (prevStep.length) {
            currentStep.addClass('d-none');
            prevStep.removeClass('d-none');
            currentStepListItem.removeClass('pasoActivo').find('.enMarcha').addClass('opacity-0');
            prevStepListItem.addClass('pasoActivo').removeClass('pasoFinalizado')
                .find('.enMarcha').removeClass('d-none').end()
                .find('.completado').addClass('d-none');

            if (!prevStep.prev('.step-content-PP').length) {
                prevButton_PP.addClass('opacity-0');
            }
        }
    });

    // Maneja el cambio de tipo de cliente a "Particular"
    $('#tipoPerfil_PP_particular, #tipoPerfil_PE_particular').change(function () {
        console.log('Particular');
        if ($(this).is(':checked')) {
            console.log('Particular Checked');
            showParticulares();
        }
    });

    // Maneja el cambio de tipo de cliente a "Profesional"
    $('#tipoPerfil_PP_profesional, #tipoPerfil_PE_profesional').change(function () {
        console.log('Profesional');
        if ($(this).is(':checked')) {
            console.log('Profesional Checked');
            showProfesionales();
        }
    });

    // Inicializar la validación del formulario para Profesionales
    $('#formPresupuestosProfesionales').validate({
        rules: {
            nombre_PE: "required",
            apellidos_PE: "required",
            email_PE: {
                required: true,
                email: true
            },
            ciudad_PE: "required",
            codigoPostal_PE: "required",
            telefono_PE: "required",
            clientType_PE: "required",
            perfilProfesional_PE: "required",
            tipoProyecto_PE: "required",
            necesidad_PE: "required",
            productoInteres_PE: "required",
            paradasNecesitas_PE: "required",
            tiempoInicio_PE: "required",
            planosImagenes_PE: "required",
            cuentanosMas_PE: "required",
            comunicaciones_PE: "required",
            privacidad_PE: "required"
        },
        messages: {
            nombre_PE: "Por favor, ingresa tu nombre",
            apellidos_PE: "Por favor, ingresa tus apellidos",
            email_PE: {
                required: "Por favor, ingresa tu correo electrónico",
                email: "Por favor, ingresa un correo electrónico válido"
            },
            ciudad_PE: "Por favor, ingresa tu ciudad",
            codigoPostal_PE: "Por favor, ingresa tu código postal",
            telefono_PE: "Por favor, ingresa tu teléfono",
            clientType_PE: "Por favor, selecciona tu tipo de cliente",
            perfilProfesional_PE: "Por favor, selecciona tu perfil profesional",
            tipoProyecto_PE: "Por favor, selecciona el tipo de proyecto",
            necesidad_PE: "Por favor, selecciona tu necesidad",
            productoInteres_PE: "Por favor, selecciona el producto de tu interés",
            paradasNecesitas_PE: "Por favor, selecciona el número de paradas",
            tiempoInicio_PE: "Por favor, selecciona cuándo quieres empezar",
            planosImagenes_PE: "Por favor, selecciona si tienes planos o imágenes",
            cuentanosMas_PE: "Por favor, ingresa más detalles",
            comunicaciones_PE: "Por favor, acepta recibir comunicaciones comerciales",
            privacidad_PE: "Por favor, acepta la política de privacidad"
        }
    });

    // Inicializar la validación del formulario para Particulares
    $('#formPresupuestosParticulares').validate({
        rules: {
            nombre_PP: "required",
            apellidos_PP: "required",
            email_PP: {
                required: true,
                email: true
            },
            ciudad_PP: "required",
            codigoPostal_PP: "required",
            telefono_PP: "required",
            clientType_PP: "required",
            necesidades_PP: "required",
            tipoVivienda_PP: "required",
            tipoProyecto_PP: "required",
            paradasNecesitas_PP: "required",
            tiempoInicio_PP: "required",
            planosImagenes_PP: "required",
            cuentanosMas_PP: "required",
            comunicaciones_PP: "required",
            privacidad_PP: "required"
        },
        messages: {
            nombre_PP: "Por favor, ingresa tu nombre",
            apellidos_PP: "Por favor, ingresa tus apellidos",
            email_PP: {
                required: "Por favor, ingresa tu correo electrónico",
                email: "Por favor, ingresa un correo electrónico válido"
            },
            ciudad_PP: "Por favor, ingresa tu ciudad",
            codigoPostal_PP: "Por favor, ingresa tu código postal",
            telefono_PP: "Por favor, ingresa tu teléfono",
            clientType_PP: "Por favor, selecciona tu tipo de cliente",
            necesidades_PP: "Por favor, selecciona tus necesidades",
            tipoVivienda_PP: "Por favor, selecciona tu tipo de vivienda",
            tipoProyecto_PP: "Por favor, selecciona el tipo de proyecto",
            paradasNecesitas_PP: "Por favor, selecciona el número de paradas",
            tiempoInicio_PP: "Por favor, selecciona cuándo quieres empezar",
            planosImagenes_PP: "Por favor, selecciona si tienes planos o imágenes",
            cuentanosMas_PP: "Por favor, ingresa más detalles",
            comunicaciones_PP: "Por favor, acepta recibir comunicaciones comerciales",
            privacidad_PP: "Por favor, acepta la política de privacidad"
        }
    });
});

function showParticulares() {
    $('#formularioPresupuestosParticulares').removeClass('d-none');
    $('#formularioPresupuestosProfesionales').addClass('d-none');
    $('#tipoPerfil_PP_particular').prop('checked', true);
    $('#tipoPerfil_PE_particular').prop('checked', true);
}

function showProfesionales() {
    $('#formularioPresupuestosProfesionales').removeClass('d-none');
    $('#formularioPresupuestosParticulares').addClass('d-none');
    $('#tipoPerfil_PE_profesional').prop('checked', true);
    $('#tipoPerfil_PP_profesional').prop('checked', true);
}


/**
 * Inicialización de formularios y funciones asociadas.
 *
 * Esta función inicializa los formularios y las funciones relacionadas para el envío de datos mediante solicitudes AJAX.
 * Incluye la configuración para recoger atributos data-* de elementos HTML, organizar datos de formularios y mostrar alertas utilizando Bootstrap.
 * Además, establece validaciones, acciones de envío y manejo de respuestas del servidor.
 * También se incluyen las siguientes funciones aunque no se utilicen directamente en esta inicialización:
 * - getFormData(form)
 * - alertBootstrap($form, textClass, message)
 * - formulariosAjax(formClass, action)
 * - setForm(formClass, action, idICc)
 */
function initForms() {

    formulariosAjax(                        // Configurar el formulario global del footer
        '#formContacto',
        //'formTest_ajax',
        'pepenunez_process_contact_form',
    );

//    formMultiProcess();                     // Gestiona la validación y navegación en formularios con múltiples pasos, permitiendo la edición de datos y la actualización al finalizar.
}

/**
 * Obtiene los datos de un formulario y los devuelve en un objeto indexado.
 *
 * Esta función toma un formulario como argumento y utiliza jQuery para trabajar con él.
 * Primero, obtiene una referencia al formulario usando jQuery. Luego, serializa los datos del formulario
 * en un array de objetos, donde cada objeto contiene un par clave-valor representando un campo del formulario.
 * Itera sobre este array y construye un objeto indexado con todos los datos del formulario, donde cada
 * clave es el nombre del campo y cada valor es el valor del campo.
 *
 * @param {object} form - El formulario del cual se quieren obtener los datos. Se espera un selector de jQuery o un elemento DOM.
 * @returns {object} Un objeto indexado con los datos del formulario.
 */
function getFormData(form) {
    // Obtener referencia al formulario usando jQuery
    const $form = $(form);

    // Obtener un array de objetos con los pares clave-valor del formulario
    const formArray = $form.serializeArray();

    // Objeto donde se almacenarán los datos indexados del formulario
    let indexedArray = {
        'data': [{}]
    };

    // Iterar sobre cada elemento del array de formulario
    formArray.forEach(function (item) {

        // Obtener el nombre del campo
        let nameSlug = item.name;

        // Obtener el valor del campo
        let value = item.value;

        // Almacenar la información del campo en el objeto indexado
        indexedArray.data[0][nameSlug] = value;
    });

    // Devolver el objeto indexado con los datos del formulario
    return indexedArray;
}

/**
 * Función para manejar la carga del ID de infinity para formularios AJAX.
 *
 * Esta función configura formularios para enviar datos mediante solicitudes AJAX al backend.
 * Si Infinity está cargado, obtiene el identificador de visitante y configura el formulario.
 * Si Infinity no está cargado, espera el evento 'InfinityReady' para configurar el formulario una vez cargado Infinity.
 *
 * @param {string} formClass La clase del formulario que se va a configurar.
 * @param {string} action La acción que se realizará con los datos del formulario.
 */
function formulariosAjax(formClass, action) {
    setForm(formClass, action);
}


/**
 * Función para configurar un formulario con acciones específicas al enviar.
 *
 * Esta función toma una clase de formulario, una acción y un identificador de ICc, y realiza las siguientes operaciones:
 * - Obtener los elementos del formulario.
 * - Obtener los datos del elemento clicado.
 * - Generar un identificador de seguimiento y crear una cookie si no existe.
 * - Configurar validaciones y acciones de envío del formulario.
 * - Enviar los datos del formulario mediante una solicitud AJAX al backend.
 *
 * @param {string} formClass La clase del formulario que se va a configurar.
 * @param {string} action La acción que se realizará con los datos del formulario.
 */
function setForm(formClass, action) {
    // Obtener los elementos del formulario
    let $forms = $(formClass);
    //console.log($forms)

    // Obtener los datos del elemento clicado

    // //console.log(dataClick)

    // Creamos un objeto con el valor de la cookie
    // let cookie = {}

    $forms.each(function () {


        let $form = $(this)
        // Recibimos los datos del elemento que hemos hecho clic

        // Validaciones de los datos con las reglas establecidas
        let rulesValidator = getFormRules($form)


        $form.on('submit', function (e) {

            e.preventDefault();
            //console.log("submit")
        })
            .validate({
                rules: rulesValidator, // Aquí pasamos las reglas
                errorElement: "small",
                errorPlacement: function (error, element) {
                    // Add the `help-block` class to the error element
                    error.addClass("invalid-feedback");
                    // En los checksbox lo añadimos debajo el error
                    if (element.prop("type") === "checkbox") {
                        error.insertAfter(element.siblings("label"));
                        // En los botones seleccionables lo añadimos en un
                    } else if (element.hasClass("form-check-input")) {
                        let $group = $(element).closest('.form-check-group');
                        $group.find('.form-check-input').addClass('is-invalid')
                        $group.find('.custom-error').html(error);
                    } else {
                        error.insertAfter(element);
                    }

                },
                highlight: function (element) {

                    // $(element).addClass("is-invalid").removeClass("is-valid");
                    // $(element).addClass("is-invalid").removeClass("is-valid");
                },
                unhighlight: function (element) {

                    if ($(element).hasClass("form-check-input")) {
                        let $group = $(element).closest('.form-check-group');
                        // //console.log($group)
                        $group.find('.form-check-input').removeClass('is-invalid');
                        // $group.find('.custom-error').html(error);
                    } else {
                        $(element).removeClass("is-invalid");
                    }
                    // $(element).addClass("is-valid").removeClass("is-invalid");
                }, // onfocusout: false, // Deshabilita la validación en tiempo real al escribir
                submitHandler: function (form) {
                    //console.log("submit submithandler")

                    // Variable con los datos que enviaremos
                    const data = {};

                    // Data del formulario
                    data.dataForm = getFormData(form);

                    // Añadimos todos los datos que vamos a enviar al back

                    // Data del tipo de formulario
                    data.formulario = $(form).data('formulario');

                    // id lead de infinity
                    // data.idICc = idICc;

                    // Acción de con el nombre de la función ajax del back
                    data.action = action;

                    // Token
                    data.nonce = pepenunez_form.frmNonce;


                    // let dataLayerPush = getDataLayerForm(data.dataForm);
                    console.log(data.dataForm);

                    $('#endFormModal #processForm').removeClass('d-none')
                    $('#endFormModal #errorForm').addClass('d-none')
                    $('#endFormModal #successForm').addClass('d-none')
                    $('#endFormModal').modal('show');

                    $.ajax({
                        url: pepenunez_form.ajaxUrl,
                        type: 'post',
                        //contentType: 'application/json',
                        //dataType: 'json',
                        data,
                        beforeSend: function () {
                            console.log("Datos enviados beforeSend: ", data.dataForm);
                        },
                        success: function (res) {

                            console.log("Respuesta del servidor: ", res); // Imprimir respuesta del servidor


                            // Si no pasa es porque ha ocurrido un problema en el proceso del back con el tipo de formulario 'data-'
                            if (res.status === 2) {
                                $('#endFormModal #processForm').addClass('d-none')
                                $('#endFormModal #errorForm').addClass('d-none')
                                $('#endFormModal #successForm').removeClass('d-none')
                                $form[0].reset();
                            } else {
                                $('#endFormModal #processForm').addClass('d-none')
                                $('#endFormModal #errorForm').removeClass('d-none')
                                $('#endFormModal #successForm').addClass('d-none')
                                //$form[0].reset();
                            }
                        },
                        error: function (err) {
                            $('#endFormModal #processForm').addClass('d-none')
                            $('#endFormModal #errorForm').removeClass('d-none')
                            $('#endFormModal #successForm').addClass('d-none')
                            //console.log("Error del servidor: ", err); // Imprimir error del servidor
                        }
                    })
                }
            });
    })


    // });
}







