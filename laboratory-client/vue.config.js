module.exports = {
  css: {
    loaderOptions: {
      postcss: {
      }
    }
  }
}
// const px2rem = require('postcss-px2rem')

// module.exports = {
//     module: {
//         loaders: [{
//             test: /\.css$/,
//             loader: 'style-loader!css-loader!postcss-loader'
//         }]
//     },
//     postcss: function() {
//         return [px2rem({ remUnit: 37.5 })]
//     }
// }
