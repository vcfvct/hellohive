module.exports = {
  entry: {
    createathon:'./src/index.js'
  },
  output: {
    filename: './dist/[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
   preLoaders: [{test: /\.jsx$/, exclude: /node_modules/, loader: 'eslint-loader'
   }],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      }
    ]
  }
};