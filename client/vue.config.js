const target = 'http://127.0.0.1:3000';

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '^/upload': {
        target,
        changeOrigin: true,
      },
      '^/download': {
        target,
        changeOrigin: true,
      }
    }
  }
}