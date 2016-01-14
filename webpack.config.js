var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/jsx/index.jsx',
	output: { path: __dirname+'/public', filename: 'js/index.js' },
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /.scss$/,
				loader: 'style!css!sass',
				exclude: /node_modules/
			},
			{
				test: /.json$/,
				loader: 'json',
				exclude: /node_modules/
			},
			{
				test: /.jpg$/,
				loader: 'file',
				query: {
					name: 'images/[name].[ext]'
				}
			},
			{
				test: /.png$/,
				loader: 'file',
				query: {
					name: 'images/[name].[ext]'
				}
			}
		]
	},
	resolveLoader: {
		modulesDirectories: [
			'node_modules',
			'src/jsx'
		]
	},
};