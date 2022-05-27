const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
 
module.exports = {
  chainWebpack: config => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ['json', 'javascript', 'cpp', 'python', 'java']
      }
    ])

    config.plugin('html')
    .tap(args => {
      args[0].title = "你好同学";
      return args;
    })
  },
  publicPath: './',
  productionSourceMap: false
}
