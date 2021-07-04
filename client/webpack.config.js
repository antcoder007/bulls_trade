// const { resolve } = require('path');
// const webpack = require('webpack');

// module.exports = {

//     entry: [
//         'react-hot-loader/patch',
//         'webpack-dev-server/client?http://localhost:3000',
//         'webpack/hot/only-dev-server',
//         './app.js',
//     ],
    
//     output: {
//         filename: 'bundle.js',
//         path: resolve(__dirname, 'dist'),
//         publicPath: '/',
//     },
    
//     context: resolve(__dirname, 'client'),
    
//     devtool: 'inline-source-map',    

//     devServer: {
//         historyApiFallBack: true,
//         // progress: true,
//         hot: true,
//         inline: true,
//         // https: true,
//         // port: 3001,
//         contentBase: path.resolve(__dirname, 'public'),
//         proxy: {'**': 'http://localhost:3001'}
//       }
//   };