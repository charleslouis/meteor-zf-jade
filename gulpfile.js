'use strict';

var gulp = Meteor.npmRequire('gulp');

var watch = Meteor.npmRequire('gulp-watch'),
	sass = Meteor.npmRequire('gulp-sass'),
    rename = Meteor.npmRequire('gulp-rename'),
    sourcemaps = Meteor.npmRequire('gulp-sourcemaps'),
    livereload = Meteor.npmRequire('gulp-livereload'),
    concat = Meteor.npmRequire('gulp-concat'),
    uglify = Meteor.npmRequire('gulp-uglify'),
    autoprefixer = Meteor.npmRequire('gulp-autoprefixer'),
    foundation-apps = Meteor.npmRequire('foundation-apps'),
    del = Meteor.npmRequire('del');


var paths = {
	'scripts':{
		front: {
			sources: [
				'./client/foundation-apps/js/foundation.core.js',
				'./client/foundation-apps/js/foundation.util.mediaQuery.js',
				'./client/foundation-apps/js/foundation.util.box.js',
				'./client/foundation-apps/js/foundation.util.keyboard.js',
				'./client/foundation-apps/js/foundation.util.motion.js',
				'./client/foundation-apps/js/foundation.util.nest.js',
				'./client/foundation-apps/js/foundation.util.timerAndImageLoader.js',
				'./client/foundation-apps/js/foundation.util.touch.js',
				'./client/foundation-apps/js/foundation.util.triggers.js',
				'./client/foundation-apps/js/foundation.abide.js',
				'./client/foundation-apps/js/foundation.accordion.js',
				'./client/foundation-apps/js/foundation.accordionMenu.js',
				'./client/foundation-apps/js/foundation.drilldown.js',
				'./client/foundation-apps/js/foundation.dropdown.js',
				'./client/foundation-apps/js/foundation.dropdownMenu.js',
				'./client/foundation-apps/js/foundation.equalizer.js',
				'./client/foundation-apps/js/foundation.interchange.js',
				'./client/foundation-apps/js/foundation.magellan.js',
				'./client/foundation-apps/js/foundation.offcanvas.js',
				'./client/foundation-apps/js/foundation.orbit.js',
				'./client/foundation-apps/js/foundation.responsiveMenu.js',
				'./client/foundation-apps/js/foundation.responsiveToggle.js',
				'./client/foundation-apps/js/foundation.reveal.js',
				'./client/foundation-apps/js/foundation.slider.js',
				'./client/foundation-apps/js/foundation.sticky.js',
				'./client/foundation-apps/js/foundation.tabs.js',
				'./client/foundation-apps/js/foundation.toggler.js',
				'./client/foundation-apps/js/foundation.tooltip.js',

				'./client/js/custom/*.js'
			],
			output: {
				folder: './src/js/',
				mainScriptsFile: 'scripts.js'
			}
		}
	},
	'style': {
		all: './private/styles/*.scss',
		output: './client/styles/'
	},
	'jadeFiles': {
		templates: [
			'./client/*.jade',
			'./private/templates/*.jade',
		]
	},
	'html': {
		distFolder: './client/',
		distFiles: './*.html'
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
	.pipe(sass())
	.pipe(gulp.dest(paths.style.output))
	.pipe(livereload());
});
 
gulp.task('sass:build',function () {
  gulp.src(paths.style.all)
    .pipe(sass())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(minifycss())
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
  // 'watch:js',
  // 'watch:jadeHtml'
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

// default task (watch)
gulp.task('serve', ['watch'],function () {
});

// dist task to deploy
gulp.task('dist', ['jsconcat:build', 'jadeHtml', 'sass:build', 'copy'],function () {
});

