const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
	entry: {
		src: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	mode: "development",
	plugins: [
		new webpack.ProvidePlugin({ 
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
	  })
	],
	module: {
		rules:[
			{
				test:/\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react', 'stage-1']
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{loader: 'sass-loader'}
				]
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,  
				use: [{
					loader: 'url-loader',
					options: { 
						limit: 8000,
						name: 'images/[hash]-[name].[ext]'
					} 
				}]
			},
			{ test: /\.css$/, use: ['style-loader','css-loader'] },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: "file" },
			{ test: /\.(woff|woff2)$/, use:"url?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: "url?limit=10000&mimetype=image/svg+xml" },
			{ test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, use: 'url-loader'}
		]
	},
	devServer: {
		historyApiFallback: true
	}
};