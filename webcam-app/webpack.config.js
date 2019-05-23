const webpack = require('webpack')
const path = require('path')

module.exports = {
	mode: 'development',
	entry: [
		'./src/app.js',
	],
	output: {
		path: path.resolve(__dirname, './build'),
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
		new webpack.NamedModulesPlugin(),
	],
	resolve: {
		alias: {
			Src: path.resolve(__dirname, 'src/')
		}
	},
	devServer: {
		contentBase: 'build',
		compress: true,
		port: 9000,
		host: '0.0.0.0'
	}
}
