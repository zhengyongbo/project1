module.exports = function(grunt) {

    // Configurable paths
    var config = {
        app: '_asserts',
        dist: 'asserts',
        temp: '.tmp'
    };

    grunt.initConfig({
        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            compass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:dist', 'postcss', 'copy:sass', 'cssmin']
            },
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['copy:dist', 'uglify']
            },
            images: {
                files: ['<%= config.app %>/images/{,*/}*'],
                tasks: ['copy:images']
            }
        },

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    // Add vendor prefixed styles
                    require('autoprefixer-core')({
                        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
                    })
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'scripts/*.js',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    flatten: true,
                    filter: 'isFile',
                    cwd: 'bower_components',
                    dest: '<%= config.dist %>/fonts/',
                    src: [
                        'bootstrap/dist/fonts/{,*/}*.*',
                        'bootstrap-material-design/dist/fonts/{,*/}*.*',
                        'font-awesome/fonts/{,*/}*.*',
                        'slick-carousel/slick/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '.tmp',
                    dest: '<%= config.dist %>',
                    src: [
                        'scripts/*.js',
                        'styles/*.css'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>/images',
                    dest: '<%= config.dist %>/images',
                    src: [
                        '*',
                        '{,*/}*'
                    ]
                }]
            },

            sass: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '.tmp',
                    dest: '<%= config.dist %>',
                    src: [
                        'scripts/*.js',
                        'styles/*.css'
                    ]
                }]
            },

            images: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        'images/*.png',
                        'styles/*.jpg'
                    ]
                }]
            }
        },

        bower_concat: {
            all: {
                dest: '.tmp/scripts/vendor.js',
                cssDest: '.tmp/styles/vendor.css',
                exclude: [

                ],
                dependencies: {
                    'bootstrap': 'jquery',
                    'bootstrap-material-design': ['nouislider', 'arrive', 'bootstrap']
                },
                bowerOptions: {
                    relative: true
                },

                mainFiles: {
                    'nouislider': ['distribute/nouislider.js'],
                    'bootstrap': ['dist/css/bootstrap.css', 'dist/js/bootstrap.js'],
                    'bootstrap-calendar': ['./js/language/zh-CN.js', './js/calendar.js','./css/calendar.css'],
                    'slick-carousel': ['slick/slick.js', 'slick/slick.css']
                }
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/styles',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.dist %>/styles',
                    ext: '.min.css'
                }]
            }
        },

        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/scripts/vendor.min.js': [
                        '<%= config.dist %>/scripts/vendor.js'
                    ],

                    '<%= config.dist %>/scripts/main.min.js': [
                        '<%= config.dist %>/scripts/main.js'
                    ],

                    '<%= config.dist %>/scripts/temp.min.js': [
                        '<%= config.dist %>/scripts/temp.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [
        'clean:dist',
        'bower_concat',
        'compass:dist',
        'postcss',
        'copy:dist',
        'uglify',
        'cssmin'
    ]);
}
