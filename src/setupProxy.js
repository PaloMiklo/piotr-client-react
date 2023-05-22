const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(createProxyMiddleware('/dev', {
        target: 'http://192.168.1.10:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': '',
        }
    }));

    app.use(createProxyMiddleware('/api', {
      target: 'http://192.168.1.10:8080',
      changeOrigin: true,
  }));
}