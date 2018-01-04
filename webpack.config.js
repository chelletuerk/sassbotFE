module.exports = {
  entry: {
    main: ['./lib/index.js'],
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      {test: /\.svg$/, loaders: 'file'},
      {test: /\.png$/, loader: 'url-loader'}
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
  },
};
