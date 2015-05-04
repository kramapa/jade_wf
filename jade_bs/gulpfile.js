var
	gulp 			= require('gulp'),
	rename			= require('gulp-rename'), 				// Rename files
	sourcemaps		= require('gulp-sourcemaps'),			// Generate SourceMaps
	less			= require('gulp-less'),					// Compile LESS to CSS
	jade 			= require('gulp-jade'),					// Compile JADE to HTML
	minifyCss		= require('gulp-minify-css'),			// Minify CSS
	uglify			= require('gulp-uglify'),				// Minify/Obfuscation JS
	concat 			= require('gulp-concat'),				// Concatenate several files
	autoprefixer	= require('gulp-autoprefixer'),			// Autoprefixer
	size 			= require('gulp-filesize'),				// File Size
	plumber 		= require('gulp-plumber'), 				// Don't stop if errors
	livereload 		= require('gulp-livereload');			// Livereload

// ==================   LESS TASK  ================
gulp.task('less', function()
{
	return gulp.src('./site1/mybootstrap/less/style.less')	// use style.less as input
		.pipe(plumber()) 									// Don't stop if errors
		.pipe(sourcemaps.init())
		.pipe(less())										// Compile less to css
		.pipe(autoprefixer({								// Autoprefixer
			browsers: ['last 50 versions'],
			cascade: true
		}))
		//.pipe(minifyCss())								// Minify generated CSS
		.pipe(sourcemaps.write('../maps'))					// Write the map file to ../maps
		.pipe(gulp.dest('./site1/html/css/'))				// Compile to css
		//.pipe(size('*css'));								// [gulp] Size example.ccs: 265.32 kB
		.pipe(livereload());
});

// ==================   JADE TASK  ================
gulp.task('templates', function() {
	return gulp.src('./site1/jade/index.jade')
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
 		.pipe(gulp.dest('./site1/html'))
		.pipe(livereload());
});

// ====================	WATCH TASK ======================
gulp.task('watch', function()
{
	livereload.listen();
	gulp.watch(['./site1/mybootstrap/less/*.less', './site1/mybootstrap/custom-bootstrap/less/*.less'], ['less']);
	gulp.watch('site1/jade/*.jade',['templates']);
});


// ==================== DEFAULT TASK ===========================
gulp.task('default', ['less', 'templates', 'watch']);
