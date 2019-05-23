const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: [
		'./src/app.js',
	],
	output: {
		path: path.resolve(__dirname, './production'),
		filename: 'app.bundle.js',
	},
	module: {
		rules: [
			{ test: /\.html$/, use: 'file-loader' },
			{ test: /\.(png|jpg)$/, use: 'url-loader?limit=8192' },
			{ test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.(css|scss)$/, use: [{ loader: 'style-loader/url' }, { loader: 'file-loader' }]},
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin()
	],
	optimization: {
		minimizer: [new TerserPlugin()],
	},
	resolve: {
		alias: {
			Src: path.resolve(__dirname, 'src/')
		}
	}
}
