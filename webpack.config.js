var webpack = require('webpack');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './app/index.js'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Nav: 'app/containers/Nav.jsx',
      GradesForm: 'app/components/GradesForm.jsx',
      GradesResult: 'app/containers/GradesResult.jsx',
      Login: 'app/containers/auth/Login.jsx',
      Signup: 'app/containers/auth/Signup.jsx',
      Logout: 'app/containers/auth/Logout.jsx',
      RequireAuth: 'app/containers/auth/RequireAuth.jsx',
      Classes: 'app/containers/Classes.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
