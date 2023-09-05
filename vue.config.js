const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 3000,
    proxy: {
      '/api': {    // 匹配 /api 开头的请求路径
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {'^/api': ''}  // 重写路径
      }
    }
  }
})
