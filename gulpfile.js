const gulp = require('gulp');
const del = require('del');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const terser = require('gulp-plugin-terser');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const dartSass = require('sass');
const browserSync = require('browser-sync');

const pkg = require('./package.json');

// set compiler for gulp sass
sass.compiler = dartSass;

const outDir = 'dist';
const banner = `/*!
 * @module ${pkg.name}
 * @description ${pkg.description}
 * @version ${pkg.version}
 * @link ${pkg.repository}
 * @licence MIT License, https://opensource.org/licenses/MIT
 */
`;

async function cleanOutDir() {
  await del(outDir);
}

async function compile() {
  const bundle = await rollup.rollup({
    input: 'src/ng-browser-detector.js',
    plugins: [
      resolve(),
      babel(),
    ],
  });

  await bundle.write({
    file: 'dist/ng-browser-detector.js',
    format: 'iife',
    sourcemap: true,
    banner,
  });
}

async function copyFiles() {
  gulp.src('README.md').pipe(gulp.dest(outDir));
  gulp.src('CHANGELOG.md').pipe(gulp.dest(outDir));
  gulp.src('package.json').pipe(gulp.dest(outDir));
}

async function minify() {
  gulp.src('dist/*.js')
    .pipe(sourcemap.init())
    .pipe(terser())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(outDir));
}

async function compileSass(server) {
  gulp.src('docs/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('docs/'))
    .pipe(server.stream());
}

function createServer() {
  return browserSync.init({
    server: {
      baseDir: './docs/',
      routes: {
        '/dist': 'dist',
      },
    },
    open: false,
  });
}

const tasks = [
  cleanOutDir,
  compile,
  minify,
  copyFiles,
];

async function serve() {
  const server = createServer();

  gulp.watch('docs/*.scss', () => compileSass(server));
  gulp.watch('docs/*.html').on('change', server.reload);
  gulp.watch('docs/*.js').on('change', server.reload);
  gulp.watch('dist/*.js').on('change', server.reload);
}

async function develop() {
  gulp.watch('src/*.js', compile);
}
const build = gulp.series(...tasks);

exports.serve = gulp.series(compile, serve);
exports.develop = gulp.series(compile, develop);
exports.build = build;
exports.default = build;
