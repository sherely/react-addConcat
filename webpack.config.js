module.exports = {
	devtool: 'eval-source-map', //配置生成Source Maps
	entry: {
		index: __dirname + '/app/index.js'
	},
	output: {
		path: __dirname + "/public", // 输出文件的保存路径
		filename: '[name].bundle.js', // 输出文件的名称
		chunkFilename: "[name].bundle.js"
	},
	module: { //在配置文件里添加JSON loader
		loaders: [{
			test: /\.json$/,
			loader: "json"
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192'
		}]
	},
	postcss: [
		require('autoprefixer') //调用autoprefixer插件
	],
	devServer: {
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		colors: true, //终端中输出结果为彩色
		historyApiFallback: true, //不跳转
		inline: true //实时刷新
	}
}