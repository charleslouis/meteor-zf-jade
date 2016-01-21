'use strict';

var gulp = require('gulp');

var watch = require('gulp-watch'),
	sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del');

var paths = {
	'scripts':{
		front: {
			sources: [
				'../packages/npm-container/.npm/package/node_modules/foundation-apps/js/vendor/iconic.min.js',
				'../packages/npm-container/.npm/package/node_modules/foundation-apps/js/angular/services/foundation.core.js',
				'../packages/npm-container/.npm/package/node_modules/foundation-apps/js/angular/services/foundation.core.animation.js',
				'../packages/npm-container/.npm/package/node_modules/foundation-apps/js/angular/components/accordion/accordion.js',
				'../packages/npm-container/.npm/package/node_modules/foundation-apps/js/angular/components/common/common.js',
				'../packages/npm-container/.npm/package/node_modules/foundation-apps/js/angular/components/popup/popup.js',
				'../packages/npm-container/.npm/package/node_modules/foundation-apps/js/angular/components/tabs/tabs.js',
				'../packages/npm-container/.npm/package/node_modules/foundation-apps/js/angular/components/offcanvas/offcanvas.js',
				// '../packages/npm-container/.npm/package/node_modules/foundation-apps/js/angular/components/iconic/iconic.js',
				'../private/components/iconic/iconic.js',
				'../private/lib/app.js',
			],
			output: {
				folder: '../client/lib/',
				mainScriptsFile: 'scripts.js'
			}
		}
	},
	'style': {
		all: '../private/styles/*.scss',
		output: '../client/styles/'
	},
	'jadeFiles': {
		templates: [
			'./src/**/*.jade',
		]
	},
	'html': {
		distFolder: './src/',
		distFiles: './src/**/*.html'
	}
};


// ----------   LINT   -----
// 
// gulp.task('lintBack', function(){
// 	gulp.src(paths.scripts.back)
// 		.pipe(jshint())
// 		.pipe(jshint.reporter(jshintReporter));
// });


// ----------   SASS   -----
// 
gulp.task('sass:dev', function () {
  gulp.src(paths.style.all)
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(paths.style.output))
	.pipe(livereload());
});
 
gulp.task('sass:build',function () {
  gulp.src(paths.style.all)
    .pipe(sass())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(cssnano())
	.pipe(gulp.dest(paths.style.output));
});


// ----------   JSCONCAT   -----
// 
gulp.task('jsconcat:dev', function() {
  return gulp.src(paths.scripts.front.sources)
	// .pipe(jshint())
	// .pipe(jshint.reporter(jshintReporter))
    .pipe(concat(paths.scripts.front.output.mainScriptsFile))
    .pipe(gulp.dest(paths.scripts.front.output.folder))
    .pipe(livereload());
});

gulp.task('jsconcat:build', function() {
  return gulp.src(paths.scripts.front.sources)
    .pipe(concat(paths.scripts.front.output.mainScriptsFile))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.front.output.folder));
});


//----------- JADE -> HTML -------------------
gulp.task('jadeHtml', function() {
 
  gulp.src(paths.jadeFiles.templates)
    .pipe(jade({
      locals: paths.jadeFiles.templates
    }))
    .pipe(gulp.dest(paths.html.distFolder))
    .pipe(livereload());
});

//-----------   SERVER   ---------------------
gulp.task('server:start', function() {
  connect.server({
    port: 8000,
    root: './src',
  });
  // server close ?
});


//-----------   WATCHERS   ---------------------

// gulp watcher for sass
gulp.task('watch:sass', function () {
	livereload.listen();
	gulp.watch(paths.style.all, ['sass:dev']);
});

// gulp watcher for lint
// gulp.task('watch:lintBack', function () {
// 	gulp.src(paths.scripts.back)
// 		.pipe(watch())
// 		.pipe(jshint())
// 		.pipe(jshint.reporter(jshintReporter));
// });

// gulp watcher for js
gulp.task('watch:js', function () {
	livereload.listen();
	gulp.watch(paths.scripts.front.sources, ['jsconcat:dev']);
});

gulp.task('watch:jadeHtml', function () {
  livereload.listen();
  gulp.watch(paths.jadeFiles.templates, ['jadeHtml']);
  gulp.watch(paths.html.distFiles).on('change', livereload.changed);
});

// gulp watch sass, lint & js
gulp.task('watch', [
  'watch:sass',
  // 'watch:lintBack',
  'watch:js',
  'watch:jadeHtml'
]);

//-----------   CLEAN   ---------------------
gulp.task('cleaning', function () {
  return del([
    'dist/**'
  ]);
});

//-----------   COPY   ---------------------
gulp.task('copy', ['cleaning'], function() {
	gulp.src([
		'./src/**/*.html', 
		'./src/**/scripts.js',
		'./src/**/style.css',
		'./src/**/*.png',
		'./src/**/*.jpg',
		'./src/**/*.svg',
		'./src/.htaccess'
	])
	.pipe(gulp.dest('./dist'));
	gulp.src([
		'./src/reveal/**/*',
	])
	.pipe(gulp.dest('./dist/reveal'));	
});


// ----------   RUN tasks   ------------------
// gulp run Keystone
// gulp.task('runKeystone', shell.task('node keystone.js'));

// default task (watch & serve)

gulp.task('default', ['sass:dev', 'jsconcat:dev'],function () {
});

gulp.task('dist', ['jsconcat:build', 'jadeHtml', 'sass:build', 'copy'],function () {
});
