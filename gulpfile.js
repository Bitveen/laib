var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');


gulp.task('sass', function() {
    gulp.src('app/sass/style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('public/styles'));
});

gulp.task('sass:watch', function() {
    gulp.watch('app/sass/*.scss', ['sass']);
});

gulp.task('scripts', function() {
    gulp.src([
        'app/react-app/Book.js',
        'app/react-app/BookList.js',
        'app/react-app/FormInput.js',
        'app/react-app/AddBookForm.js'

    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/scripts'));
});

gulp.task('scripts:watch', function() {
    gulp.watch([
        'app/react-app/Book.js',
        'app/react-app/BookList.js',
        'app/react-app/FormInput.js',
        'app/react-app/AddBookForm.js'
    ], ['scripts']);
});