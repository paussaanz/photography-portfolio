/**
 * Inicialización de validaciones de formularios utilizando jQuery.
 *
 * Esta función inicializa las validaciones de formularios utilizando jQuery y define métodos personalizados
 * para validar diferentes tipos de campos, como DNI, NIE, NIF, IBAN, edad, expresiones regulares y números de teléfono.
 * Además, proporciona un método para generar reglas de validación para campos de formularios.
 */
function initJqueryValidations() {
    // No hay nada que inicializar aquí pero mantener el init
}

/**
 * Genera un objeto con las reglas de validación de los campos del formulario.
 *
 * Esta función recibe el ID del formulario y genera un objeto con las reglas de validación
 * para cada campo del formulario, basándose en los atributos y datos de los campos.
 *
 * @param {string} formularioId El ID del formulario del cual se van a obtener las reglas de validación.
 * @returns {Object} Objeto con las reglas de validación para cada campo del formulario.
 */
function getFormRules(formularioId) {
    let rules = {};

    // Elementos del formulario
    let elements = $(formularioId).find('input, select, textarea');

    elements.each(function () {
        let campo = $(this);
        let name = campo.attr('name');
        let type = campo.data('option') ?? campo.attr('type');
        let dataRequired = campo.data('required');
        let dataName = campo.data('name');
        // console.log(name)
        // Quitar los puntos suspensivos por si los tuviera
        // name = name.replace(/\./g, "");
        rules[name] = {};

        if (dataRequired === 'required') {
            rules[name].required = true
        }
        // rules[name].element = campo
        // rules[name].type = type
        // rules[name].value = campo.val()

        switch (type) {
            case "textarea" :
                rules[name].maxlength = 180
                break
            case "text":
                rules[name].maxlength = 30
                rules[name].minlength = 2
                rules[name].pattern = /^[a-zA-Z\sáéíóúÁÉÍÓÚäëïöüÄËÏÖÜãàâäæçéèêëíìîïñóòôöõúùûüýÿ]*$/;
                // rules[name].alpha = true

                break
            case "email":
                rules[name].validEmail = false
                break
            case "telefono" :
                rules[name].maxlength = 9
                rules[name].minlength = 9
                rules[name].number = true
                break
            case "cp":
                rules[name].maxlength = 5
                rules[name].minlength = 5
                rules[name].number = true
                break
            case "edad":
                rules[name].edadValida = true
                break
            case "dni":
                rules[name].documentoValido = true
                break
            case "iban":
                rules[name].ibanValido = true
                break
            case "noEqualTels":
                rules[name].noEqualTels = true
                // los campos entre sí no pueden ser iguales
                break
            case "direccion":
                // los campos entre sí no pueden ser iguales
                break
            case "icc":
                // Debemos validar el numero icc de la tarjeta SIM
                break
            case "tel":
                // Debemos validar el numero icc de la tarjeta SIM
                break
            case "radio":
                // Debemos validar el numero icc de la tarjeta SIM
                break
            default :
        }
    });

    // console.log(rules)
    return rules;
}

/**
 * Método personalizado para validar DNI, NIE y NIF.
 *
 * Este método personalizado utiliza expresiones regulares y algoritmos para validar documentos de identidad como DNI, NIE y NIF.
 */
$.validator.addMethod("documentoValido", function (value, element) {
    let validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    let nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    let nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    let str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    let nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');

    let letter = str.substr(-1);
    let charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) return true;

    return false;
}, 'Introduce un documento de identidad válido.');

/**
 * Método personalizado para validar IBAN utilizando el plugin iban.js.
 *
 * Este método utiliza la función isValid de iban.js para validar los códigos IBAN.
 */
$.validator.addMethod("ibanValido", function (value, element) {
    // Utilizar la función isValid de iban.js para validar el IBAN
    return IBAN.isValid(value);
}, 'Introduce un IBAN válido.');

/**
 * Método para validar si una persona es mayor de edad y no es mayor de 150 años.
 *
 * Este método comprueba si la fecha de nacimiento proporcionada indica que una persona es mayor de 18 años y no mayor de 150 años.
 */
$.validator.addMethod("edadValida", function (value, element) {
    // Obtener la fecha de nacimiento del valor del campo
    let fechaNacimiento = new Date(value);

    // Calcular la fecha hace 18 años
    let hace18Anos = new Date();
    hace18Anos.setFullYear(hace18Anos.getFullYear() - 18);

    // Calcular la fecha hace 150 años
    let hace150Anos = new Date();
    hace150Anos.setFullYear(hace150Anos.getFullYear() - 150);

    // Verificar si la fecha de nacimiento es mayor o igual a la fecha hace 150 años
    // y menor o igual a la fecha actual
    if (fechaNacimiento <= hace150Anos || fechaNacimiento >= hace18Anos) {
        // Si la persona es menor de 18 años o mayor de 150 años
        return false;
    }

    // Si la persona es mayor de 18 años y menor de 150 años
    return true;
}, function (params, element) {
    let fechaNacimiento = new Date(element.value);
    let hace18Anos = new Date();
    hace18Anos.setFullYear(hace18Anos.getFullYear() - 18);

    if (fechaNacimiento > hace18Anos) {
        return "Debes ser mayor de 18 años para continuar.";
    } else {
        // Si tiene más de 150 años
        return "Introduce una edad válida";
    }
});

/**
 * Método para validar expresiones regulares.
 *
 * Este método permite validar si un valor cumple con una expresión regular específica.
 */
$.validator.addMethod("pattern", function (value, element, regexp) {
    return regexp.test(value);
}, "Ingrese un valor válido.");

/**
 * Método para verificar que no se ingresen números de teléfono duplicados.
 *
 * Este método comprueba que no haya números de teléfono duplicados entre los campos con el mismo atributo data-option.
 */
$.validator.addMethod("noEqualTels", function (value, element) {
    // Encuentra todos los elementos con el mismo data-option
    let $fieldsWithSameOption = $('[data-option="noEqualTels"]');

    // Itera sobre los campos con el mismo data-option
    for (let i = 0; i < $fieldsWithSameOption.length; i++) {
        // Si no es el mismo campo actual y tiene el mismo valor, retorna falso
        if (element !== $fieldsWithSameOption[i] && value === $($fieldsWithSameOption[i]).val()) {
            return false;
        }
    }
    return true;
}, "Esta línea de teléfono ya la tienes incluida.");
