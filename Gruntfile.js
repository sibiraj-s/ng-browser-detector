'use strict';

var banner = '/*!\n * @module <%= pkg.name %>\n' +
    ' * @description <%= pkg.description %>\n' +
    ' * @version v<%= pkg.version %>\n' +
    ' * @link <%= pkg.homepage %>\n' +
    ' * @licence MIT License, https://opensource.org/licenses/MIT\n' +
    ' */\n\n';

module.exports = grunt => {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // grunt tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    'docs/style.css': 'docs/style.scss',
                }
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: banner
            },
            dist: {
                src: ['src/ng-browser-detector.js'],
                dest: 'dist/ng-browser-detector.js',
            }
        },
        jshint: {
            all: ['src/**/*.js', 'test/**/*.js']
        },
        uglify: {
            options: {
                sourceMap: true,
                output: {
                    comments: '/^!/'
                }
            },
            distribution: {
                files: {
                    'dist/ng-browser-detector.min.js': ['dist/ng-browser-detector.js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './',
                    keepalive: true,
                    livereload: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['jshint']
            },
            sass: {
                files: ['docs/**/*.scss'],
                tasks: ['sass']
            },
            options: {
                livereload: true
            }
        }
    });

    // grunt tasks
    grunt.registerTask('develop', ["watch"]);
    grunt.registerTask("serve", ["connect"]);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask("build", ["jshint", "concat", "uglify"]);
};
