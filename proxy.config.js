const proxy = [
  {
    context: '/api',
    // target: 'https://core-base-springboot-api.herokuapp.com',
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
