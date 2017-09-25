var webpack = require('webpack');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/js/foundation.min.js',
    './app/index.js'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Home: 'app/components/Home.jsx',
      Nav: 'app/containers/Nav.jsx',
      GradesForm: 'app/containers/GradesForm.jsx',
      GradesResult: 'app/containers/GradesResult.jsx',
      GradesStats: 'app/components/GradesStats.jsx',
      Login: 'app/containers/auth/Login.jsx',
      Signup: 'app/containers/auth/Signup.jsx',
      Logout: 'app/containers/auth/Logout.jsx',
      RequireAuth: 'app/containers/auth/RequireAuth.jsx',
      Classes: 'app/containers/Classes.jsx',
      AddClass: 'app/containers/AddClass.jsx',
      Spinner: 'app/components/Spinner.jsx',
      Alert: 'app/components/Alert.jsx'
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
  devtool: 'cheap-module-source-map'
};
