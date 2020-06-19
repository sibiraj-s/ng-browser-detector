const path = require('path');
const fs = require('fs');

const gulp = require('gulp');
const rollup = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const terser = require('gulp-plugin-terser');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const dartSass = require('sass');
const browserSync = require('browser-sync');

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
      babel({
        babelHelpers: 'bundled',
      }),
    ],
  });

  await bundle.write({
    file: 'dist/ng-browser-detector.js',
    format: 'iife',
    sourcemap: true,
    banner,
  });
}

async function updatePackageJSON() {
  const targetPkgJsonPath = path.resolve(outDir, 'package.json');
  const jsonStr = await fs.promises.readFile(targetPkgJsonPath, 'utf-8');
  const pkgJson = JSON.parse(jsonStr);

  pkgJson.main = 'ng-browser-detector.min.js';
  delete pkgJson.scripts;
  delete pkgJson.devDependencies;
  delete pkgJson.private;
  delete pkgJson.engines;

  await fs.promises.writeFile(targetPkgJsonPath, JSON.stringify(pkgJson, null, 2));
}

function copyFiles() {
  return gulp.src([
    'README.md',
    'CHANGELOG.md',
    'LICENSE',
    'package.json',
  ]).pipe(gulp.dest(outDir));
}

function minify() {
  return gulp.src('dist/*.js')
    .pipe(sourcemap.init())
    .pipe(terser())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(outDir));
}

function compileSass(server) {
  return gulp.src('docs/*.scss')
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

const build = gulp.series(cleanOutDir, compile, minify, copyFiles, updatePackageJSON);

exports.serve = gulp.series(compile, serve);
exports.build = build;
exports.default = build;
