const proxy = [
  {
    context: '/api',
    target: 'https://core-base-springboot-api.herokuapp.com',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
