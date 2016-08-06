module.exports = {
  entry:  {
    createathon:'./src/index.js'
  },
  output: {
      path: __dirname + '/dist',
    filename: '[name].bundle.js'
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
  },
    devServer: {
        port:8090,
        proxy: {
            //route dev-server which is on 8090 requests to the 8080 where backend server runs
            '/rest/*': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    }
};