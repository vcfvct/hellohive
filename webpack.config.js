var webpack = require("webpack");

module.exports = {
	entry: {
		BeeDrill: __dirname + '/src/main/angular-gui/index.js'

	},
	devtool: 'source-map',
	output: {
		path: __dirname + '/src/main/angular-gui/dist',
		filename: '[name].bundle.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'jshint-loader'

			}
		],
		loaders: [
			{test: /\.js$/, loader: 'babel', exclude: /node_modules/},
			{test: /\.css$/, loaders: ["style", "css"]},
			{test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?[a-z0-9=\.]+)?$/, loader: 'url'},
			{
				// HTML LOADER
				// Reference: https://github.com/webpack/raw-loader
				// Allow loading html through js
				test: /\.html$/,
				loader: 'raw'
			}
		]
	},
	plugins: [
		//enable jquery globally so that the jQuery plugin can be loaded
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
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