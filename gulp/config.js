module.exports = {
  base : {
    src   : 'src',
    dest  : 'public'
  },

  js : {
    src   : 'js',
    dest  : 'js',
    watch : 'src/**/*.js'
  },

  copy: {
    src : [
      'src/**/*',
      // '!src/js/lib/**',
      '!src/css/base',
      '!src/**/*.coffee',
      // '!src/**/*.{gif,jpeg,jpg,png,svg,webp}',
      '!src/**/*.jade',
      '!src/**/*.{sass,scss}'
    ],
    dest : 'public/'
  },

  css : {
    src : [
      'src/**/*.scss',
      '!src/**/_*.scss'
    ],
    watch : 'src/**/*.{sass,scss}',
    dest  : './',
    sass  : { indentedSyntax: false },  // Enable .sass syntax (.scss still works too)
    autoprefixer: { browsers: ['last 3 version']},
    extensions: ['scss', 'sass', 'css']
  },

  html : {
    src   : '**/*.html',
    watch : ['src/**/*.html', 'src/include/*'],
    dest  : ''
  },

  images : {
    src     : 'images/**',
    dest    : 'images',
    watch   : 'src/images/**',
    extensions: ['jpg', 'png', 'svg', 'gif']
  }
}
