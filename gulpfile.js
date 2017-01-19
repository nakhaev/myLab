var gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync'),
    del = require('del'),
    /*imagemin = require('gulp-imagemin'),*/ // Error: Cannot find module 'imagemin-gifsicle' ????
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function(){ 
    return gulp.src('app/less/**/*.less')
        .pipe(less())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('js-lib', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js'
        ])
        .pipe(gulp.dest('app/js'));
});

gulp.task('css-lib', function() {
    return gulp.src('bower_components/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('app/css'));
});

gulp.task('font-lib', function() {
    return gulp.src('bower_components/bootstrap/fonts/*.*')
        .pipe(gulp.dest('app/fonts'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'js-lib', 'css-lib', 'font-lib'], function() {
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'less'/*, 'img'*/], function() { //error in gulp-imagemin

    var buildCss = gulp.src('app/css/**/*css')
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);