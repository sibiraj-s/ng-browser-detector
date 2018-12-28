const dartSass = require('sass');

const banner = '/*!\n * @module <%= pkg.name %>\n'
  + ' * @description <%= pkg.description %>\n'
  + ' * @version v<%= pkg.version %>\n'
  + ' * @link <%= pkg.homepage %>\n'
  + ' * @licence MIT License, https://opensource.org/licenses/MIT\n'
  + ' */\n\n';

module.exports = (grunt) => {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt); // eslint-disable-line global-require

  // grunt tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        implementation: dartSass,
        style: 'expanded',
        sourcemap: 'none',
      },
      compile: {
        files: {
          'docs/style.css': 'docs/style.scss',
        },
      },
    },
    concat: {
      options: {
        stripBanners: true,
        banner,
      },
      dist: {
        src: ['src/ng-browser-detector.js'],
        dest: 'dist/ng-browser-detector.js',
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: [
          '@babel/preset-env',
        ],
      },
      transpile: {
        files: {
          'dist/ng-browser-detector.js': 'dist/ng-browser-detector.js',
        },
      },
      minify: {
        options: {
          presets: [
            'minify',
          ],
        },
        files: {
          'dist/ng-browser-detector.min.js': 'dist/ng-browser-detector.js',
        },
      },
    },
    eslint: {
      target: [
        'src/**/*.js',
        'test/**/*.js',
        'scripts/**/*.js',
        'Gruntfile.js',
      ],
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9001,
          base: './',
          open: true,
          keepalive: true,
          livereload: true,
        },
      },
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['eslint'],
      },
      sass: {
        files: ['docs/**/*.scss'],
        tasks: ['sass'],
      },
      options: {
        livereload: true,
      },
    },
  });

  // grunt tasks
  grunt.registerTask('develop', ['watch']);
  grunt.registerTask('serve', ['sass', 'connect']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('build', ['lint', 'concat', 'babel']);
};
