
const path = require('path');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, './dist/'),
		filename: '[name].js',
		publicPath: '/dist/'
	},
	devServer: {
		overlay: true
	},
	mode: 'production',

	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env']
					},
				},
				exclude: '/node_modules'
			}
		]
	}
}
