const path = require('path');
const fs = require('fs');

const gulp = require('gulp');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const terser = require('gulp-plugin-terser');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const dartSass = require('sass');
const browserSync = require('browser-sync');
const through2 = require('through2');

const pkg = require('./package.json');

// set compiler for gulp sass
sass.compiler = dartSass;

const outDir = path.resolve(__dirname, 'dist');
const banner = `/*!
 * @module ${pkg.name}
 * @description ${pkg.description}
 * @version ${pkg.version}
 * @link ${pkg.repository}
 * @licence MIT License, https://opensource.org/licenses/MIT
 */
`;

async function cleanOutDir() {
  await fs.promises.rmdir(outDir, { recursive: true });
}

async function compile() {
  const bundle = await rollup.rollup({
    input: 'src/ng-browser-detector.js',
    plugins: [
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

function updatePackageJSON() {
  const transform = through2.obj((file, _, callback) => {
    const modifiedFile = file.clone();
    const json = JSON.parse(file.contents.toString());

    json.main = 'ng-browser-detector.min.js';
    delete json.scripts;
    delete json.devDependencies;
    delete json.private;
    delete json.engines;

    modifiedFile.contents = Buffer.from(JSON.stringify((json), null, 2));
    callback(null, modifiedFile);
  });

  return transform;
}

async function copyFiles() {
  gulp.src('README.md').pipe(gulp.dest(outDir));
  gulp.src('CHANGELOG.md').pipe(gulp.dest(outDir));
  gulp.src('LICENSE').pipe(gulp.dest(outDir));
  gulp.src('package.json')
    .pipe(updatePackageJSON())
    .pipe(gulp.dest(outDir));
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
    rewriteRules: [{
      match: '//cdn.jsdelivr.net/npm/ng-browser-detector@latest/ng-browser-detector.min.js',
      replace: '/dist/ng-browser-detector.js',
    }],
  });
}

async function serve() {
  const server = createServer();

  gulp.watch('src/*.js', compile);
  gulp.watch('docs/*.scss', () => compileSass(server));

  gulp.watch('docs/*.html').on('change', server.reload);
  gulp.watch('docs/*.js').on('change', server.reload);
  gulp.watch('dist/*.js').on('change', server.reload);
}

const build = gulp.series(cleanOutDir, compile, minify, copyFiles);

exports.serve = gulp.series(compile, serve);
exports.build = build;
exports.default = build;
