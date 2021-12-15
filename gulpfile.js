const path = require('node:path');
const fs = require('node:fs/promises');
const util = require('node:util');

const gulp = require('gulp');
const rollup = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const terser = require('gulp-plugin-terser');
const sass = require('sass');
const browserSync = require('browser-sync');

const sassRenderAsync = util.promisify(sass.render);

const pkg = require('./package.json');

const outDir = path.resolve(__dirname, 'dist');
const banner = `/*!
 * @module ${pkg.name}
 * @description ${pkg.description}
 * @version ${pkg.version}
 * @link ${pkg.repository}
 * @licence MIT License, https://opensource.org/licenses/MIT
 */
`;

const cleanOutDir = async () => {
  await fs.rm(outDir, { recursive: true, force: true });
};

const compile = async () => {
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

  await bundle.close();
};

const updatePackageJSON = async () => {
  const targetPkgJsonPath = path.resolve(outDir, 'package.json');
  const jsonStr = await fs.readFile(targetPkgJsonPath, 'utf-8');
  const pkgJson = JSON.parse(jsonStr);

  pkgJson.main = 'ng-browser-detector.min.js';
  delete pkgJson.scripts;
  delete pkgJson.devDependencies;
  delete pkgJson.private;
  delete pkgJson.engines;

  await fs.writeFile(targetPkgJsonPath, JSON.stringify(pkgJson, null, 2));
};

const copyFiles = () => {
  return gulp.src([
    'README.md',
    'CHANGELOG.md',
    'LICENSE',
    'package.json',
  ]).pipe(gulp.dest(outDir));
};

const minify = () => {
  return gulp.src('dist/*.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(gulp.dest(outDir, { sourcemaps: '.' }));
};

const compileSass = async () => {
  const result = await sassRenderAsync({
    file: './docs/style.scss',
  });

  await fs.writeFile('./docs/style.css', result.css, 'utf-8');
};

const createServer = () => {
  return browserSync.init({
    server: {
      baseDir: './docs/',
      routes: {
        '/dist': 'dist',
      },
    },
    open: false,
    rewriteRules: [{
      match: 'https://cdn.jsdelivr.net/npm/ng-browser-detector@latest/ng-browser-detector.min.js',
      replace: '/dist/ng-browser-detector.js',
    }],
  });
};

const serve = () => {
  const server = createServer();

  gulp.watch('src/*.js', compile);
  gulp.watch('docs/*.scss', compileSass);

  gulp.watch('docs/*.html').on('change', server.reload);
  gulp.watch('docs/*.css').on('change', server.reload);
  gulp.watch('docs/*.js').on('change', server.reload);
  gulp.watch('dist/*.js').on('change', server.reload);
};

const build = gulp.series(cleanOutDir, compile, minify, copyFiles, updatePackageJSON);

exports.serve = gulp.series(compile, serve);
exports.build = build;
exports.default = build;
