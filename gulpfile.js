var gulp = require('gulp');
var browserify = require('gulp-browserify');

// https://www.npmjs.com/package/gulp-watch
// var watch = require('gulp-watch');

// https://www.npmjs.com/package/gulp-uglify
var uglify = require('gulp-uglify');

// https://www.npmjs.com/package/gulp-minify-css
var minifyCss = require('gulp-minify-css');

// https://www.npmjs.com/package/gulp-concat
// var concat = require('gulp-concat');

// https://www.npmjs.com/package/gulp-replace
var replace = require('gulp-replace');

// https://www.npmjs.com/package/gulp-rename
var rename = require("gulp-rename");
// console.info(process.argv);process.exit(0);

// is dev or production,
// default product, not debug
// var isDebug = process.argv.some(function(v){ return v === '--debug'; });


// for test
// A fresh gulp plugin demo
// var through = require('through2');
// function showFile() {
//   return through.obj(function (file, enc, callback) {
//     console.log(file.relative);
//     // console.info(file.path);
//     // console.info(file.history);
//     this.push(file);
//     return callback();
//   });
// }


// Basic usage
gulp.task('browserify', function() {
    // Single entry point to browserify
    var stream = gulp.src('public/js/src/*.js')
        .pipe(browserify({
          // When opts.insertGlobals is true,
          // always insert process, global, __filename, and __dirname without
          // analyzing the AST for faster builds but larger output bundles. Default false.
          // insertGlobals : true,

          // When opts.debug is true, add a source map inline to the end of the bundle.
          // This makes debugging easier because you can see all the original
          // files if you are in a modern enough browser.
          debug: false
        }))

        // stream.pipe(showFile())

        .on('error', function(err) {
          console.error(err.stack);
        });

        // stream.pipe(uglify());

        // .pipe(rename({extname: '.min.js'}))
        stream.pipe(gulp.dest('public/js/bundle/'));
        return stream;
});


// 压缩js, 不加 md5file 后缀, 区别与 cdn-minify-js
gulp.task('minify-js', function() {
  gulp.src('public/js/bundle/*')
    .pipe(uglify())
    .pipe(gulp.dest('public/js/bundle/'));
});

// Watch files
gulp.task('watch', ['browserify'], function() {
  var watcher = gulp.watch('public/js/src/**/*.js', ['browserify']);
  watcher.on('change', function(event) {
    console.log(new Array(80).join('='));
    console.log(event.path + ' was changed.');
    console.log(new Array(80).join('='));
  });
});

// Watch files with gulp-watch plugins
// Using watch plugins
// gulp.task('watch', function () {
//     gulp.src('public/js/src/*.js')
//         .pipe(watch('public/js/src/*.js', {verbose: true}))
//         .pipe(browserify({ debug: false }))
//         .on('error', function(err) {
//           console.error(err.stack);
//         })
//         .pipe(gulp.dest('public/js/bundle/'));
// });

// 发布CDN, 把html中的css和js外链加上hash
var md5File = require('md5-file');
gulp.task('cdn-html', function(){
  gulp.src('./gulp.html')

      // 优化html中的js
      .pipe(replace(/src="(.*)\.js"/g, function(ax, bx){
        // console.log(ax, bx);
        if(bx.indexOf('jquery') !== -1) return ax;
        var suffix = md5File(bx +'.js').slice(0, 8);

        bx = bx.replace('bundle', 'dist/js');
        return 'src="'+ bx +'-'+ suffix +'.js"';
      }))

      // 优化 css
      .pipe(replace(/href="(.*)\.css"/, function(ax, bx){
        // console.log(ax, bx);
        var suffix = md5File(bx +'.css').slice(0, 8);

        bx = bx.replace('css/', 'dist/css/');
        return 'href="'+ bx +'-'+ suffix +'.css"';
      }))
      .pipe(rename({extname: '-cdn.html'}))
      .pipe(gulp.dest('./'));
});

// 压缩拷贝css
gulp.task('cdn-minify-css', function(){
  gulp.src('css/*')
      .pipe(rename(function(path){
        // console.log(path);
        var filename = 'css/'+ path.basename +'.css';
        path.basename = path.basename +"-"+ md5File(filename).slice(0, 8);
      }))
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(gulp.dest('./dist/css'));
});

// 压缩拷贝js
gulp.task('cdn-minify-js', function(){
  gulp.src('bundle/*')
      .pipe(rename(function(path){
        // console.log(path);
        var filename = 'bundle/'+ path.basename +'.js';
        path.basename = path.basename +"-"+ md5File(filename).slice(0, 8);
      }))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));
});

// 正式上线任务
gulp.task('cdn', ['cdn-html', 'cdn-minify-css', 'cdn-minify-js']);

gulp.task('default', ['browserify']);