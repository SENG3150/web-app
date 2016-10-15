var Promise = require('es6-promise').Promise;
var Server = require('karma').Server;
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var ngConstant = require('gulp-ng-constant');
var less = require('gulp-less');
var rename = require('gulp-rename');
var exec = require('gulp-exec');
var foreach = require('gulp-foreach');
var path = require('path');
var runSequence = require('run-sequence');
var fs = require('fs');

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
		'bower_components/angular-mocks/angular-mocks.js',
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
		'bower_components/angular-underscore-module/angular-underscore-module.js',
		'bower_components/angular-confirm-modal/angular-confirm.min.js'
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

var concatPluginsConfig = {
	source: [
		// Inspinia
		'js/plugins/inspinia/*.js'
	],
	destination: 'dist/',
	output: 'plugins.js'
};

gulp.task('concat-plugins', function () {
	var config = concatPluginsConfig;

	return gulp.src(config.source)
		.pipe(concat(config.output))
		.pipe(uglify())
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

var copyAssetsConfig = {
	fonts: {
		source: [
			'bower_components/bootstrap/dist/fonts/*'
		],
		destination: 'fonts/'
	}
};

gulp.task('copy-fonts', function () {
	var config = copyAssetsConfig.fonts;

	return gulp.src(config.source)
		.pipe(gulp.dest(config.destination));
});

var themeConfig = {
	source: [
		'theme/less/style.less'
	],
	watch: [
		'theme/less/*.less'
	],
	destination: 'dist/',
	output: 'theme.css'
};

gulp.task('build-theme', function () {
	var config = themeConfig;

	return gulp.src(config.source)
		.pipe(less())
		.pipe(cssnano())
		.pipe(rename(config.output))
		.pipe(gulp.dest(config.destination));
});


var testConfig = {
	karma: {
		source: [
			'dist/core.js',
			'dist/app.js',
			'dist/templates.js',
			'dist/plugins.js',
			'bower_components/highcharts/highcharts.js',
			'bower_components/highcharts-ng/dist/highcharts-ng.min.js',
			'tests/presentation/**/*.js',
			'tests/unit/services/*.js',
			'tests/unit/directives/*.js',
			'tests/unit/factories/*.js',
			'tests/unit/filters/*.js',
			'tests/unit/routes/**/*.js',
			'tests/unit/routes/*.js',
			'tests/unit/controllers/**/*.js',
			'tests/security/*.js',
			'tests/usability/*.js'
		],
		browsers: ['Chrome', 'Firefox']
	},
	artillery: {
		source: [
			'tests/efficiency/*.json'
		],
		prefix: 'tests/efficiency/output/',
		config: './env.json',
		options: {
			continueOnError: false,
			pipeStdout: false
		},
		reporting: {
			err: true,
			stderr: true,
			stdout: true
		}
	}
};

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

	fs.writeFile(testConfig.artillery.config, JSON.stringify(config.constants));

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
				apiEndpoint: 'https://seng3150-api.wingmanwebdesign.com.au/'
			}
		},
		destination: 'js/'
	};

	fs.writeFile(testConfig.artillery.config, JSON.stringify(config.constants));

	return ngConstant(config)
		.pipe(gulp.dest(config.destination));
});

gulp.task('test', ['concat-core', 'concat-app', 'concat-plugins', 'template-cache'], function (done) {
	var browsers = testConfig.karma.browsers;

	if (/^win/.test(process.platform)) {
		browsers.push('IE');
	} else if (/^darwin/.test(process.platform)) {
		browsers.push('Safari');
	}

	var config = require(testConfig.artillery.config);

	if (config.ENV == null) {
		runSequence('env-development', 'artillery');
	} else {
		gulp.start('artillery');
	}

	new Server({
		configFile: __dirname + '/karma.conf.js',
		files: testConfig.karma.source,
		browsers: browsers
	}, done).start();
});

gulp.task('artillery', function () {
	var config = require(testConfig.artillery.config);

	return gulp.src(testConfig.artillery.source)
		.pipe(foreach(function (stream, file) {
			var filename = path.basename(file.path);

			return stream
				.pipe(exec('node_modules\\.bin\\artillery run "' + file.path + '" -t "' + config.ENV.apiEndpoint + '" -o "' + testConfig.artillery.prefix + filename + '"', testConfig.artillery.options))
				.pipe(exec.reporter(testConfig.artillery.reporting));
		}));
});

gulp.task('watcher', function () {
	gulp.watch(templateCacheConfig.source, ['template-cache']);
	gulp.watch(concatCoreConfig.source, ['concat-core']);
	gulp.watch(concatAppConfig.source, ['concat-app']);
	gulp.watch(concatCSSConfig.source, ['concat-css']);
	gulp.watch(themeConfig.watch, ['build-theme']);
});

function onError(err) {
	console.log(err);
	this.emit('end');
}

gulp.task('default', ['template-cache', 'concat-core', 'env-production', 'concat-app', 'concat-plugins', 'concat-css', 'copy-fonts', 'build-theme', 'test', 'watcher']);
gulp.task('development', ['template-cache', 'concat-core', 'env-development', 'concat-app', 'concat-plugins', 'concat-css', 'copy-fonts', 'build-theme', 'test', 'watcher']);
gulp.task('deployment', ['template-cache', 'concat-core', 'env-production', 'concat-app', 'concat-plugins', 'concat-css', 'copy-fonts', 'build-theme']);
