const webpack = require('webpack');
const path = require('path');

const config = {
	cache: true,
	mode: 'development',
	entry: {
		'user': ['./src/client/User/index.tsx', 'webpack-hot-middleware/client'],
		'guest': ['./src/client/Guest/index.tsx', 'webpack-hot-middleware/client']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	devtool: 'source-map',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/static'
	},
	devServer: {
		contentBase: './dist',
		hot: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.css']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{ test: /\.css$/, loader: 'style-loader!css-loader' }
		]
	},
	node: { fs: 'empty' }
};

module.exports = config;