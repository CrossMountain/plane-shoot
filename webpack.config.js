const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//构建前删除dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports={
	entry:'./src/js/index.js',//入口JS
	output:{
		filename:'bundle.js',
		path:path.resolve(__dirname,'./dist')
	},
	module:{
		rules:[
            {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            },
			      {
  		      	test: /\.js$/,
  		     	  exclude: /(node_modules|bower_components)/,
  		      	use: {
      			         loader: 'babel-loader',
      			         options:{
      			        	cacheDirectory:true//缓存
      			         }
		     	         }
            },       
            {
               test: /\.(png|jpg|gif|jpeg)$/,
               use: [
                 {
                   loader: 'url-loader',
                   options: {
                     limit: 8192,  //小于8KB,就base64编码
                     publicPath:'./img',
                     name:'img/[name].[ext]',
                     publicPath:'./'   //生成的文件路径,前面加
                   }
                 }
               ]
             }
		      ]
  },        
	plugins: [
        new HtmlWebpackPlugin(
        {          
          	template: './src/index.html',// 模板文件          
          	filename: 'index.html'
        }
        ),
        new CopyWebpackPlugin([
      		{from:'./src/img',to:'./img'},
      	]),

        new ExtractTextPlugin("style.css"),
      	new CleanWebpackPlugin(['dist','build'],{
      		verbose:false,
      		exclude:['img']//不删除images静态资源
      	})
  ]

}