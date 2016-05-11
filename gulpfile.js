var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var ngConstant = require('gulp-ng-constant');

var templateCacheConfig = {
	source: [
		'views/*.html',
		'views/**/*.html',
		'views/**/**/*.html'
	],
	destination: 'dist/',
	options: {
		standalone: true,
		root: 'views/'
	}
};

gulp.task('template-cache', function () {
	var config = templateCacheConfig;

	return gulp.src(config.source)
		.pipe(templateCache(config.options))
		.pipe(gulp.dest(config.destination));
});

var concatCoreConfig = {
	source: [
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/jquery-ui/jquery-ui.min.js',
		'bower_components/angular/angular.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/bootstrap/dist/js/bootstrap.js',
		'bower_components/jquery-slimscroll/jquery.slimscroll.js',
		'bower_components/pace/pace.js',
		'bower_components/moment/moment.js',
		'bower_components/angular-moment/angular-moment.js',
		'bower_components/oclazyload/dist/ocLazyLoad.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'bower_components/satellizer/satellizer.js',
		'bower_components/ngstorage/ngStorage.js',
		'bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
		'bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js',
		'bower_components/angular-sanitize/angular-sanitize.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
		'bower_components/restangular/dist/restangular.js',
		'bower_components/angular-ui-select/dist/select.js',
		'bower_components/underscore/underscore-min.js',
		'bower_components/angular-underscore-module/angular-underscore-module.js'
	],
	destination: 'dist/',
	output: 'core.js'
};

gulp.task('concat-core', function () {
	var config = concatCoreConfig;

	return gulp.src(config.source)
		.pipe(concat(config.output))
		.pipe(uglify({
			mangle: false,
			compress: false
		}))
		.pipe(gulp.dest(config.destination));
});

var concatAppConfig = {
	source: [
		'js/app.js',
		'js/config.js',
		'js/ngConstants.js',
		'js/services/*.js',
		'js/directives/*.js',
		'js/factories/*.js',
		'js/filters/*.js',
		'js/routes/**/*.js',
		'js/routes/*.js',
		'js/controllers/**/*.js',
		'js/controllers/*.js'
	],
	destination: 'dist/',
	output: 'app.js'
};

gulp.task('concat-app', function () {
	var config = concatAppConfig;

	return gulp.src(config.source)
		.pipe(concat(config.output))
		.pipe(uglify())
		.pipe(gulp.dest(config.destination));
});

var concatCSSConfig = {
	source: [
		'css/fonts.css',
		'bower_components/bootstrap/dist/css/bootstrap.min.css',
		'css/animate.css',
		'css/custom.css',
		'bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
		'bower_components/angular-toastr/dist/angular-toastr.min.css',
		'bower_components/angular-ui-select/dist/select.min.css',
		'css/plugins/dataTables/datatables.min.css'
	],
	destination: 'dist/',
	output: 'app.css'
};

gulp.task('concat-css', function () {
	var config = concatCSSConfig;

	return gulp.src(config.source)
		.pipe(concat(config.output))
		.pipe(cssnano())
		.pipe(gulp.dest(config.destination));
});

gulp.task('env-development', function () {
	var config = {
		space: '  ',
		name: 'config',
		stream: true,
		constants: {
			ENV: {
				name: 'development',
				apiEndpoint: 'http://seng3150.api.local/'
			}
		},
		destination: 'js/'
	};

	return ngConstant(config)
		.pipe(gulp.dest(config.destination));
});

gulp.task('env-production', function () {
	var config = {
		space: '  ',
		name: 'config',
		stream: true,
		constants: {
			ENV: {
				name: 'production',
				apiEndpoint: 'https://seng3150.wingmanwebdesign.com.au/'
			}
		},
		destination: 'js/'
	};

	return ngConstant(config)
		.pipe(gulp.dest(config.destination));
});

function onError(err) {
	console.log(err);
	this.emit('end');
}


gulp.task('default', ['template-cache', 'concat-core', 'env-production', 'concat-app', 'concat-css']);

gulp.watch(templateCacheConfig.source, ['template-cache']);
gulp.watch(concatCoreConfig.source, ['concat-core']);
gulp.watch(concatAppConfig.source, ['concat-app']);
gulp.watch(concatCSSConfig.source, ['concat-css']);
