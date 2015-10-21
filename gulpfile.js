var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');


gulp.task('sass', function() {
    gulp.src('app/sass/style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('app/styles'));
});

gulp.task('sass:watch', function() {
    gulp.watch('app/sass/*.scss', ['sass']);
});

gulp.task('scripts', function() {
    gulp.src([
        'app/components/AddButton.js',
        'app/components/Book.js',
        'app/components/BookList.js',
        'app/components/AddBookForm.js',
        'app/components/BookLibrary.js',
        'app/main.js'

    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('app/scripts'));
});

gulp.task('scripts:watch', function() {
    gulp.watch([
        'app/components/AddButton.js',
        'app/components/Book.js',
        'app/components/BookList.js',
        'app/components/AddBookForm.js',
        'app/components/BookLibrary.js',
        'app/main.js'
    ], ['scripts']);
});