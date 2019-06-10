'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del'),
    watch = require('gulp-watch');


gulp.task("concatScripts", function() {
    return gulp.src([
        'js/jquery.js',
        'js/scripts.js'
        ])
    
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/js'));

    
});

    gulp.task("minifyScripts", ["concatScripts"], function() {
   return gulp.src("public/js/app.js")
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('public/js'));
});


// Locates SCSS and converts it to CSS
gulp.task('compileSass', function() {
    gulp.src("scss/*.scss")
    
// Gives the new file a name and destination (public/CSS)
        .pipe(sass())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('public/css'));
})


// Looks for CSS files and moves them to new destination (public/CSS) 
gulp.task('minifyScripts', function() {
 return gulp.src('css/styles.css')
    
// Renames CSS in public folder
    .pipe(sass())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('public/css'));
})
    

// Moves index page tp Public folder
gulp.task('index', [], function() {
    console.log("Moving Index page to Public folder");
gulp.src("index.html")
    .pipe(gulp.dest('public'));
});

// Moves JSON file into Public folder
gulp.task('JSON', [], function() {
    console.log("Moving JSON file to Public folder");
gulp.src("data.json")
    .pipe(gulp.dest('public/js'));
});


// Gulp test task
gulp.task("default", ["hello"], function(){
    console.log("the default task!!");

});

gulp.task("build", ['minifyScripts', 'compileSass', 'index', 'JSON', 'concatScripts']);
gulp.task("default", ['build']);

