import pkg from "gulp";
import gulpIf from "gulp-if";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import cssmin from "gulp-cssmin";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";
import concat from "gulp-concat";
import jsImport from "gulp-js-import";
import sourcemaps from "gulp-sourcemaps";
import replace from "gulp-replace";
import minify from "gulp-minify";

const { src, dest, parallel, series, watch } = pkg;
const sass = gulpSass(dartSass);
const isProd = process.env.NODE_ENV === "prod";

/**--------------------------------------------------------------------------------------------------------------
 * CONFIGURACIÓN
 *
 * estas variables son las que definen que hacer con cada
 * archivo JS, según el tratamiento que se necesite dar
 *
 --------------------------------------------------------------------------------------------------------------*/
/**
 * Archivos JS que se deben combinar .
 *
 * las 2 primeras líneas son necesarias para incluir todos los JS necesarios para Bootstrap5.
 * la 3 línea define el patrón de la carpeta JS, todos sus archivos serán combinados también.
 *
 * Cualquier otro archivo se debe incluir en esta lista, por debajo de la 3 línea
 */
const filesToAllJs = [
	"node_modules/jquery/dist/jquery.min.js",
	// 'node_modules/gsap/dist/gsap.min.js',
	// 'node_modules/gsap/dist/scrollTrigger.min.js',
	"node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
	// "node_modules/swiper/swiper-bundle.min.js",
	// 'node_modules/@barba/core/dist/barba.umd.js',
	// 'node_modules/jquery-validation/dist/jquery.validate.min.js',
	// 'node_modules/jquery-validation/dist/localization/messages_es.min.js',
	// 'node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',
	// 'node_modules/split-type/umd/index.min.js',
	// 'node_modules/bs5-lightbox/dist/index.bundle.min.js',
	// 'node_modules/hc-sticky/dist/hc-sticky.js',
	// 'node_modules/jquery.marquee/jquery.marquee.js',
	"src/assets/js/*.js",
];

/**
 * Archivos copiados individual y literalmente de vendors o módulos de Node.
 *
 */
const filesToVendors = [
	// "node_modules/bootstrap-select/dist/css/bootstrap-select.min.css"
	// "node_modules/ion-rangeslider/css/ion.rangeSlider.min.css",
];

const filesToVendorsJs = [
	//'node_modules/swiper/swiper-bundle.min.js.map',
	//'node_modules/swiper/swiper-bundle.min.js',
	// 'node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',
	// 'node_modules/isotope-layout/dist/isotope.pkgd.min.js',
	// 'node_modules/ion-rangeslider/js/ion.rangeSlider.min.js'
];

/**--------------------------------------------------------------------------------------------------------------
 *  FIN CONFIGURACIÓN
 --------------------------------------------------------------------------------------------------------------*/

/**
 * Copia literal de archivos que pertenecen a VENDORS.
 *
 * Tarea encargada de realizar copias exactas de archivos que pertenecen a módulos de NODE
 * o a VENDORS en general que no son instalables desde NODE
 */
function vendorsCopy() {
	if (filesToVendors.length > 0) {
		return src(filesToVendors).pipe(dest("src/assets/dist/vendors/"));
	}
	return src(".", { allowEmpty: true });
}

/**
 * Copia literal de archivos que pertenecen a VENDORS en carpeta JS/.
 *
 * Tarea encargada de realizar copias exactas de archivos que pertenecen a módulos de NODE
 * o a VENDORS en general que no son instalables desde NODE y se copian en JS/
 */
function vendorsCopyJs() {
	if (filesToVendorsJs.length > 0) {
		return src(filesToVendorsJs).pipe(dest("src/assets/dist/js/"));
	}
	return src(".", { allowEmpty: true });
}
/**
 * Minificación de archivos JS que están en la carpeta partials/.
 *
 * Tarea encargada de copiar los archivos JS de la carpeta partials a la carpeta distribuida
 * En caso de se producción minifica el archivo sin añadir extensión.
 */
function minJs() {
	return src("src/assets/js/partials/**.js").pipe(gulpIf(isProd, uglify())).pipe(dest("src/assets/dist/js/"));
}

function css() {
	return src("src/assets/sass/style.scss")
		.pipe(gulpIf(!isProd, sourcemaps.init()))
		.pipe(
			sass({
				includePaths: ["node_modules"],
			}).on("error", sass.logError)
		)
		.pipe(concat("all.css"))
		.pipe(replace("../../../../", "../"))
		.pipe(replace("../../../", "../"))
		.pipe(replace("../../", "../"))
		.pipe(gulpIf(!isProd, sourcemaps.write()))
		.pipe(gulpIf(isProd, cssmin()))
		.pipe(dest("src/assets/dist/css/"));
}

function js() {
	return src(filesToAllJs)
		.pipe(
			jsImport({
				hideConsole: true,
			})
		)
		.pipe(concat("all.js"))
		.pipe(gulpIf(isProd, uglify()))
		.pipe(dest("src/assets/dist/js"));
}

function img() {
	return src("src/assets/img/**/*").pipe(gulpIf(isProd, imagemin())).pipe(dest("src/assets/dist/img/"));
}
function fonts() {
	return src("src/assets/fonts/**/*").pipe(dest("src/assets/dist/fonts/"));
}
function watchFiles() {
	watch("src/assets/**/*.scss", series(css));
	watch("src/assets/js/*.js", series(js));
	watch("src/assets/js/partials/*.js", series(minJs));
	watch("src/assets/img/**/*.*", series(img));
}

export { vendorsCopy, vendorsCopyJs, css, js, img, minJs, fonts, watchFiles };
export let serve = parallel(vendorsCopy, vendorsCopyJs, css, js, img, minJs, fonts, watchFiles);
export default series(vendorsCopy, vendorsCopyJs, css, js, img, fonts, minJs);
